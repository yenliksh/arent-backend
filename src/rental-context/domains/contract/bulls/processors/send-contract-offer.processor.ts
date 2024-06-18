import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PushSystemMessageCommand } from '@domains/message/commands/push-system-message/push-system-message.command';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { SystemMessageType } from '@domains/message/domain/types';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ArgumentInvalidException } from '@libs/exceptions';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { Process, Processor } from '@nestjs/bull';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Job } from 'bull';
import { Ok } from 'oxide.ts';

import { ContractOfferPubSubService } from '../services/contract-offer-pub-sub.service';
import { ContractBulls, ContractExceptions, ContractOfferProcess, SendContractOfferJobPayload } from '../types';

@Processor(ContractBulls.CONTRACT_OFFER_QUEUE)
export class SendContractOfferProcessor {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly chatRepository: ChatRepository,
    private readonly contractOfferPubSubService: ContractOfferPubSubService,
    private readonly unitOfWork: UnitOfWork,
    private commandBus: CommandBus,
  ) {}

  @Process(ContractOfferProcess.SEND)
  async handle(job: Job<SendContractOfferJobPayload>) {
    const { chatId, landlordId, allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets } = job.data;

    const trxId = await this.unitOfWork.start();

    try {
      const contract = await this.contractRepository.findOneByLandlordAndChatId(chatId, landlordId, trxId);

      if (!contract) {
        throw new NotFoundException(ContractExceptions.CONTRACT_NOT_FOUND);
      }
      if (!contract.isPending) {
        throw new ArgumentInvalidException(ContractExceptions.CONTRACT_NOT_PENDING);
      }

      const apartmentAdId = contract.apartmentAdIdOrFail;

      const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
        apartmentAdId: apartmentAdId.value,
        apartmentRentPeriodType: contract.apartmentRentPeriodType,
        from: contract.arrivalDateOrFail,
        to: contract.departureDateOrFail,
        trxId,
      });

      if (!isApartmentFree) {
        throw new ConflictException(ContractExceptions.APARTMENT_IS_NOT_FREE);
      }

      contract.setOffer({
        allowedToHangingOut,
        allowedToSmoke,
        allowedWithChildren,
        allowedWithPets,
      });

      contract.endPending();

      await this.contractRepository.save(contract, trxId);

      const chat = await this.findChatByContract(contract.id.value, landlordId, trxId);

      const message = await this.commandBus.execute<PushSystemMessageCommand, Ok<MessageEntity>>(
        new PushSystemMessageCommand(
          {
            chatId: chat.id,
            senderId: contract.landlordIdOrFail,
            content: { type: SystemMessageType.OFFER_SENDING, contractData: contract.systemMessageData },
          },
          trxId,
        ),
      );

      await this.unitOfWork.execute(trxId);

      // TODO: change to event
      return Promise.all([
        this.contractOfferPubSubService.publishMessage(message.unwrap(), chat),
        this.contractOfferPubSubService.publishContract(contract, ContractPubSubEvent.UPDATED),
      ]);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);

      const contract = await this.contractRepository.findOneByLandlordAndChatId(chatId, landlordId);
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

  private async findChatByContract(contractId: string, landlordId: string, trxId?: TransactionId) {
    const chat = await this.chatRepository.findByContractIdAndMemberId(contractId, landlordId, trxId);

    if (!chat) {
      throw new NotFoundException(ContractExceptions.CHAT_NOT_FOUND);
    }
    if (!chat.members?.length) {
      throw new ArgumentInvalidException(ContractExceptions.CHAT_MEMBER_REQUIRED);
    }

    return chat;
  }
}
