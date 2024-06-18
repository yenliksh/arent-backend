import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentQueue } from '@domains/payment-transaction/bulls/queue/payment.queue';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { CancelConcludedContractCommand } from './cancel-concluded-contract.command';
export declare class CancelConcludedContractHandler implements ICommandHandler<CancelConcludedContractCommand> {
    private readonly contractRepository;
    private readonly paymentQueue;
    constructor(contractRepository: ContractRepository, paymentQueue: PaymentQueue);
    execute(command: CancelConcludedContractCommand): Promise<Result<UUID, NotFoundException | ArgumentInvalidException>>;
    private addDepartureTime;
}
