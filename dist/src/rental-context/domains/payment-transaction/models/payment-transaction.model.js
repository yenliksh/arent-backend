"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentTransactionModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionModel = void 0;
const types_1 = require("../../apartment-ad/domain/types");
const cost_rounds_util_1 = require("../../contract/base-classes/rental-strategies/utils/cost-rounds.util");
const contract_model_1 = require("../../contract/models/contract.model");
const payment_transaction_orm_entity_1 = require("../../../../infrastructure/database/entities/payment-transaction.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const date_util_1 = require("../../../../libs/utils/date-util");
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
const constants_1 = require("../../../constants");
const payment_transaction_entity_1 = require("../domain/entities/payment-transaction.entity");
const types_2 = require("../domain/types");
let PaymentTransactionModel = PaymentTransactionModel_1 = class PaymentTransactionModel extends model_base_1.ModelBase {
    constructor(message) {
        super(message);
    }
    static create(props) {
        const payload = new PaymentTransactionModel_1(props);
        const assignObject = {
            contractId: props.contractId,
            cost: (0, minimal_unit_helper_1.toMinorUnitString)(props.cost),
            currency: props.currency,
            endDate: props.endDate.toISOString(),
            recipientTaxRate: props.recipientTaxRate,
            rentDays: props.rentDays,
            senderTaxRate: props.senderTaxRate,
            startDate: props.startDate.toISOString(),
            status: props.status,
            taxAmount: (0, minimal_unit_helper_1.toMinorUnitString)(props.taxAmount),
            totalAmountPayable: (0, minimal_unit_helper_1.toMinorUnitString)(props.totalAmountPayable),
            totalAmountToBeTransferred: (0, minimal_unit_helper_1.toMinorUnitString)((0, cost_rounds_util_1.costCeil)(props.totalAmountToBeTransferred * (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE))),
            withdrawFundsDate: props.withdrawFundsDate.toISOString(),
            isReadyToPay: date_util_1.DateUtil.parseUTC(props.withdrawFundsDate) <=
                date_util_1.DateUtil.utcNow().add(payment_transaction_entity_1.PaymentTransactionEntity.EARLY_PAY_DAYS, 'day'),
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "contractId", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.CurrencyType),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "withdrawFundsDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "totalAmountPayable", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "totalAmountToBeTransferred", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], PaymentTransactionModel.prototype, "senderTaxRate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], PaymentTransactionModel.prototype, "recipientTaxRate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaymentTransactionModel.prototype, "rentDays", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "cost", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "taxAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_2.PaymentTransactionStatus),
    __metadata("design:type", String)
], PaymentTransactionModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], PaymentTransactionModel.prototype, "isReadyToPay", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => contract_model_1.BaseContractModel),
    __metadata("design:type", contract_model_1.BaseContractModel)
], PaymentTransactionModel.prototype, "contract", void 0);
PaymentTransactionModel = PaymentTransactionModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [payment_transaction_orm_entity_1.PaymentTransactionOrmEntity])
], PaymentTransactionModel);
exports.PaymentTransactionModel = PaymentTransactionModel;
//# sourceMappingURL=payment-transaction.model.js.map