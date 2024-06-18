import { PaymentInvoiceOrmEntity } from '@infrastructure/database/entities/payment-invoice.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { Ok } from 'oxide.ts';
import { PaymentInvoicesHistoryRequest } from './payment-invoices-history.request';
export declare class PaymentInvoicesHistoryService {
    handle(userId: string, input: PaymentInvoicesHistoryRequest): Promise<Ok<PaginationResult<PaymentInvoiceOrmEntity>>>;
}
