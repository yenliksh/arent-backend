export class RejectAdLongTermRentCommand {
  public constructor(public readonly apartmentAdId: string, public readonly declineReason: string) {}
}
