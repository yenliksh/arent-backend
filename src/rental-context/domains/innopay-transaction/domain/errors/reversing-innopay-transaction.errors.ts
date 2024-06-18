import { ExceptionBase } from '@libs/exceptions';

export class ReversingInnopayTransactionHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Reversing innopay transaction entity has empty fields';

  public readonly code = 'REVERSING_INNOPAY_TRANSACTION.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(`${ReversingInnopayTransactionHasEmptyFieldsError.message}: ${metadata}`, metadata);
  }
}
