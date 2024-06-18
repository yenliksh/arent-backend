import { ExceptionBase } from '@libs/exceptions';

export class MessageHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Message entity has empty fields';

  public readonly code = 'MESSAGE.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(MessageHasEmptyFieldsError.message, metadata);
  }
}
