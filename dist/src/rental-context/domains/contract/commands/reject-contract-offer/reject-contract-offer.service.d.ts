import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { RejectContractOfferRequest } from './reject-contract-offer.request.dto';
export declare class RejectContractOfferService {
    private readonly contractRepository;
    private readonly contractOfferQueue;
    constructor(contractRepository: ContractRepository, contractOfferQueue: ContractOfferQueue);
    handle(dto: RejectContractOfferRequest, userId: string): Promise<Result<UUID, NotFoundException>>;
}
