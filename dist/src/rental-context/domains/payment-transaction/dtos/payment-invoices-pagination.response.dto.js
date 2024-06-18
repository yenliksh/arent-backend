"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentInvoicesPaginationResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInvoicesPaginationResponse = void 0;
const openapi = require("@nestjs/swagger");
const base_cursor_pagination_response_1 = require("../../../../infrastructure/dto/base-cursor-pagination.response");
const graphql_1 = require("@nestjs/graphql");
const payment_invoice_model_1 = require("../models/payment-invoice.model");
let PaymentInvoicesPaginationResponse = PaymentInvoicesPaginationResponse_1 = class PaymentInvoicesPaginationResponse extends (0, base_cursor_pagination_response_1.BaseAfterCursorPaginationResponse)(payment_invoice_model_1.PaymentInvoiceModel) {
    static create(props) {
        const payload = new PaymentInvoicesPaginationResponse_1();
        payload.data = props.data.map(payment_invoice_model_1.PaymentInvoiceModel.create);
        payload.pageInfo = props.pageInfo;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
};
PaymentInvoicesPaginationResponse = PaymentInvoicesPaginationResponse_1 = __decorate([
    (0, graphql_1.ObjectType)('PaymentInvoicePayload')
], PaymentInvoicesPaginationResponse);
exports.PaymentInvoicesPaginationResponse = PaymentInvoicesPaginationResponse;
//# sourceMappingURL=payment-invoices-pagination.response.dto.js.map