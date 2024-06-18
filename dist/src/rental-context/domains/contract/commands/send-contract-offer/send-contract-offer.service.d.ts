import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { NotFoundException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ContractRepository } from 'src/rental-context/domain-repositories/contract/contract.repository';
import { ContractOfferAlreadyExistsProblem } from 'src/rental-context/domains/contract/problems/contract-offer-already-exists.problem';
import { SendContractOfferRequest } from './send-contract-offer.request.dto';
export declare class SendContractOfferService {
    private readonly contractRepository;
    private readonly apartmentAdRepository;
    private readonly contractOfferQueue;
    constructor(contractRepository: ContractRepository, apartmentAdRepository: ApartmentAdRepository, contractOfferQueue: ContractOfferQueue);
    handle(dto: SendContractOfferRequest, userId: UUID): Promise<Result<UUID, NotFoundException | ArgumentInvalidException | ContractOfferAlreadyExistsProblem>>;
    private getContractUTCDates;
}
