export class ProfileIdentityRejectCommand {
  public constructor(public readonly userId: string, public readonly rejectReason?: string) {}
}
