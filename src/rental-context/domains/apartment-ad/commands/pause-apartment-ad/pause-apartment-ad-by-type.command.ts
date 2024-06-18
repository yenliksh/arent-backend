import { ApartmentRentPeriodType } from '@infrastructure/enums';

export class PauseApartmentAdByTypeCommand {
  public constructor(public readonly apartmentAdId: string, public readonly periodType: ApartmentRentPeriodType) {}
}
