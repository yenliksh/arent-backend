import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PushSystemMessageCommand } from '@domains/message/commands/push-system-message/push-system-message.command';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { SystemMessageType } from '@domains/message/domain/types';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { Process, Processor } from '@nestjs/bull';
import { NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Job } from 'bull';
import { Result } from 'oxide.ts';

import { ContractOfferPubSubService } from '../services/contract-offer-pub-sub.service';
import {
  ContractBulls,
  ContractExceptions,
  ContractOfferProcess,
  RejectContractOfferJobPayload,
  RejectTrigger,
} from '../types';

@Processor(ContractBulls.CONTRACT_OFFER_QUEUE)
export class RejectContractOfferProcessor {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly chatRepository: ChatRepository,
    private readonly contractOfferPubSubService: ContractOfferPubSubService,
    private readonly unitOfWork: UnitOfWork,
    private commandBus: CommandBus,
  ) {}

  @Process(ContractOfferProcess.REJECT)
  async handle(job: Job<RejectContractOfferJobPayload>) {
    const { chatId, userId, rejectTrigger } = job.data;

    const trxId = await this.unitOfWork.start();

    try {
      const contract = await this.contractRepository.findOneByMemberAndChatId(chatId, userId, trxId);

      if (!contract) {
        throw new NotFoundException(ContractExceptions.CONTRACT_NOT_FOUND);
      }
      if (!contract.isPending) {
        throw new ArgumentInvalidException(ContractExceptions.CONTRACT_NOT_PENDING);
      }

      contract.rejectOffer();

      contract.endPending();

      await this.contractRepository.save(contract, trxId);

      const chat = await this.findChatByContract(contract.id.value, userId, trxId);

      const systemMessageTypeMapper = {
        [RejectTrigger.SYSTEM]: SystemMessageType.OFFER_REJECTED_BY_SYSTEM,
        [RejectTrigger.USER]: SystemMessageType.OFFER_REJECTED,
      };

      const message = await this.commandBus.execute<PushSystemMessageCommand, Result<MessageEntity, Error>>(
        new PushSystemMessageCommand(
          {
            chatId: chat.id,
            senderId: new UUID(userId),
            content: { type: systemMessageTypeMapper[rejectTrigger], contractData: contract.systemMessageData },
          },
          trxId,
        ),
      );

      if (message.isErr()) {
        throw message.unwrapErr();
      }

      await this.unitOfWork.execute(trxId);

      // TODO: change to event
      return Promise.all([
        this.contractOfferPubSubService.publishMessage(message.unwrap(), chat),
        this.contractOfferPubSubService.publishContract(contract, ContractPubSubEvent.UPDATED),
      ]);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);

      const contract = await this.contractRepository.findOneByMemberAndChatId(chatId, userId);

      if (!contract) {
        throw new NotFoundException(ContractExceptions.CONTRACT_NOT_FOUND);
      }

      contract.endPending();

      await this.contractRepository.save(contract);

      await this.contractOfferPubSubService.publishContract(
        contract,
        ContractPubSubEvent.UPDATED,
        (error as Error).message as ContractExceptions,
      );

      throw error;
    }
  }

  private async findChatByContract(contractId: string, userId: string, trxId?: TransactionId) {
    const chat = await this.chatRepository.findByContractIdAndMemberId(contractId, userId, trxId);

    if (!chat) {
      throw new NotFoundException(ContractExceptions.CHAT_NOT_FOUND);
    }
    if (!chat.members?.length) {
      throw new ArgumentInvalidException(ContractExceptions.CHAT_MEMBER_REQUIRED);
    }

    return chat;
  }
}
