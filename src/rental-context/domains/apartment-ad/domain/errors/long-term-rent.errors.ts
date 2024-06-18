import { ExceptionBase } from '@libs/exceptions';

export class LongTermRentError extends ExceptionBase {
  static readonly message = 'Apartment ad must be a long term rent type for applying changes';

  public readonly code = 'APARTMENT_AD.UNEXPECTED_ACTION';

  constructor(metadata?: unknown) {
    super(LongTermRentError.message, metadata);
  }
}
