"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPaymentTransactionService = void 0;
const types_1 = require("../../../contract/base-classes/rental-manager/types");
const payment_transaction_entity_1 = require("../../domain/entities/payment-transaction.entity");
const types_2 = require("../../domain/types");
const types_3 = require("../../types");
const payment_transaction_orm_entity_1 = require("../../../../../infrastructure/database/entities/payment-transaction.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let NextPaymentTransactionService = class NextPaymentTransactionService {
    async handle(userId, paymentSearchType) {
        const usePaymentSearchFilter = {
            [types_3.PaymentHistorySearchType.SINGLE]: (paymentTransactionsQb) => paymentTransactionsQb.where({ rentPeriodStrategyType: types_1.RentPeriodStrategyType.SHORT_TERM_RENT }),
            [types_3.PaymentHistorySearchType.RECURRING]: (paymentTransactionsQb) => paymentTransactionsQb.whereIn('rentPeriodStrategyType', [
                types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT,
                types_1.RentPeriodStrategyType.LONG_TERM_RENT,
            ]),
        };
        const paymentTransactionsQb = payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query()
            .innerJoinRelated({ contract: true })
            .where('contract.tenantId', userId.value)
            .where(`${payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.tableName}.status`, types_2.PaymentTransactionStatus.CASH_IN_WAITING)
            .where((builder) => builder
            .whereRaw(`${payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.tableName}."withdrawFundsDate" <= NOW() + INTERVAL '${payment_transaction_entity_1.PaymentTransactionEntity.EARLY_PAY_DAYS} day'`)
            .orWhere((builder) => {
            builder.whereRaw('payment_transactions.id = contract."nextPaymentTransactionId"');
        }))
            .orderBy('payment_transactions.withdrawFundsDate', 'ASC');
        usePaymentSearchFilter[paymentSearchType](paymentTransactionsQb);
        const paymentTransactions = await paymentTransactionsQb;
        return (0, oxide_ts_1.Ok)(paymentTransactions);
    }
};
NextPaymentTransactionService = __decorate([
    (0, common_1.Injectable)()
], NextPaymentTransactionService);
exports.NextPaymentTransactionService = NextPaymentTransactionService;
//# sourceMappingURL=next-payment-transaction.service.js.map