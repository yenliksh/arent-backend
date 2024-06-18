"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryPaymentTransactionOrmMapper = void 0;
const cost_and_currency_value_object_1 = require("../../domain-value-objects/cost-and-currency.value-object");
const tax_value_object_1 = require("../../domain-value-objects/tax.value-object");
const date_time_iso_tz_value_object_1 = require("../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
const date_util_1 = require("../../../libs/utils/date-util");
class TemporaryPaymentTransactionOrmMapper extends orm_mapper_base_1.OrmMapper {
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
            isFirst: props.isFirst,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity) {
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const props = {
            contractId: new uuid_value_object_1.UUID(ormEntity.contractId),
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
            isFirst: ormEntity.isFirst,
        };
        return { id, props };
    }
}
exports.TemporaryPaymentTransactionOrmMapper = TemporaryPaymentTransactionOrmMapper;
//# sourceMappingURL=temporary-payment-transaction.orm-mapper.js.map