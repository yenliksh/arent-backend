"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractOrmMapper = void 0;
const apartment_guests_value_object_1 = require("../../domain-value-objects/apartment-guests.value-object");
const payment_method_value_object_1 = require("../../domain-value-objects/payment-method.value-object");
const rent_booking_type_value_object_1 = require("../../domain-value-objects/rent-booking-type.value-object");
const short_term_rent_payment_type_value_object_1 = require("../../domain-value-objects/short-term-rent-payment-type.value-object");
const contract_cancelation_entity_1 = require("../../domains/contract/domain/entities/contract-cancelation.entity");
const base_contract_apartment_ad_data_value_object_1 = require("../../domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object");
const contract_details_value_object_1 = require("../../domains/contract/domain/value-objects/contract-details.value-object");
const temporary_payment_data_value_object_1 = require("../../domains/contract/domain/value-objects/temporary-payment-data.value-object");
const rent_period_version_entity_1 = require("../../domains/rent-period-version/domain/rent-period-version.entity");
const value_objects_1 = require("../../domains/user/domain/value-objects");
const contract_cancelation_orm_entity_1 = require("../../../infrastructure/database/entities/contract-cancelation.orm-entity");
const payment_transaction_orm_entity_1 = require("../../../infrastructure/database/entities/payment-transaction.orm-entity");
const rent_period_version_orm_entity_1 = require("../../../infrastructure/database/entities/rent-period-version.orm-entity");
const date_time_iso_tz_value_object_1 = require("../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const date_value_object_1 = require("../../../libs/ddd/domain/value-objects/date.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
const exceptions_1 = require("../../../libs/exceptions");
const objection_1 = require("objection");
const apartment_rules_value_object_1 = require("../../domain-value-objects/apartment-rules.value-object");
const cancellation_policy_value_object_1 = require("../../domain-value-objects/cancellation-policy.value-object");
const contract_status_value_object_1 = require("../../domain-value-objects/contract-status.value-object");
const cost_and_currency_value_object_1 = require("../../domain-value-objects/cost-and-currency.value-object");
class ContractOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        const props = entity.getPropsCopy();
        const cancelationProps = (_a = props.contractCancelation) === null || _a === void 0 ? void 0 : _a.getPropsCopy();
        const ormProps = {
            contractRequestId: props.contractRequestId ? props.contractRequestId.value : undefined,
            apartmentAdId: props.apartmentAdId ? props.apartmentAdId.value : undefined,
            apartmentRentPeriodType: props.apartmentRentPeriodType,
            status: props.status.value,
            tenantId: props.tenantId ? props.tenantId.value : undefined,
            landlordId: props.landlordId ? props.landlordId.value : undefined,
            cost: props.costAndCurrency.cost,
            currency: props.costAndCurrency.currency,
            arrivalDate: props.details.arrivalDate ? new Date(props.details.arrivalDate.value) : undefined,
            departureDate: props.details.departureDate ? new Date(props.details.departureDate.value) : undefined,
            rules: (_b = props.details.rules) === null || _b === void 0 ? void 0 : _b.unpack(),
            rentPeriodVersionId: props.rentPeriodVersion.id.value,
            shortTermCancellationPolicy: props.cancellationPolicy.shortTermCancellationPolicy,
            longTermCancellationPolicy: props.cancellationPolicy.longTermCancellationPolicy,
            isPending: props.isPending,
            isFined: props.isFined,
            isTemporary: props.isTemporary,
            defaultPaymentMethod: (_d = (_c = props.tenantPaymentMethod) === null || _c === void 0 ? void 0 : _c.defaultType) !== null && _d !== void 0 ? _d : null,
            tenantInnopayCardId: (_f = (_e = props.tenantPaymentMethod) === null || _e === void 0 ? void 0 : _e.innopayCardId) !== null && _f !== void 0 ? _f : null,
            rentBookingType: (_g = props.shortTermRentBookingType) === null || _g === void 0 ? void 0 : _g.value,
            rentPaymentType: (_h = props.shortTermRentPaymentType) === null || _h === void 0 ? void 0 : _h.value,
            baseApartmentAdData: props.baseContractApartmentAdData.unpack(),
            guests: props.guests.unpack(),
            nextPaymentTransactionId: (_j = props.nextPaymentTransactionId) === null || _j === void 0 ? void 0 : _j.value,
            paymentUrl: (_l = (_k = props.paymentData) === null || _k === void 0 ? void 0 : _k.paymentUrl) !== null && _l !== void 0 ? _l : null,
            paymentUrlStartAt: ((_m = props.paymentData) === null || _m === void 0 ? void 0 : _m.paymentUrlStartAt) ? new Date((_o = props.paymentData) === null || _o === void 0 ? void 0 : _o.paymentUrlStartAt) : null,
            customerReference: (_q = (_p = props.paymentData) === null || _p === void 0 ? void 0 : _p.customerReference) !== null && _q !== void 0 ? _q : null,
            contractCancelation: cancelationProps
                ? contract_cancelation_orm_entity_1.ContractCancelationOrmEntity.create({
                    id: cancelationProps.id.value,
                    cancelationDate: cancelationProps.cancelationDate.value,
                    checkOutDate: cancelationProps.checkOutDate.value,
                    contractId: cancelationProps.contractId.value,
                    triggerUserId: (_r = cancelationProps.triggerUserId) === null || _r === void 0 ? void 0 : _r.value,
                    refundsAmountToSenderCost: cancelationProps.refundsAmountToSender.cost,
                    refundsAmountToSenderCurrency: cancelationProps.refundsAmountToSender.currency,
                    transferAmountToPlatformCost: cancelationProps.transferAmountToPlatform.cost,
                    transferAmountToPlatformCurrency: cancelationProps.transferAmountToPlatform.currency,
                    transferAmountToRecipientCost: cancelationProps.transferAmountToRecipient.cost,
                    transferAmountToRecipientCurrency: cancelationProps.transferAmountToRecipient.currency,
                    withdrawalAmountFromSenderCost: cancelationProps.withdrawalAmountFromSender.cost,
                    withdrawalAmountFromSenderCurrency: cancelationProps.withdrawalAmountFromSender.currency,
                    withdrawalAmountFromRecipientCost: cancelationProps.withdrawalAmountFromRecipient.cost,
                    withdrawalAmountFromRecipientCurrency: cancelationProps.withdrawalAmountFromRecipient.currency,
                    isFine: cancelationProps.isFine,
                    createdAt: cancelationProps.createdAt.value,
                    updatedAt: cancelationProps.updatedAt.value,
                    deletedAt: (_s = cancelationProps.deletedAt) === null || _s === void 0 ? void 0 : _s.value,
                })
                : undefined,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity, trxId) {
        var _a;
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const trx = trxId ? (_a = this.unitOfWork) === null || _a === void 0 ? void 0 : _a.getTrx(trxId) : undefined;
        const { arrivalDate, departureDate, rules } = ormEntity;
        const rentPeriodVersionQuery = rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query(trx).findById(ormEntity.rentPeriodVersionId);
        payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.knexQuery().select();
        const existUnpaidTransactionsQuery = payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query()
            .select(objection_1.Model.raw(`exists(select * from payment_transactions where "contractId" = ? and status = ANY(ARRAY['CASH_OUT_WAITING'::text, 'CASH_IN_WAITING'::text]))`, [ormEntity.id]))
            .first();
        const [rentPeriodVersion, existUnpaidTransactions] = await Promise.all([
            rentPeriodVersionQuery,
            existUnpaidTransactionsQuery,
        ]);
        if (!rentPeriodVersion) {
            throw new exceptions_1.ArgumentInvalidException('Rent period version required');
        }
        const props = {
            contractRequestId: ormEntity.contractRequestId ? new uuid_value_object_1.UUID(ormEntity.contractRequestId) : undefined,
            apartmentAdId: ormEntity.apartmentAdId ? new uuid_value_object_1.UUID(ormEntity.apartmentAdId) : undefined,
            apartmentRentPeriodType: ormEntity.apartmentRentPeriodType,
            details: new contract_details_value_object_1.ContractDetailsVO({
                arrivalDate: arrivalDate ? new date_time_iso_tz_value_object_1.DateTimeISOTZVO(arrivalDate.toISOString()) : undefined,
                departureDate: departureDate ? new date_time_iso_tz_value_object_1.DateTimeISOTZVO(departureDate.toISOString()) : undefined,
                rules: rules ? apartment_rules_value_object_1.ApartmentRulesVO.create(rules) : undefined,
            }),
            landlordId: ormEntity.landlordId ? new uuid_value_object_1.UUID(ormEntity.landlordId) : undefined,
            status: contract_status_value_object_1.ContractStatusVO.create(ormEntity.status),
            tenantId: ormEntity.tenantId ? new uuid_value_object_1.UUID(ormEntity.tenantId) : undefined,
            costAndCurrency: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: ormEntity.cost }),
            cancellationPolicy: cancellation_policy_value_object_1.CancellationPolicyVO.create(ormEntity.apartmentRentPeriodType, {
                shortTermCancellationPolicy: ormEntity.shortTermCancellationPolicy,
                longTermCancellationPolicy: ormEntity.longTermCancellationPolicy,
            }),
            isFined: ormEntity.isFined,
            isPending: ormEntity.isPending,
            isTemporary: ormEntity.isTemporary,
            tenantPaymentMethod: ormEntity.defaultPaymentMethod && ormEntity.tenantInnopayCardId
                ? new payment_method_value_object_1.PaymentMethodVO({
                    defaultType: ormEntity.defaultPaymentMethod,
                    innopayCardId: ormEntity.tenantInnopayCardId,
                })
                : undefined,
            shortTermRentBookingType: ormEntity.rentBookingType
                ? rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(ormEntity.rentBookingType)
                : undefined,
            shortTermRentPaymentType: ormEntity.rentPaymentType
                ? short_term_rent_payment_type_value_object_1.ShortTermRentPaymentTypeVO.create(ormEntity.rentPaymentType)
                : undefined,
            baseContractApartmentAdData: new base_contract_apartment_ad_data_value_object_1.BaseContractApartmentAdDataVO(ormEntity.baseApartmentAdData),
            guests: new apartment_guests_value_object_1.ApartmentGuestsVO(ormEntity.guests),
            rentPeriodVersion: new rent_period_version_entity_1.RentPeriodVersionEntity({
                id: new uuid_value_object_1.UUID(rentPeriodVersion.id),
                props: {
                    version: rentPeriodVersion.version,
                    shortTermRentMonth: rentPeriodVersion.shortTermRentMonth,
                    middleTermRentMonth: rentPeriodVersion.middleTermRentMonth,
                    longTermRentMonth: rentPeriodVersion.longTermRentMonth,
                },
                createdAt: new date_value_object_1.DateVO(rentPeriodVersion.createdAt),
                updatedAt: new date_value_object_1.DateVO(rentPeriodVersion.updatedAt),
                deletedAt: rentPeriodVersion.deletedAt ? new date_value_object_1.DateVO(rentPeriodVersion.deletedAt) : null,
            }),
            nextPaymentTransactionId: ormEntity.nextPaymentTransactionId
                ? new uuid_value_object_1.UUID(ormEntity.nextPaymentTransactionId)
                : undefined,
            paymentData: ormEntity.paymentUrl && ormEntity.paymentUrlStartAt && ormEntity.customerReference
                ? new temporary_payment_data_value_object_1.TemporaryPaymentDataVO({
                    customerReference: ormEntity.customerReference,
                    paymentUrl: new value_objects_1.UrlVO(ormEntity.paymentUrl),
                    paymentUrlStartAt: ormEntity.paymentUrlStartAt,
                })
                : null,
            contractCancelation: ormEntity.contractCancelation
                ? new contract_cancelation_entity_1.ContractCancelationEntity({
                    id: new uuid_value_object_1.UUID(ormEntity.contractCancelation.id),
                    props: {
                        contractId: new uuid_value_object_1.UUID(ormEntity.id),
                        triggerUserId: ormEntity.contractCancelation.triggerUserId
                            ? new uuid_value_object_1.UUID(ormEntity.contractCancelation.triggerUserId)
                            : undefined,
                        cancelationDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.contractCancelation.cancelationDate),
                        checkOutDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.contractCancelation.checkOutDate),
                        refundsAmountToSender: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                            cost: ormEntity.contractCancelation.refundsAmountToSenderCost,
                            currency: ormEntity.contractCancelation.refundsAmountToSenderCurrency,
                        }),
                        transferAmountToPlatform: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                            cost: ormEntity.contractCancelation.transferAmountToPlatformCost,
                            currency: ormEntity.contractCancelation.transferAmountToPlatformCurrency,
                        }),
                        transferAmountToRecipient: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                            cost: ormEntity.contractCancelation.transferAmountToRecipientCost,
                            currency: ormEntity.contractCancelation.transferAmountToRecipientCurrency,
                        }),
                        withdrawalAmountFromSender: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                            cost: ormEntity.contractCancelation.withdrawalAmountFromSenderCost,
                            currency: ormEntity.contractCancelation.withdrawalAmountFromSenderCurrency,
                        }),
                        withdrawalAmountFromRecipient: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                            cost: ormEntity.contractCancelation.withdrawalAmountFromRecipientCost,
                            currency: ormEntity.contractCancelation.withdrawalAmountFromRecipientCurrency,
                        }),
                        isFine: ormEntity.contractCancelation.isFine,
                    },
                    createdAt: new date_value_object_1.DateVO(ormEntity.contractCancelation.createdAt),
                    updatedAt: new date_value_object_1.DateVO(ormEntity.contractCancelation.updatedAt),
                    deletedAt: ormEntity.contractCancelation.deletedAt
                        ? new date_value_object_1.DateVO(ormEntity.contractCancelation.deletedAt)
                        : null,
                })
                : undefined,
            isExistUnpaidTransactions: (existUnpaidTransactions === null || existUnpaidTransactions === void 0 ? void 0 : existUnpaidTransactions.exists) != null ? existUnpaidTransactions.exists : false,
        };
        return { id, props };
    }
}
exports.ContractOrmMapper = ContractOrmMapper;
//# sourceMappingURL=contract.orm-mapper.js.map