import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import {
  AcceptContractOfferJobPayload,
  ContractBulls,
  ContractOfferProcess,
  InstantBookingJobPayload,
  RejectContractOfferJobPayload,
  SendContractOfferJobPayload,
  TemporaryConcludeJobPayload,
  TemporaryInstantBookingJobPayload,
} from '../types';

@Injectable()
export class ContractOfferQueue {
  constructor(@InjectQueue(ContractBulls.CONTRACT_OFFER_QUEUE) private contractOfferQueue: Queue) {}

  private readonly params = {
    removeOnFail: true,
    removeOnComplete: true,
  };

  addAcceptJob(payload: AcceptContractOfferJobPayload) {
    this.contractOfferQueue.add(ContractOfferProcess.ACCEPT, payload, this.params);
  }

  addRejectJob(payload: RejectContractOfferJobPayload) {
    this.contractOfferQueue.add(ContractOfferProcess.REJECT, payload, this.params);
  }

  addSendJob(payload: SendContractOfferJobPayload) {
    this.contractOfferQueue.add(ContractOfferProcess.SEND, payload, this.params);
  }

  addInstantBookingJob(payload: InstantBookingJobPayload) {
    this.contractOfferQueue.add(ContractOfferProcess.INSTANT_BOOKING, payload, this.params);
  }

  addTemporaryConcludeJob(payload: TemporaryConcludeJobPayload) {
    this.contractOfferQueue.add(ContractOfferProcess.TEMPORARY_CONCLUDE, payload, this.params);
  }

  addTemporaryInstantBookingJob(payload: TemporaryInstantBookingJobPayload) {
    this.contractOfferQueue.add(ContractOfferProcess.INSTANT_TEMPORARY_BOOKING, payload, this.params);
  }
}
