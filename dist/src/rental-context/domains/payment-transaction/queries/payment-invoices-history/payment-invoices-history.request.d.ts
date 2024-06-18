import { PaymentHistorySearchType } from '@domains/payment-transaction/types';
import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
export declare class PaymentInvoicesHistoryRequest extends BaseAfterCursorPaginateRequest {
    readonly paymentSearchType: PaymentHistorySearchType;
}
