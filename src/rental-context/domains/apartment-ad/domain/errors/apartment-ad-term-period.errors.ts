import { ExceptionBase } from '@libs/exceptions';

export class ApartmentAdTermPeriodError extends ExceptionBase {
  static readonly message = 'Apartment ad has wrong term period fields';

  public readonly code = 'APARTMENT_AD.HAS_WRONG_TERM_PERIOD_FIELDS';

  constructor(metadata?: unknown) {
    super(ApartmentAdTermPeriodError.message, metadata);
  }
}
