import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { RentPeriodVersionRepository } from '@domain-repositories/rent-period-version/rent-period-version.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ExceptionBase } from '@libs/exceptions';
import { HttpException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractRequestRepository } from 'src/rental-context/domain-repositories/contract-request/contract-request.repository';
import { SendRequest } from './send-request.request.dto';
export declare class SendRequestService {
    private readonly contractRequestRepository;
    private readonly contractRepository;
    private readonly apartmentAdRepository;
    private readonly rentPeriodVersionRepository;
    private readonly contractOfferQueue;
    private commandBus;
    private readonly unitOfWork;
    private readonly eventEmitter;
    constructor(contractRequestRepository: ContractRequestRepository, contractRepository: ContractRepository, apartmentAdRepository: ApartmentAdRepository, rentPeriodVersionRepository: RentPeriodVersionRepository, contractOfferQueue: ContractOfferQueue, commandBus: CommandBus, unitOfWork: UnitOfWork, eventEmitter: EventEmitter2);
    handle(tenantId: UUID, dto: SendRequest): Promise<Result<UUID, LocalizedProblem | ExceptionBase | HttpException>>;
    private getContractUTCDates;
    private instantBooking;
}
