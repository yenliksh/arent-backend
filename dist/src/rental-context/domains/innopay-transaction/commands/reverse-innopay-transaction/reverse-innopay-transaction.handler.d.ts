import { ReversingInnopayTransactionRepository } from '@domain-repositories/reversing-innopay-transaction/reversing-innopay-transaction.repository';
import { CancelInnopayTransactionProducer } from '@domains/innopay-transaction/bulls/sqs-producers/cancel-innopay-transaction.producer';
import { ICommandHandler } from '@nestjs/cqrs';
import { ReverseInnopayTransactionCommand } from './reverse-innopay-transaction.command';
export declare class ReverseInnopayTransactionHandler implements ICommandHandler<ReverseInnopayTransactionCommand> {
    private readonly reversingInnopayTransactionRepository;
    private readonly sqsProducer;
    constructor(reversingInnopayTransactionRepository: ReversingInnopayTransactionRepository, sqsProducer: CancelInnopayTransactionProducer);
    execute(command: ReverseInnopayTransactionCommand): Promise<void>;
}
