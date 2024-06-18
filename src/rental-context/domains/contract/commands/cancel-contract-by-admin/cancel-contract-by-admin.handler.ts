import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { CancelConcludedContractCommand } from '../cancel-concluded-contract/cancel-concluded-contract.command';
import { CancelContractByAdminCommand } from './cancel-contract-by-admin.command';

@CommandHandler(CancelContractByAdminCommand)
export class CancelContractByAdminHandler implements ICommandHandler<CancelContractByAdminCommand> {
  constructor(private readonly contractRepository: ContractRepository, private commandBus: CommandBus) {}

  public async execute(command: CancelContractByAdminCommand): Promise<Result<UUID, NotFoundException>> {
    const { contractId, adminCancelMeta, trigger } = command.props;

    const contract = await this.contractRepository.findOneById(contractId.value);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }

    contract.setPending();
    await this.contractRepository.save(contract);

    const result = await this.commandBus.execute<CancelConcludedContractCommand, Result<UUID, Error>>(
      new CancelConcludedContractCommand({ contractId, trigger, adminCancelMeta }),
    );

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return Ok(contract.id);
  }
}
