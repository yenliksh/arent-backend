import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { ContractOfferAlreadyExistsProblem } from '@domains/contract/problems/contract-offer-already-exists.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ContractTemporaryConcludeRequest } from './contract-temporary-conclude.request';
export declare class ContractTemporaryConcludeService {
    private readonly contractRepository;
    private readonly contractOfferQueue;
    private readonly pubSubService;
    constructor(contractRepository: ContractRepository, contractOfferQueue: ContractOfferQueue, pubSubService: PubSubService);
    handle(dto: ContractTemporaryConcludeRequest, userId: string): Promise<Result<UUID, HttpException | ContractOfferAlreadyExistsProblem>>;
    private publishInnopayPageUrl;
}
