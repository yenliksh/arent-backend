import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { PaymentQueue } from '@domains/payment-transaction/bulls/queue/payment.queue';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { TenantManuallyPayCommand } from './tenant-manually-pay.command';
export declare class TenantManuallyPayHandler implements ICommandHandler<TenantManuallyPayCommand> {
    private readonly paymentQueue;
    private readonly paymentTransactionRepository;
    private readonly contractRepository;
    private readonly pubSubService;
    constructor(paymentQueue: PaymentQueue, paymentTransactionRepository: PaymentTransactionRepository, contractRepository: ContractRepository, pubSubService: PubSubService);
    execute(command: TenantManuallyPayCommand): Promise<Result<UUID, HttpException | ArgumentInvalidException>>;
    private publishContract;
}
