import { ExceptionBase } from '@libs/exceptions';

export class PaymentTransactionHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Payment transaction entity has empty fields';

  public readonly code = 'PAYMENT_TRANSACTION.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(PaymentTransactionHasEmptyFieldsError.message, metadata);
  }
}
