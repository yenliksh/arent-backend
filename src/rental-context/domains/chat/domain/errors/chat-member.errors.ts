import { ExceptionBase } from '@libs/exceptions';

export class ChatMemberHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Chat member entity has empty fields';

  public readonly code = 'CHAT_MEMBER.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(ChatMemberHasEmptyFieldsError.message, metadata);
  }
}
