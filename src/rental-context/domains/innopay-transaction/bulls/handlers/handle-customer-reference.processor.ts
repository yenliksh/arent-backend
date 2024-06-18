import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ModifyContractToPermanentCommand } from '@domains/contract/commands/modify-contract-to-permanent/modify-contract-to-permanent.command';
import { RevokeTemporaryContractCommand } from '@domains/contract/commands/revoke-temporary-contract/revoke-temporary-contract.command';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { sleep } from '@libs/utils/sleep';
import { Process, Processor } from '@nestjs/bull';
import { BadRequestException, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as Sentry from '@sentry/node';
import {
  InnopayStatusService,
  InnopayTransactionState,
} from '@third-parties/innopay-payment/src/services/innopay-status.service';
import { Job } from 'bull';

import { StuckedInnopayGuidStatusProducer } from '../sqs-producers/stucked-innopay-guid-status.producer';
import { HandleCustomerReferenceJobPayload, InnopayBulls, InnopayTransactionProcess } from '../types';

@Processor(InnopayBulls.INNOPAY_TRANSACTION)
export class HandleCustomerReferenceProcessor {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly sqsProducer: StuckedInnopayGuidStatusProducer,
    private readonly innopayStatusService: InnopayStatusService,
    private commandBus: CommandBus,
  ) {}

  private readonly innopayStateMapper: {
    [P in InnopayTransactionState]: (props: {
      contractId: UUID;
      customerReference: string;
      iteration: number;
      cardInfo?: {
        cnpCardId: number;
        cnpUserId: number;
      };
    }) => Promise<void>;
  } = {
    [InnopayTransactionState.SUCCESS]: ({ contractId, customerReference }) =>
      this.handleSuccessState(contractId, customerReference),
    [InnopayTransactionState.READY_TO_COMPLETE]: ({ contractId, cardInfo }) =>
      this.handleReadyToCompleteState(contractId, cardInfo),
    [InnopayTransactionState.IN_PROGRESS]: ({ customerReference, iteration }) =>
      this.handleInProgressState(customerReference, iteration),
    [InnopayTransactionState.FAILED]: ({ contractId, customerReference }) =>
      this.handleFailedState(contractId, customerReference),
  };

  @Process(InnopayTransactionProcess.HANDLE_CUSTOMER_REFERENCE)
  async handle(job: Job<HandleCustomerReferenceJobPayload>) {
    const { customerReference, iteration = 0 } = job.data;

    try {
      const [contract, innopayTransactionInfo] = await Promise.all([
        this.contractRepository.findByCustomerReference(customerReference),
        this.innopayStatusService.getCashInTransactionInfo(customerReference),
      ]);

      if (!contract) {
        return; // this transaction has already been processed
      }

      const { transactionState, cardInfo } = innopayTransactionInfo;

      await this.innopayStateMapper[transactionState]({
        contractId: contract.id,
        customerReference,
        iteration,
        cardInfo: cardInfo
          ? {
              cnpCardId: Number(cardInfo.cardId),
              cnpUserId: Number(cardInfo.userId),
            }
          : undefined,
      });
    } catch (error) {
      Logger.error(error);
      Sentry.captureException(`Customer reference with id: ${customerReference} failed`);

      return;
    }

    await sleep(1000);
  }

  private async handleSuccessState(contractId: UUID, customerReference: string) {
    throw new BadRequestException(
      `Customer reference = '${customerReference}' for contract id='${contractId.value}' already completed`,
    );
  }

  private async handleReadyToCompleteState(contractId: UUID, card?: { cnpCardId: number; cnpUserId: number }) {
    if (!card) {
      throw new ArgumentInvalidException('Card info not found');
    }

    const { cnpCardId, cnpUserId } = card;

    await this.commandBus.execute<ModifyContractToPermanentCommand>(
      new ModifyContractToPermanentCommand(contractId, {
        cnpCardId,
        cnpUserId,
      }),
    );
  }

  private async handleInProgressState(customerReference: string, iteration: number) {
    this.sqsProducer.send({
      customerReference,
      iteration,
    });
  }

  private async handleFailedState(contractId: UUID, customerReference: string) {
    Sentry.captureException(`Customer reference with id: ${customerReference} failed`);
    Logger.log(`Customer reference with id: ${customerReference} failed`);

    this.commandBus.execute<RevokeTemporaryContractCommand>(new RevokeTemporaryContractCommand(contractId));
  }
}
