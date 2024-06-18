"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionOrmMapper = void 0;
const cost_and_currency_value_object_1 = require("../../domain-value-objects/cost-and-currency.value-object");
const tax_value_object_1 = require("../../domain-value-objects/tax.value-object");
const innopay_card_entity_1 = require("../../domains/innopay-card/domain/entities/innopay-card.entity");
const types_1 = require("../../domains/innopay-card/domain/types");
const pan_masked_value_object_1 = require("../../domains/innopay-card/domain/value-objects/pan-masked.value-object");
const payment_invoice_entity_1 = require("../../domains/payment-transaction/domain/entities/payment-invoice.entity");
const customer_reference_value_object_1 = require("../../domains/payment-transaction/domain/value-objects/customer-reference.value-object");
const payment_invoice_status_value_object_1 = require("../../domains/payment-transaction/domain/value-objects/payment-invoice-status.value-object");
const apartment_ad_orm_entity_1 = require("../../../infrastructure/database/entities/apartment-ad.orm-entity");
const contract_orm_entity_1 = require("../../../infrastructure/database/entities/contract.orm-entity");
const innopay_card_orm_entity_1 = require("../../../infrastructure/database/entities/innopay-card.orm-entity");
const payment_invoice_orm_entity_1 = require("../../../infrastructure/database/entities/payment-invoice.orm-entity");
const date_time_iso_tz_value_object_1 = require("../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const date_value_object_1 = require("../../../libs/ddd/domain/value-objects/date.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
const date_util_1 = require("../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
class PaymentTransactionOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        const props = entity.getPropsCopy();
        const ormProps = {
            contractId: props.contractId.value,
            withdrawFundsDate: date_util_1.DateUtil.parseUTC(props.withdrawFundsDate.value).toDate(),
            totalAmountPayable: props.totalAmountPayable.cost,
            totalAmountToBeTransferred: props.totalAmountToBeTransferred.cost,
            totalRevenue: props.totalRevenue.cost,
            startDate: date_util_1.DateUtil.parseUTC(props.startDate.value).toDate(),
            endDate: date_util_1.DateUtil.parseUTC(props.endDate.value).toDate(),
            senderTaxRate: props.senderTaxRate.value,
            recipientTaxRate: props.recipientTaxRate.value,
            rentDays: props.rentDays,
            cost: props.cost.cost,
            currency: props.cost.currency,
            taxAmount: props.taxAmount.cost,
            rentPeriodStrategyType: props.rentPeriodStrategyType,
            isLastPayment: props.isLastPayment,
            isRecurring: props.isRecurring,
            status: props.status,
            isFailure: props.isFailure,
            invoices: props.invoices.map((invoice) => {
                var _a;
                const props = invoice.getPropsCopy();
                const customerReferenceProps = props.customerReference.unpack();
                return payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity.create({
                    id: invoice.id.value,
                    paymentTransactionId: entity.id.value,
                    date: props.date.value,
                    status: props.status.value,
                    refersToUserId: props.refersToUserId.value,
                    type: props.type,
                    error: props.error,
                    cardMeta: props.cardMeta,
                    createdAt: props.createdAt.value,
                    updatedAt: props.updatedAt.value,
                    deletedAt: (_a = props.deletedAt) === null || _a === void 0 ? void 0 : _a.value,
                    customerReference: customerReferenceProps.customerReference,
                    livinCustomerReference: customerReferenceProps.livinCustomerReference || null,
                });
            }),
        };
        return ormProps;
    }
    async toDomainProps(ormEntity, trxId) {
        var _a;
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const trx = trxId ? (_a = this.unitOfWork) === null || _a === void 0 ? void 0 : _a.getTrx(trxId) : undefined;
        const contract = await contract_orm_entity_1.ContractOrmEntity.query(trx).findById(ormEntity.contractId);
        if (!contract ||
            !contract.landlordId ||
            !contract.tenantId ||
            !contract.apartmentAdId ||
            !contract.tenantInnopayCardId) {
            throw new common_1.NotFoundException('Contract not found');
        }
        const recipientInnopayCardQuery = innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx)
            .innerJoin(apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName, `${innopay_card_orm_entity_1.InnopayCardOrmEntity.tableName}.id`, `${apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName}.innopayCardId`)
            .findOne(`${apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName}.id`, contract.apartmentAdId)
            .withGraphFetched({ innopayUser: true }, { joinOperation: 'innerJoin' })
            .modifyGraph('innopayUser', (builder) => {
            builder.select('userId', 'cnpUserId');
        });
        const senderInnopayCardQuery = innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx)
            .findById(contract.tenantInnopayCardId)
            .withGraphFetched({ innopayUser: true }, { joinOperation: 'innerJoin' })
            .modifyGraph('innopayUser', (builder) => {
            builder.select('userId', 'cnpUserId');
        })
            .where('appointmentType', types_1.InnopayAppointmentCardType.CHARGE_OFF);
        const [senderInnopayCard, recipientInnopayCard] = await Promise.all([
            senderInnopayCardQuery,
            recipientInnopayCardQuery,
        ]).then((cards) => cards.map((card) => {
            if (!card || !card.innopayUser) {
                throw new common_1.NotFoundException('Card not found');
            }
            return new innopay_card_entity_1.InnopayCardEntity({
                id: new uuid_value_object_1.UUID(card.id),
                props: {
                    cardHolder: card.cardHolder,
                    cardType: card.cardType,
                    cnpCardId: card.cnpCardId,
                    cnpUserId: card.innopayUser.cnpUserId,
                    panMasked: new pan_masked_value_object_1.PanMaskedVO(card.panMasked),
                    userId: new uuid_value_object_1.UUID(card.innopayUser.userId),
                    appointmentType: card.appointmentType,
                },
                createdAt: new date_value_object_1.DateVO(card.createdAt),
                updatedAt: new date_value_object_1.DateVO(card.updatedAt),
                deletedAt: card.deletedAt ? new date_value_object_1.DateVO(card.deletedAt) : null,
            });
        }));
        const props = {
            contractId: new uuid_value_object_1.UUID(ormEntity.contractId),
            senderId: senderInnopayCard.userId,
            recipientId: recipientInnopayCard.userId,
            totalAmountPayable: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: ormEntity.totalAmountPayable,
                currency: ormEntity.currency,
            }),
            totalAmountToBeTransferred: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: ormEntity.totalAmountToBeTransferred,
                currency: ormEntity.currency,
            }),
            totalRevenue: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: ormEntity.totalRevenue,
                currency: ormEntity.currency,
            }),
            withdrawFundsDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.withdrawFundsDate.toISOString()),
            startDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.startDate.toISOString()),
            endDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.endDate.toISOString()),
            senderTaxRate: new tax_value_object_1.TaxVO({ value: ormEntity.senderTaxRate }),
            recipientTaxRate: new tax_value_object_1.TaxVO({ value: ormEntity.recipientTaxRate }),
            rentDays: ormEntity.rentDays,
            cost: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: ormEntity.cost, currency: ormEntity.currency }),
            taxAmount: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: ormEntity.taxAmount, currency: ormEntity.currency }),
            rentPeriodStrategyType: ormEntity.rentPeriodStrategyType,
            isLastPayment: ormEntity.isLastPayment,
            isRecurring: ormEntity.isRecurring,
            status: ormEntity.status,
            isFailure: ormEntity.isFailure,
            senderCard: senderInnopayCard,
            recipientCard: recipientInnopayCard,
            invoices: ormEntity.invoices
                ? ormEntity.invoices.map((invoice) => new payment_invoice_entity_1.PaymentInvoiceEntity({
                    id: new uuid_value_object_1.UUID(invoice.id),
                    props: {
                        date: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.withdrawFundsDate.toISOString()),
                        paymentTransactionId: id,
                        status: payment_invoice_status_value_object_1.PaymentInvoiceStatusVO.create(invoice.status),
                        refersToUserId: new uuid_value_object_1.UUID(invoice.refersToUserId),
                        type: invoice.type,
                        error: invoice.error,
                        cardMeta: invoice.cardMeta,
                        customerReference: new customer_reference_value_object_1.CustomerReferenceVO({
                            customerReference: invoice.customerReference,
                            livinCustomerReference: invoice.livinCustomerReference || undefined,
                        }),
                    },
                    createdAt: new date_value_object_1.DateVO(invoice.createdAt),
                    updatedAt: new date_value_object_1.DateVO(invoice.updatedAt),
                    deletedAt: invoice.deletedAt ? new date_value_object_1.DateVO(invoice.deletedAt) : null,
                }))
                : [],
        };
        return { id, props };
    }
}
exports.PaymentTransactionOrmMapper = PaymentTransactionOrmMapper;
//# sourceMappingURL=payment-transaction.orm-mapper.js.map