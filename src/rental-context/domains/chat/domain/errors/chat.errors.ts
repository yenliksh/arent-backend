import { ExceptionBase } from '@libs/exceptions';

export class ChatHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Chat entity has empty fields';

  public readonly code = 'CHAT.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(ChatHasEmptyFieldsError.message, metadata);
  }
}
