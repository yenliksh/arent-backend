export enum InnopayBulls {
  INNOPAY_TRANSACTION = 'INNOPAY_TRANSACTION',
}

export enum InnopayTransactionProcess {
  HANDLE_CUSTOMER_REFERENCE = 'HANDLE_CUSTOMER_REFERENCE',
  CANCEL_INNOPAY_TRANSACTION = 'CANCEL_INNOPAY_TRANSACTION',
  COMPLETE_CASH_OUT = 'COMPLETE_CASH_OUT',
}

export interface HandleCustomerReferenceJobPayload {
  customerReference: string;
  iteration?: number;
}

export interface CancelInnopayTransactionJobPayload {
  customerReference: string;
  iteration?: number;
}

export interface CompleteCashOutInnopayTransactionJobPayload {
  customerReference: string;
  success: boolean;
  iteration?: number;
}

export interface InnopayTransactionsQueueData {
  customerReference: string;
  iteration: number;
}

export interface CompleteCashOutInnopayTransactionsQueueData {
  customerReference: string;
  success: boolean;
  iteration: number;
}
