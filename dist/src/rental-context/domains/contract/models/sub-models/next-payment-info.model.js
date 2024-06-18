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
var NextPaymentInfoModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPaymentInfoModel = void 0;
const payment_transaction_orm_entity_1 = require("../../../../../infrastructure/database/entities/payment-transaction.orm-entity");
const model_base_1 = require("../../../../../libs/ddd/interface-adapters/base-classes/model.base");
const graphql_1 = require("@nestjs/graphql");
let NextPaymentInfoModel = NextPaymentInfoModel_1 = class NextPaymentInfoModel extends model_base_1.ModelBase {
    constructor(message) {
        super(message);
    }
    static create(props) {
        const payload = new NextPaymentInfoModel_1(props);
        const assignObject = {
            contractId: props.contractId,
            withdrawFundsDate: props.withdrawFundsDate.toISOString(),
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NextPaymentInfoModel.prototype, "contractId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NextPaymentInfoModel.prototype, "withdrawFundsDate", void 0);
NextPaymentInfoModel = NextPaymentInfoModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [payment_transaction_orm_entity_1.PaymentTransactionOrmEntity])
], NextPaymentInfoModel);
exports.NextPaymentInfoModel = NextPaymentInfoModel;
//# sourceMappingURL=next-payment-info.model.js.map