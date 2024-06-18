import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractRequestRepository } from '@domain-repositories/contract-request/contract-request.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { RentPeriodVersionRepository } from '@domain-repositories/rent-period-version/rent-period-version.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { Result } from 'oxide.ts';
import { ContractTemporaryInstantConcludeRequest } from './contract-temporary-instant-conclude.request';
export declare class ContractTemporaryInstantConcludeService {
    private readonly apartmentAdRepository;
    private readonly contractRepository;
    private readonly contractRequestRepository;
    private readonly userRepository;
    private readonly rentPeriodVersionRepository;
    private readonly contractOfferQueue;
    private readonly pubSubService;
    private readonly unitOfWork;
    constructor(apartmentAdRepository: ApartmentAdRepository, contractRepository: ContractRepository, contractRequestRepository: ContractRequestRepository, userRepository: UserRepository, rentPeriodVersionRepository: RentPeriodVersionRepository, contractOfferQueue: ContractOfferQueue, pubSubService: PubSubService, unitOfWork: UnitOfWork);
    handle(dto: ContractTemporaryInstantConcludeRequest, userId: string): Promise<Result<UUID, Error>>;
    private createContractRequest;
    private createContract;
    private publishInnopayPageUrl;
    private getContractUTCDates;
}
