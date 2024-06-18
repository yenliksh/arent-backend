import { ReversingInnopayTransactionRepository } from '@domain-repositories/reversing-innopay-transaction/reversing-innopay-transaction.repository';
import { CancelInnopayTransactionProducer } from '@domains/innopay-transaction/bulls/sqs-producers/cancel-innopay-transaction.producer';
import { ReversingInnopayTransactionEntity } from '@domains/innopay-transaction/domain/entities/reversing-innopay-transaction.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReverseInnopayTransactionCommand } from './reverse-innopay-transaction.command';

@CommandHandler(ReverseInnopayTransactionCommand)
export class ReverseInnopayTransactionHandler implements ICommandHandler<ReverseInnopayTransactionCommand> {
  constructor(
    private readonly reversingInnopayTransactionRepository: ReversingInnopayTransactionRepository,
    private readonly sqsProducer: CancelInnopayTransactionProducer,
  ) {}

  public async execute(command: ReverseInnopayTransactionCommand) {
    const { customerReference } = command;

    const reversingInnopayTransaction = ReversingInnopayTransactionEntity.create({ customerReference });

    await this.reversingInnopayTransactionRepository.save(reversingInnopayTransaction);

    this.sqsProducer.send({ customerReference, iteration: 0 });
  }
}
