import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { CancelContractByTenantRequest } from './cancel-contract-by-tenant.request.dto';
export declare class CancelContractByTenantService {
    private readonly contractRepository;
    private commandBus;
    constructor(contractRepository: ContractRepository, commandBus: CommandBus);
    handle(dto: CancelContractByTenantRequest, tenantId: string): Promise<Result<UUID, NotFoundException>>;
    private manuallyCancellation;
}
