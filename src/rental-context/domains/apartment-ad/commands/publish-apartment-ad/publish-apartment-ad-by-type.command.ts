import { ApartmentRentPeriodType } from '@infrastructure/enums';

export class PublishApartmentAdByTypeCommand {
  public constructor(public readonly apartmentAdId: string, public readonly periodType: ApartmentRentPeriodType) {}
}
