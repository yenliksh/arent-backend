export class RejectAdShortTermRentCommand {
  public constructor(public readonly apartmentAdId: string, public readonly declineReason: string) {}
}
