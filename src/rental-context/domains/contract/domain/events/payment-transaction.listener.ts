import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { CancelConcludedContractCommand } from '@domains/contract/commands/cancel-concluded-contract/cancel-concluded-contract.command';
import { CashInFailedEvent } from '@domains/payment-transaction/domain/events/events';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';

import { CancellationTrigger } from '../types';

@Injectable()
export class PaymentTransactionListener {
  constructor(private readonly contractRepository: ContractRepository, private commandBus: CommandBus) {}

  @OnEvent(CashInFailedEvent.eventName)
  async cashInFailed(payload: CashInFailedEvent) {
    const { paymentTransaction } = payload;
    const contract = await this.contractRepository.findOneById(paymentTransaction.contractId.value);
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    // orchestration of possible cases

    // case 1.
    // if second pay in partial payment type failed ContractEntity.PARTIAL_PAYMENT_DAYS_BEFORE_CANCEL (now it is 7 days) days after withdrawal date
    // Docs - https://docs.google.com/document/d/1_qsdtXTg-jC_sTWHWHDjyX0GatbHj7UUAKNTN6K1fJQ/edit#heading=h.haw7youropr0
    if (contract.isPartialPaymentNeedToCancel(paymentTransaction.withdrawFundsDate)) {
      this.commandBus.execute<CancelConcludedContractCommand>(
        new CancelConcludedContractCommand({ contractId: contract.id, trigger: CancellationTrigger.TENANT }),
      );
    }
  }
}
