import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentQueue } from '@domains/payment-transaction/bulls/queue/payment.queue';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';

import { TransferMoneyToReceiverCommand } from './transfer-money-to-receiver.command';

@CommandHandler(TransferMoneyToReceiverCommand)
export class TransferMoneyToReceiverHandler implements ICommandHandler<TransferMoneyToReceiverCommand> {
  constructor(
    private readonly paymentQueue: PaymentQueue,
    private readonly contractRepository: ContractRepository,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly pubSubService: PubSubService,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  public async execute(): Promise<Ok<boolean>> {
    const trxId = await this.unitOfWork.start();

    try {
      const actualTransactionIds = await this.paymentTransactionRepository.findActualCashOutWaitingIds(trxId);
      const contracts = await this.contractRepository.findManyByPaymentTransactionIds(
        actualTransactionIds.map((i) => i.value),
        trxId,
      );

      await Promise.all(
        contracts.map((contract) => {
          contract.setPending();
          return this.contractRepository.save(contract, trxId);
        }),
      );

      await this.unitOfWork.execute(trxId);

      contracts.forEach((contract) => this.publishContract(contract));

      actualTransactionIds.map((id) => this.paymentQueue.addCashOutJob({ paymentTransactionId: id.value }));

      return Ok(true);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }

  private async publishContract(contract: ContractEntity) {
    const mapper = new ContractOrmMapper(ContractEntity);
    const ormContract = await mapper.toOrmEntity(contract);

    this.pubSubService.publish(PubSubTrigger.UPDATE_CONTRACT, {
      contract: ormContract,
      event: ContractPubSubEvent.UPDATED,
    });
  }
}
