import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { CommandBus } from '@nestjs/cqrs';
import { InnopayStatusService } from '@third-parties/innopay-payment/src/services/innopay-status.service';
import { Job } from 'bull';
import { StuckedInnopayGuidStatusProducer } from '../sqs-producers/stucked-innopay-guid-status.producer';
import { HandleCustomerReferenceJobPayload } from '../types';
export declare class HandleCustomerReferenceProcessor {
    private readonly contractRepository;
    private readonly sqsProducer;
    private readonly innopayStatusService;
    private commandBus;
    constructor(contractRepository: ContractRepository, sqsProducer: StuckedInnopayGuidStatusProducer, innopayStatusService: InnopayStatusService, commandBus: CommandBus);
    private readonly innopayStateMapper;
    handle(job: Job<HandleCustomerReferenceJobPayload>): Promise<void>;
    private handleSuccessState;
    private handleReadyToCompleteState;
    private handleInProgressState;
    private handleFailedState;
}
