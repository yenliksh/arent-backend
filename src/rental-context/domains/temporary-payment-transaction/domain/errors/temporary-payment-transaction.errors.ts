import { ExceptionBase } from '@libs/exceptions';

export class TemporaryPaymentTransactionHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Temporary payment transaction entity has empty fields';

  public readonly code = 'TemporaryPaymentTransaction.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(`${TemporaryPaymentTransactionHasEmptyFieldsError.message}: ${metadata}`, metadata);
  }
}
