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
var PaymentInvoiceModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInvoiceModel = void 0;
const payment_invoice_orm_entity_1 = require("../../../../infrastructure/database/entities/payment-invoice.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../domain/types");
const payment_transaction_model_1 = require("./payment-transaction.model");
const card_meta_model_1 = require("./sub-models/card-meta.model");
let PaymentInvoiceModel = PaymentInvoiceModel_1 = class PaymentInvoiceModel extends model_base_1.ModelBase {
    constructor(message) {
        super(message);
    }
    static create(props) {
        const payload = new PaymentInvoiceModel_1(props);
        const assignObject = {
            invoiceDate: props.createdAt.toISOString(),
            paymentTransactionId: props.paymentTransactionId,
            refersToUserId: props.refersToUserId,
            type: props.type,
            isSuccess: props.status === types_1.PaymentInvoiceStatus.SUCCESS,
            cardMeta: props.cardMeta ? card_meta_model_1.CardMetaModel.create(props.cardMeta) : undefined,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentInvoiceModel.prototype, "paymentTransactionId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentInvoiceModel.prototype, "invoiceDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PaymentInvoiceModel.prototype, "refersToUserId", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PaymentInvoiceType),
    __metadata("design:type", String)
], PaymentInvoiceModel.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], PaymentInvoiceModel.prototype, "isSuccess", void 0);
__decorate([
    (0, graphql_1.Field)(() => card_meta_model_1.CardMetaModel, { nullable: true }),
    __metadata("design:type", card_meta_model_1.CardMetaModel)
], PaymentInvoiceModel.prototype, "cardMeta", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => payment_transaction_model_1.PaymentTransactionModel),
    __metadata("design:type", payment_transaction_model_1.PaymentTransactionModel)
], PaymentInvoiceModel.prototype, "paymentTransaction", void 0);
PaymentInvoiceModel = PaymentInvoiceModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity])
], PaymentInvoiceModel);
exports.PaymentInvoiceModel = PaymentInvoiceModel;
//# sourceMappingURL=payment-invoice.model.js.map