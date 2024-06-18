import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateContractPaymentTransactionCommand } from './update-contract-payment-transaction.command';

@CommandHandler(UpdateContractPaymentTransactionCommand)
export class UpdateContractPaymentTransactionHandler
  implements ICommandHandler<UpdateContractPaymentTransactionCommand>
{
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly pubSubService: PubSubService,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  public async execute(command: UpdateContractPaymentTransactionCommand): Promise<void> {
    const { contractId, trxId: incommingTrxId } = command;

    const [trxId, isOwnTrx] = incommingTrxId ? [incommingTrxId, false] : [await this.unitOfWork.start(), true];

    try {
      const contract = await this.contractRepository.findOneById(contractId.value, trxId);

      if (!contract) {
        throw new NotFoundException('Contract not found');
      }

      const paymentTransaction = await this.paymentTransactionRepository.findNextCashIn(contractId.value, trxId);

      contract.setNextPaymentTransactionId(paymentTransaction?.id);

      await this.contractRepository.save(contract, trxId);

      if (isOwnTrx) {
        await this.unitOfWork.execute(trxId);
      }

      this.publishContract(contract);
    } catch (error) {
      if (isOwnTrx) {
        await this.unitOfWork.rollback(trxId);
      }

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
