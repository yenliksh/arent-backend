import { GuestsInput } from '@domains/contract-request/commands/send-request/send-request.request.dto';
import { ShortTermRentPaymentType } from '@infrastructure/enums';
export declare class ContractTemporaryInstantConcludeRequest {
    readonly apartmentAdId: string;
    readonly arrivalDate: string;
    readonly departureDate: string;
    readonly guests: GuestsInput;
    readonly comment?: string;
    readonly rentPaymentType: ShortTermRentPaymentType;
}
