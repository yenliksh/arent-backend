import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { UpdateLastMessageCommand } from '@domains/chat/commands/update-last-message/update-last-message.command';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { RejectTrigger } from '@domains/contract/bulls/types';
import { MessageType } from '@domains/message/domain/types';
import { ChatIsNotActiveProblem } from '@domains/message/problems/chat-is-not-active.problem';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ContractStatus } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { NewMessageEvent } from '@modules/notifications/services/new-message/new-message.event';
import { ConflictException, ForbiddenException, HttpException, UnprocessableEntityException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TransactionId } from 'aws-sdk/clients/qldbsession';
import { Err, Ok, Result } from 'oxide.ts';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageOrmMapper } from 'src/rental-context/domain-repositories/message/message.orm-mapper';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';
import { ChatMemberEntity } from 'src/rental-context/domains/chat/domain/entities/chat-member.entity';
import { MessageEntity } from 'src/rental-context/domains/message/domain/entities/message.entity';

import { SendMessageCommand } from './send-message.command';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
    private readonly contractRepository: ContractRepository,
    private readonly pubSubService: PubSubService,
    private readonly contractOfferQueue: ContractOfferQueue,
    private commandBus: CommandBus,
    private readonly unitOfWork: UnitOfWork,
    private eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    command: SendMessageCommand,
  ): Promise<Result<UUID, ChatIsNotActiveProblem | ArgumentInvalidException | HttpException>> {
    const { chatId, senderId, type, id, media, system, text } = command.props;

    const trxId = await this.unitOfWork.start();

    try {
      if (id) {
        const foundMessage = await this.messageRepository.findOneById(id.value, trxId);
        if (foundMessage) {
          await this.unitOfWork.rollback(trxId);
          return Err(new ConflictException('Message with this id already exist'));
        }
      }

      const chat = await this.chatRepository.findByIdAndMemberId(chatId.value, senderId.value, trxId);

      if (!chat) {
        await this.unitOfWork.rollback(trxId);
        return Err(new ForbiddenException());
      }
      if (!chat.isActive) {
        await this.unitOfWork.rollback(trxId);
        return Err(new ChatIsNotActiveProblem());
      }
      if (!chat.members?.length) {
        await this.unitOfWork.rollback(trxId);
        return Err(new ArgumentInvalidException('Chat member required'));
      }

      const finishRejectFunc = await this.rejectContractOfferIfExist(chatId, senderId, trxId);

      const message = MessageEntity.create({ chatId: chat.id, senderId, type, id, media, system, text });

      await this.messageRepository.save(message, trxId);

      chat.setLastReadMessageId(message.id, senderId);

      await this.chatRepository.save(chat, trxId);

      try {
        await this.commandBus.execute<UpdateLastMessageCommand>(new UpdateLastMessageCommand(chat.id, trxId));
      } catch (error) {
        await this.unitOfWork.rollback(trxId);
        return Err(new UnprocessableEntityException());
      }

      await this.unitOfWork.execute(trxId);

      finishRejectFunc();

      this.publishMessage(message, chat.members);

      if ([MessageType.MEDIA, MessageType.TEXT].includes(type)) {
        this.eventEmitter.emit(
          NewMessageEvent.eventName,
          NewMessageEvent.create({
            senderId,
            chatMembers: chat.members,
            chatId: chat.id,
          }),
        );
      }

      return Ok(message.id);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }

  private async rejectContractOfferIfExist(chatId: UUID, userId: UUID, trxId?: TransactionId): Promise<() => void> {
    const contract = await this.contractRepository.findOneByMemberAndChatId(chatId.value, userId.value, trxId);

    if (contract?.status.value !== ContractStatus.OFFERING) {
      return () => undefined; // return void function, by logic function not needed here, but required for ts typing
    }

    contract.setPending();

    await this.contractRepository.save(contract, trxId);

    return () =>
      this.contractOfferQueue.addRejectJob({
        chatId: chatId.value,
        userId: userId.value,
        rejectTrigger: RejectTrigger.SYSTEM,
      });
  }

  private async publishMessage(message: MessageEntity, members: ChatMemberEntity[]) {
    const mapper = new MessageOrmMapper(MessageEntity);
    const ormMessage = await mapper.toOrmEntity(message);

    await this.pubSubService.publish(PubSubTrigger.NEW_MESSAGE, {
      message: ormMessage,
      chatMembers: members
        .map((member) => ({ [member.memberId.value]: member.role }))
        .reduce((acc, curr) => Object.assign({}, acc, curr)),
    });
  }
}
