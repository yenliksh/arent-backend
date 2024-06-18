import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { ContractOfferAlreadyExistsProblem } from '@domains/contract/problems/contract-offer-already-exists.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { AcceptContractOfferRequest } from './accept-contract-offer.request.dto';
export declare class AcceptContractOfferService {
    private readonly contractRepository;
    private readonly contractOfferQueue;
    constructor(contractRepository: ContractRepository, contractOfferQueue: ContractOfferQueue);
    handle(dto: AcceptContractOfferRequest, userId: string): Promise<Result<UUID, IllegalOperationException | HttpException | ArgumentInvalidException | ContractOfferAlreadyExistsProblem>>;
}
