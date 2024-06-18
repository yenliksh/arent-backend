export class AdminProfileEditNameCommand {
  public constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly middleName?: string | null,
  ) {}
}
