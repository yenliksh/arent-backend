import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { PaymentInvoiceCursorType } from '@domains/payment-transaction/domain/types';
import { PaymentHistorySearchType } from '@domains/payment-transaction/types';
import { PaymentInvoiceOrmEntity } from '@infrastructure/database/entities/payment-invoice.orm-entity';
import { PaginationResult, decodeCursor, getDataWithAfterCursor } from '@libs/utils/cursor-paginator';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';

import { PaymentInvoicesHistoryRequest } from './payment-invoices-history.request';

@Injectable()
export class PaymentInvoicesHistoryService {
  async handle(
    userId: string,
    input: PaymentInvoicesHistoryRequest,
  ): Promise<Ok<PaginationResult<PaymentInvoiceOrmEntity>>> {
    const { paymentSearchType, afterCursor, limit = 20 } = input;

    const cursorAfter: PaymentInvoiceCursorType | undefined = afterCursor
      ? decodeCursor<PaymentInvoiceCursorType>(afterCursor)
      : undefined;

    const paymentInvoicesQb = PaymentInvoiceOrmEntity.query()
      .innerJoinRelated({ transaction: true })
      .where({ refersToUserId: userId })
      .limit(limit + 1)
      .orderBy([
        { column: 'createdAt', order: 'DESC' },
        { column: 'id', order: 'DESC' },
      ]);

    if (paymentSearchType === PaymentHistorySearchType.SINGLE) {
      paymentInvoicesQb.where({ rentPeriodStrategyType: RentPeriodStrategyType.SHORT_TERM_RENT });
    }

    if (paymentSearchType === PaymentHistorySearchType.RECURRING) {
      paymentInvoicesQb.whereIn('rentPeriodStrategyType', [
        RentPeriodStrategyType.MIDDLE_TERM_RENT,
        RentPeriodStrategyType.LONG_TERM_RENT,
      ]);
    }

    if (cursorAfter) {
      paymentInvoicesQb.andWhere((builder) => {
        builder
          .whereRaw(
            `${PaymentInvoiceOrmEntity.tableName}."createdAt"::timestamptz < '${cursorAfter.createdAt}'::timestamptz`,
          )
          .orWhereRaw(
            `(${PaymentInvoiceOrmEntity.tableName}."createdAt"::timestamptz = '${cursorAfter.createdAt}'::timestamptz)
            AND (${PaymentInvoiceOrmEntity.tableName}."id" < '${cursorAfter.id}')`,
          );
      });
    }

    const paymentInvoices = await paymentInvoicesQb;

    const returningData = getDataWithAfterCursor<PaymentInvoiceOrmEntity, PaymentInvoiceOrmEntity>(
      paymentInvoices,
      limit,
      (i) => i,
      null,
      ['createdAt', 'id'],
    );

    return Ok(returningData);
  }
}
