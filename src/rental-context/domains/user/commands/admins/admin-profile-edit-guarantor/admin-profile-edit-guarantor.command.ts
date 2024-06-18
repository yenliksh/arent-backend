export class AdminProfileEditGuarantorCommand {
  public constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phone: string,
  ) {}
}
