import { ExceptionBase } from '@libs/exceptions';

export class ApartmentAdConstrainError extends ExceptionBase {
  static readonly message = 'Invalid applying changes';

  public readonly code = 'APARTMENT_AD.CONSTRAINT_ERROR';

  constructor(metadata?: unknown) {
    super(ApartmentAdConstrainError.message, metadata);
  }
}
