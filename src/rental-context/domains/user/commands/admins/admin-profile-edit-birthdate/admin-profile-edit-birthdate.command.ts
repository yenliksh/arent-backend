export class AdminProfileEditBirthdateCommand {
  public constructor(public readonly userId: string, public readonly birthdate: string) {}
}
