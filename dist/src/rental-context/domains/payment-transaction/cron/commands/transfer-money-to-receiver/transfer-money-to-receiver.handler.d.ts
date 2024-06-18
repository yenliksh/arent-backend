import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { PaymentQueue } from '@domains/payment-transaction/bulls/queue/payment.queue';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import { TransferMoneyToReceiverCommand } from './transfer-money-to-receiver.command';
export declare class TransferMoneyToReceiverHandler implements ICommandHandler<TransferMoneyToReceiverCommand> {
    private readonly paymentQueue;
    private readonly contractRepository;
    private readonly paymentTransactionRepository;
    private readonly pubSubService;
    private readonly unitOfWork;
    constructor(paymentQueue: PaymentQueue, contractRepository: ContractRepository, paymentTransactionRepository: PaymentTransactionRepository, pubSubService: PubSubService, unitOfWork: UnitOfWork);
    execute(): Promise<Ok<boolean>>;
    private publishContract;
}
