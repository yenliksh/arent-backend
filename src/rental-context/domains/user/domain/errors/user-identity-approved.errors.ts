import { ExceptionBase } from '@libs/exceptions';

export class UserIdentityApprovedError extends ExceptionBase {
  static readonly message = 'Fields of an identified user cannot be changed';

  public readonly code = 'USER.IDENTITY_APPROVED';

  constructor(metadata?: unknown) {
    super(UserIdentityApprovedError.message, metadata);
  }
}
