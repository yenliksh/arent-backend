import { ExceptionBase } from '@libs/exceptions';

export class ApartmentAdPublishError extends ExceptionBase {
  static readonly message = 'Apartment ad status cannot be published';

  public readonly code = 'APARTMENT_AD.PUBLISH_ERROR';

  constructor(metadata?: unknown) {
    super(ApartmentAdPublishError.message, metadata);
  }
}
