import { CashInTransactionStatus, CashOutTransactionStatus } from '../sdk/innopay-api.types';

export const InnopayCashInFailedStatus = [
  CashInTransactionStatus.NO_SUCH_TRANSACTION,
  CashInTransactionStatus.DECLINED,
  CashInTransactionStatus.REVERSED,
  CashInTransactionStatus.REFUNDED,
];

export const InnopayCashInSuccessStatus = [CashInTransactionStatus.PAID];

export const InnopayCashInReadyToCompleteStatus = [CashInTransactionStatus.AUTHORISED];

export const InnopayCashInCanceledStatus = [CashInTransactionStatus.REVERSED];

export const InnopayCashOutFinalStatus = [
  CashOutTransactionStatus.DECLINED,
  CashOutTransactionStatus.REVERSED,
  CashOutTransactionStatus.PROCESSED,
  CashOutTransactionStatus.NO_SUCH_TRANSACTION,
];
