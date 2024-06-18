export class AdminEditApartmentAdDescriptionCommand {
  public constructor(
    public readonly apartmentAdId: string,
    public readonly name?: string | undefined,
    public readonly descriptionText?: string | undefined,
  ) {}
}
