import { PaymentMethod } from '@infrastructure/enums';
export declare enum PaymentInvoiceType {
    WITHDRAW = "WITHDRAW",
    RECEIVING = "RECEIVING"
}
export declare enum PaymentTransactionStatus {
    CASH_IN_WAITING = "CASH_IN_WAITING",
    CASH_OUT_WAITING = "CASH_OUT_WAITING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}
export declare enum PaymentInvoiceStatus {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
export declare type PaymentInvoiceCursorType = {
    id: string;
    createdAt: Date;
};
export interface CardMeta {
    id: string;
    paymentMethod: PaymentMethod;
    cardType: string;
    panMasked: string;
    cardHolder: string;
}
