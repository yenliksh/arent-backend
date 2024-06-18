import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import { CompletePastContractsCommand } from './complete-past-contracts.command';
export declare class CompletePastContractHandler implements ICommandHandler<CompletePastContractsCommand> {
    private readonly contractRepository;
    constructor(contractRepository: ContractRepository);
    execute(): Promise<Ok<boolean>>;
}
