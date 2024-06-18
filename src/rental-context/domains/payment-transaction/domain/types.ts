import { PaymentMethod } from '@infrastructure/enums';
import { registerEnumType } from '@nestjs/graphql';

export enum PaymentInvoiceType {
  WITHDRAW = 'WITHDRAW',
  RECEIVING = 'RECEIVING',
}

registerEnumType(PaymentInvoiceType, {
  name: 'PaymentInvoiceType',
});

export enum PaymentTransactionStatus {
  CASH_IN_WAITING = 'CASH_IN_WAITING', // when record of transaction is created and need to transfer money from tenant to sub livin account
  CASH_OUT_WAITING = 'CASH_OUT_WAITING', // when money was deducted from tenant and need to transfer money from sub livin account to a landlord
  COMPLETED = 'COMPLETED', // when payment transaction is completed
  CANCELED = 'CANCELED', // when a transaction has already been created, but it needs to be canceled
}

registerEnumType(PaymentTransactionStatus, {
  name: 'PaymentTransactionStatus',
});

export enum PaymentInvoiceStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

registerEnumType(PaymentInvoiceStatus, {
  name: 'PaymentInvoiceStatus',
});

export type PaymentInvoiceCursorType = {
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
