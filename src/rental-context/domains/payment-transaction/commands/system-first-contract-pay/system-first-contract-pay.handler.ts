import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { ReverseInnopayTransactionCommand } from '@domains/innopay-transaction/commands/reverse-innopay-transaction/reverse-innopay-transaction.command';
import { CardMeta, PaymentInvoiceType } from '@domains/payment-transaction/domain/types';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { BadGatewayException, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Err, Ok, Result } from 'oxide.ts';

import { SystemFirstContractPayCommand } from './system-first-contract-pay.command';

@CommandHandler(SystemFirstContractPayCommand)
export class SystemFirstContractPayHandler implements ICommandHandler<SystemFirstContractPayCommand> {
  constructor(
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly innopayCashInService: InnopayCashInService,
    private readonly unitOfWork: UnitOfWork,
    private commandBus: CommandBus,
  ) {}

  public async execute(
    command: SystemFirstContractPayCommand,
  ): Promise<Result<{ id: UUID; customerReference: string }, Error | InnopayServiceBadRequestProblem>> {
    const { contractId } = command;

    const trxId = await this.unitOfWork.start();

    try {
      const paymentTransaction = await this.paymentTransactionRepository.findContractFirstPayment(
        contractId.value,
        trxId,
      );

      if (!paymentTransaction) {
        return Err(new NotFoundException('Payment transaction not found'));
      }

      if (!paymentTransaction.isReadyToFirstContractPay()) {
        return Err(new ArgumentInvalidException('Payment is not ready to first contract pay now'));
      }

      let payResult: boolean | undefined;
      let customerReference: string | undefined;
      let cardMeta: CardMeta | undefined;
      try {
        const card = paymentTransaction.senderCardOrFail;

        cardMeta = card.cardMeta;

        const result = await this.innopayCashInService.paySavedCard({
          amount: paymentTransaction.totalAmountPayable,
          cardId: card.cnpCardId,
          userLogin: card.userId.value,
          userId: card.cnpUserId,
          paymentTarget: paymentTransaction.contractId.value,
        });

        if (!result.payResult) {
          await this.commandBus.execute<ReverseInnopayTransactionCommand>(
            new ReverseInnopayTransactionCommand(result.customerReference),
          );

          throw new BadGatewayException('Something went wrong');
        }

        payResult = result.payResult;
        customerReference = result.customerReference.toString();
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

      return Ok({ id: paymentTransaction.id, customerReference });
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }
}
