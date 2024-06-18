import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ContractRequestRepository } from 'src/rental-context/domain-repositories/contract-request/contract-request.repository';
import { RejectRequest } from './reject-request.request.dto';
export declare class RejectRequestService {
    private readonly contractRequestRepository;
    constructor(contractRequestRepository: ContractRequestRepository);
    handle(userId: UUID, dto: RejectRequest): Promise<Result<UUID, ArgumentInvalidException | HttpException>>;
}
