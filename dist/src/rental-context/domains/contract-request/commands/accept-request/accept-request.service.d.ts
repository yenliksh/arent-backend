import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { HttpException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { ContractRequestRepository } from 'src/rental-context/domain-repositories/contract-request/contract-request.repository';
import { AcceptRequest } from './accept-request.request.dto';
export declare class AcceptRequestService {
    private readonly contractRequestRepository;
    private commandBus;
    private readonly unitOfWork;
    constructor(contractRequestRepository: ContractRequestRepository, commandBus: CommandBus, unitOfWork: UnitOfWork);
    handle(userId: UUID, dto: AcceptRequest): Promise<Result<[UUID, UUID], ArgumentInvalidException | HttpException>>;
}
