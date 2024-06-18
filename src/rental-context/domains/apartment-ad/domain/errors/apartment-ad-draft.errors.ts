import { ExceptionBase } from '@libs/exceptions';

export class ApartmentAdDraftError extends ExceptionBase {
  static readonly message = 'Apartment ad should be changes by another method';

  public readonly code = 'APARTMENT_AD.CAN_NOT_BE_CHANGED';

  constructor(metadata?: unknown) {
    super(ApartmentAdDraftError.message, metadata);
  }
}
