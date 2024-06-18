import { ExceptionBase } from '@libs/exceptions';

export class UserComplaintHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'UserComplaint entity has empty fields';

  public readonly code = 'USER_COMPLAINT.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(UserComplaintHasEmptyFieldsError.message, metadata);
  }
}
