export class AdminEditApartmentAdMetatagCommand {
  public constructor(
    public readonly apartmentAdId: string,
    public readonly h1?: string | undefined,
    public readonly title?: string | undefined,
    public readonly description?: string | undefined,
  ) {}
}
