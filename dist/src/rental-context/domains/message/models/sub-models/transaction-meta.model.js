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
var TransactionMetaModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMetaModel = void 0;
const types_1 = require("../../../payment-transaction/domain/types");
const graphql_1 = require("@nestjs/graphql");
let TransactionMetaModel = TransactionMetaModel_1 = class TransactionMetaModel {
    static create(props) {
        const instance = new TransactionMetaModel_1();
        const assignObject = {
            id: props.id,
            startDate: props.startDate,
            endDate: props.startDate,
            withdrawFundsDate: props.withdrawFundsDate,
            status: props.status,
        };
        return Object.assign(instance, assignObject);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TransactionMetaModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TransactionMetaModel.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TransactionMetaModel.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TransactionMetaModel.prototype, "withdrawFundsDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PaymentTransactionStatus),
    __metadata("design:type", String)
], TransactionMetaModel.prototype, "status", void 0);
TransactionMetaModel = TransactionMetaModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], TransactionMetaModel);
exports.TransactionMetaModel = TransactionMetaModel;
//# sourceMappingURL=transaction-meta.model.js.map