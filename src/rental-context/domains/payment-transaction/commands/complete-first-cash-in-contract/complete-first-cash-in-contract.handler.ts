import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { CardMeta, PaymentInvoiceType } from '@domains/payment-transaction/domain/types';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Err, Ok, Result } from 'oxide.ts';

import { CompleteFirstCashInContractCommand } from './complete-first-cash-in-contract.command';

@CommandHandler(CompleteFirstCashInContractCommand)
export class CompleteFirstCashInContractHandler implements ICommandHandler<CompleteFirstCashInContractCommand> {
  constructor(
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly innopayCashInService: InnopayCashInService,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  public async execute(
    command: CompleteFirstCashInContractCommand,
  ): Promise<Result<UUID, Error | InnopayServiceBadRequestProblem>> {
    const { contractId, customerReference } = command;

    const trxId = await this.unitOfWork.start();

    try {
      const paymentTransaction = await this.paymentTransactionRepository.findContractFirstPayment(
        contractId.value,
        trxId,
      );

      if (!paymentTransaction) {
        throw new NotFoundException('Payment transaction not found');
      }

      if (!paymentTransaction.isReadyToFirstContractPay()) {
        throw new ArgumentInvalidException('Payment is not ready to first contract pay now');
      }

      let payResult: boolean | undefined;
      let cardMeta: CardMeta | undefined;
      try {
        const card = paymentTransaction.senderCardOrFail;

        cardMeta = card.cardMeta;

        payResult = await this.innopayCashInService.endCashInFromNewCard({
          customerReference,
          transactionSuccess: true,
        });
      } catch (error) {
        await this.unitOfWork.rollback(trxId);
        const message = (error as Error).message;
        return Err(new InnopayServiceBadRequestProblem(message));
      }

      if (payResult) {
        paymentTransaction.cashInSuccess(cardMeta, { customerReference });
      } else {
        paymentTransaction.failure(PaymentInvoiceType.WITHDRAW, cardMeta, { customerReference });
      }

      await this.paymentTransactionRepository.save(paymentTransaction, trxId);

      await this.unitOfWork.execute(trxId);

      return Ok(paymentTransaction.id);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      return Err(error as Error);
    }
  }
}
