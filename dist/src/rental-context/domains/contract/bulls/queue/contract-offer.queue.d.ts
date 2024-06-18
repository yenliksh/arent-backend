import { Queue } from 'bull';
import { AcceptContractOfferJobPayload, InstantBookingJobPayload, RejectContractOfferJobPayload, SendContractOfferJobPayload, TemporaryConcludeJobPayload, TemporaryInstantBookingJobPayload } from '../types';
export declare class ContractOfferQueue {
    private contractOfferQueue;
    constructor(contractOfferQueue: Queue);
    private readonly params;
    addAcceptJob(payload: AcceptContractOfferJobPayload): void;
    addRejectJob(payload: RejectContractOfferJobPayload): void;
    addSendJob(payload: SendContractOfferJobPayload): void;
    addInstantBookingJob(payload: InstantBookingJobPayload): void;
    addTemporaryConcludeJob(payload: TemporaryConcludeJobPayload): void;
    addTemporaryInstantBookingJob(payload: TemporaryInstantBookingJobPayload): void;
}
