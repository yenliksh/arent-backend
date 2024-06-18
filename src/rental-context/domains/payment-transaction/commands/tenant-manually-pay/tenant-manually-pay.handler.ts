import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentQueue } from '@domains/payment-transaction/bulls/queue/payment.queue';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { TenantManuallyPayCommand } from './tenant-manually-pay.command';

@CommandHandler(TenantManuallyPayCommand)
export class TenantManuallyPayHandler implements ICommandHandler<TenantManuallyPayCommand> {
  constructor(
    private readonly paymentQueue: PaymentQueue,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly contractRepository: ContractRepository,
    private readonly pubSubService: PubSubService,
  ) {}

  public async execute(
    command: TenantManuallyPayCommand,
  ): Promise<Result<UUID, HttpException | ArgumentInvalidException>> {
    const { paymentTransactionId, userId } = command;

    const [paymentTransaction, contract] = await Promise.all([
      this.paymentTransactionRepository.findOneById(paymentTransactionId.value),
      this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId.value),
    ]);

    if (!paymentTransaction) {
      return Err(new NotFoundException('Payment transaction not found'));
    }
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    if (!paymentTransaction.isReadyToSelfPayNow(userId)) {
      return Err(new ArgumentInvalidException('Payment is not ready to manually pay now'));
    }

    contract.setPending();
    await this.contractRepository.save(contract);

    this.publishContract(contract);

    this.paymentQueue.addCashInJob({ paymentTransactionId: paymentTransactionId.value });

    return Ok(paymentTransaction.id);
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
