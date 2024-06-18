import { ExceptionBase } from '@libs/exceptions';

export class ApartmentAdHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Apartment ad entity has empty fields';

  public readonly code = 'APARTMENT_AD.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(ApartmentAdHasEmptyFieldsError.message, metadata);
  }
}
