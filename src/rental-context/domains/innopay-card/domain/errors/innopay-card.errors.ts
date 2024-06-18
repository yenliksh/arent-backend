import { ExceptionBase } from '@libs/exceptions';

export class InnopayCardHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Innopay entity has empty fields';

  public readonly code = 'INNOPAY.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(InnopayCardHasEmptyFieldsError.message, metadata);
  }
}
