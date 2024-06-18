import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { CommandBus } from '@nestjs/cqrs';
import { Job } from 'bull';
import { ContractOfferPubSubService } from '../services/contract-offer-pub-sub.service';
import { RejectContractOfferJobPayload } from '../types';
export declare class RejectContractOfferProcessor {
    private readonly contractRepository;
    private readonly chatRepository;
    private readonly contractOfferPubSubService;
    private readonly unitOfWork;
    private commandBus;
    constructor(contractRepository: ContractRepository, chatRepository: ChatRepository, contractOfferPubSubService: ContractOfferPubSubService, unitOfWork: UnitOfWork, commandBus: CommandBus);
    handle(job: Job<RejectContractOfferJobPayload>): Promise<[void, void]>;
    private findChatByContract;
}
