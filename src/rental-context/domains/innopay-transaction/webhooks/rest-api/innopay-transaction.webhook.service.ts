import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ModifyContractToPermanentCommand } from '@domains/contract/commands/modify-contract-to-permanent/modify-contract-to-permanent.command';
import { RevokeTemporaryContractCommand } from '@domains/contract/commands/revoke-temporary-contract/revoke-temporary-contract.command';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as Sentry from '@sentry/node';
import {
  InnopayStatusService,
  InnopayTransactionState,
} from '@third-parties/innopay-payment/src/services/innopay-status.service';
import { Err, Ok, Result } from 'oxide.ts';

import { StuckedInnopayGuidStatusProducer } from '../../bulls/sqs-producers/stucked-innopay-guid-status.producer';

export interface InnopayTransactionRestApiWebhookRequest {
  readonly customerReference: string;
  readonly cardId: number;
  readonly userId: number;
}

@Injectable()
export class InnopayTransactionRestApiWebhookService {
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
      cnpCardId: number;
      cnpUserId: number;
    }) => Promise<void>;
  } = {
    [InnopayTransactionState.SUCCESS]: ({ contractId, customerReference }) =>
      this.handleSuccessState(contractId, customerReference),
    [InnopayTransactionState.READY_TO_COMPLETE]: ({ contractId, cnpCardId, cnpUserId }) =>
      this.handleReadyToCompleteState(contractId, { cnpCardId, cnpUserId }),
    [InnopayTransactionState.IN_PROGRESS]: ({ customerReference, iteration }) =>
      this.handleInProgressState(customerReference, iteration),
    [InnopayTransactionState.FAILED]: ({ contractId, customerReference }) =>
      this.handleFailedState(contractId, customerReference),
  };

  private readonly responseByState: { [P in InnopayTransactionState]: Result<boolean, BadGatewayException> } = {
    [InnopayTransactionState.SUCCESS]: Err(new BadGatewayException('Transaction already complete')),
    [InnopayTransactionState.READY_TO_COMPLETE]: Ok(true),
    [InnopayTransactionState.IN_PROGRESS]: Ok(false),
    [InnopayTransactionState.FAILED]: Err(new BadGatewayException('Something went wrong')),
  };

  async handle(
    dto: InnopayTransactionRestApiWebhookRequest,
  ): Promise<Result<boolean, ArgumentInvalidException | BadGatewayException>> {
    const { cardId, customerReference, userId } = dto;

    try {
      const [contract, innopayTransactionInfo] = await Promise.all([
        this.contractRepository.findByCustomerReference(customerReference),
        this.innopayStatusService.getCashInTransactionInfo(customerReference),
      ]);

      if (!contract) {
        throw new BadGatewayException(`Contract with customerReference=${customerReference} not found`);
      }

      const { transactionState } = innopayTransactionInfo;

      await this.innopayStateMapper[transactionState]({
        contractId: contract.id,
        customerReference,
        iteration: 0,
        cnpCardId: cardId,
        cnpUserId: userId,
      });

      return this.responseByState[transactionState];
    } catch (error) {
      Logger.error(error);
      Sentry.captureException(error);

      return Err(new BadGatewayException('Something went wrong'));
    }
  }

  private async handleSuccessState(contractId: UUID, customerReference: string) {
    throw new BadRequestException(
      `Customer reference = '${customerReference}' for contract id='${contractId.value}' already completed`,
    );
  }

  private async handleReadyToCompleteState(contractId: UUID, card: { cnpCardId: number; cnpUserId: number }) {
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
