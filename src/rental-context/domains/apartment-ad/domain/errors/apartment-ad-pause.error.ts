import { ExceptionBase } from '@libs/exceptions';

export class ApartmentAdPauseError extends ExceptionBase {
  static readonly message = 'Apartment ad status cannot be paused';

  public readonly code = 'APARTMENT_AD.PAUSE_ERROR';

  constructor(metadata?: unknown) {
    super(ApartmentAdPauseError.message, metadata);
  }
}
