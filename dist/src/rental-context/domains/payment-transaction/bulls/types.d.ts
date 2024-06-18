import { AdminCancelationMode, CancellationTrigger } from '@domains/contract/domain/types';
export declare enum PaymentBulls {
    PAYMENT_TRANSACTION = "PAYMENT_TRANSACTION"
}
export declare enum PaymentTransactionProcess {
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT",
    CANCEL = "CANCEL"
}
export interface TransactionJobPayload {
    paymentTransactionId: string;
}
export interface CancelTransactionJobPayload {
    contractId: string;
    adminCancelMeta?: AdminCancelationMode;
    trigger: CancellationTrigger;
    checkOutDate?: string;
}
