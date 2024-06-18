import { ExceptionBase } from '@libs/exceptions';

export class ComplaintHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Complaint entity has empty fields';

  public readonly code = 'COMPLAINT.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(ComplaintHasEmptyFieldsError.message, metadata);
  }
}
