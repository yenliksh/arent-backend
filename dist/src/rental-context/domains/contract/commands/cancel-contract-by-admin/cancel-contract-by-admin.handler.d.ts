import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { CancelContractByAdminCommand } from './cancel-contract-by-admin.command';
export declare class CancelContractByAdminHandler implements ICommandHandler<CancelContractByAdminCommand> {
    private readonly contractRepository;
    private commandBus;
    constructor(contractRepository: ContractRepository, commandBus: CommandBus);
    execute(command: CancelContractByAdminCommand): Promise<Result<UUID, NotFoundException>>;
}
