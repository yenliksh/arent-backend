import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';

import { CompletePastContractsCommand } from './complete-past-contracts.command';

@CommandHandler(CompletePastContractsCommand)
export class CompletePastContractHandler implements ICommandHandler<CompletePastContractsCommand> {
  constructor(private readonly contractRepository: ContractRepository) {}

  public async execute(): Promise<Ok<boolean>> {
    const contracts = await this.contractRepository.findCompletedPastContracts();

    contracts.map((contract) => {
      contract.completePast();
    });

    await this.contractRepository.saveMany(contracts);

    return Ok(true);
  }
}
