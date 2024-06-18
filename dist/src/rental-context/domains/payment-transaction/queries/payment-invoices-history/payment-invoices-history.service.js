"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInvoicesHistoryService = void 0;
const types_1 = require("../../../contract/base-classes/rental-manager/types");
const types_2 = require("../../types");
const payment_invoice_orm_entity_1 = require("../../../../../infrastructure/database/entities/payment-invoice.orm-entity");
const cursor_paginator_1 = require("../../../../../libs/utils/cursor-paginator");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let PaymentInvoicesHistoryService = class PaymentInvoicesHistoryService {
    async handle(userId, input) {
        const { paymentSearchType, afterCursor, limit = 20 } = input;
        const cursorAfter = afterCursor
            ? (0, cursor_paginator_1.decodeCursor)(afterCursor)
            : undefined;
        const paymentInvoicesQb = payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity.query()
            .innerJoinRelated({ transaction: true })
            .where({ refersToUserId: userId })
            .limit(limit + 1)
            .orderBy([
            { column: 'createdAt', order: 'DESC' },
            { column: 'id', order: 'DESC' },
        ]);
        if (paymentSearchType === types_2.PaymentHistorySearchType.SINGLE) {
            paymentInvoicesQb.where({ rentPeriodStrategyType: types_1.RentPeriodStrategyType.SHORT_TERM_RENT });
        }
        if (paymentSearchType === types_2.PaymentHistorySearchType.RECURRING) {
            paymentInvoicesQb.whereIn('rentPeriodStrategyType', [
                types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT,
                types_1.RentPeriodStrategyType.LONG_TERM_RENT,
            ]);
        }
        if (cursorAfter) {
            paymentInvoicesQb.andWhere((builder) => {
                builder
                    .whereRaw(`${payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity.tableName}."createdAt"::timestamptz < '${cursorAfter.createdAt}'::timestamptz`)
                    .orWhereRaw(`(${payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity.tableName}."createdAt"::timestamptz = '${cursorAfter.createdAt}'::timestamptz)
            AND (${payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity.tableName}."id" < '${cursorAfter.id}')`);
            });
        }
        const paymentInvoices = await paymentInvoicesQb;
        const returningData = (0, cursor_paginator_1.getDataWithAfterCursor)(paymentInvoices, limit, (i) => i, null, ['createdAt', 'id']);
        return (0, oxide_ts_1.Ok)(returningData);
    }
};
PaymentInvoicesHistoryService = __decorate([
    (0, common_1.Injectable)()
], PaymentInvoicesHistoryService);
exports.PaymentInvoicesHistoryService = PaymentInvoicesHistoryService;
//# sourceMappingURL=payment-invoices-history.service.js.map