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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionQueryGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const uuid_value_object_1 = require("../../../../libs/ddd/domain/value-objects/uuid.value-object");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const payment_invoices_pagination_response_dto_1 = require("../dtos/payment-invoices-pagination.response.dto");
const payment_transaction_model_1 = require("../models/payment-transaction.model");
const next_payment_transaction_service_1 = require("../queries/next-payment-transaction/next-payment-transaction.service");
const next_payment_transactions_request_dto_1 = require("../queries/next-payment-transaction/next-payment-transactions.request.dto");
const payment_invoices_history_request_1 = require("../queries/payment-invoices-history/payment-invoices-history.request");
const payment_invoices_history_service_1 = require("../queries/payment-invoices-history/payment-invoices-history.service");
let PaymentTransactionQueryGraphqlResolver = class PaymentTransactionQueryGraphqlResolver {
    constructor(paymentInvoicesHistoryService, nextPaymentTransactionService) {
        this.paymentInvoicesHistoryService = paymentInvoicesHistoryService;
        this.nextPaymentTransactionService = nextPaymentTransactionService;
    }
    async invoiceHistory(iam, input) {
        const result = await this.paymentInvoicesHistoryService.handle(iam.id, input);
        return payment_invoices_pagination_response_dto_1.PaymentInvoicesPaginationResponse.create(result.unwrap());
    }
    async nextPayment(iam, input) {
        const result = await this.nextPaymentTransactionService.handle(new uuid_value_object_1.UUID(iam.id), input.paymentSearchType);
        return result.unwrap().map(payment_transaction_model_1.PaymentTransactionModel.create);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => payment_invoices_pagination_response_dto_1.PaymentInvoicesPaginationResponse, { name: 'paymentTransaction_historyInvoice' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        payment_invoices_history_request_1.PaymentInvoicesHistoryRequest]),
    __metadata("design:returntype", Promise)
], PaymentTransactionQueryGraphqlResolver.prototype, "invoiceHistory", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => [payment_transaction_model_1.PaymentTransactionModel], { name: 'paymentTransaction_paymentNext' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        next_payment_transactions_request_dto_1.NextPaymentTransactionRequest]),
    __metadata("design:returntype", Promise)
], PaymentTransactionQueryGraphqlResolver.prototype, "nextPayment", null);
PaymentTransactionQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [payment_invoices_history_service_1.PaymentInvoicesHistoryService,
        next_payment_transaction_service_1.NextPaymentTransactionService])
], PaymentTransactionQueryGraphqlResolver);
exports.PaymentTransactionQueryGraphqlResolver = PaymentTransactionQueryGraphqlResolver;
//# sourceMappingURL=payment-transaction.query.resolver.js.map