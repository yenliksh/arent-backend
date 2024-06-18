import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { MessageType, SystemMessageType } from '@domains/message/domain/types';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';
import { MessageEntity } from 'src/rental-context/domains/message/domain/entities/message.entity';

import { PushSystemMessageCommand } from './push-system-message.command';

@CommandHandler(PushSystemMessageCommand)
export class PushSystemMessageHandler implements ICommandHandler<PushSystemMessageCommand> {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  public async execute(command: PushSystemMessageCommand): Promise<Result<MessageEntity, NotFoundException>> {
    const { trxId: incomingTrxId } = command;
    const { chatId, senderId, content } = command.messageProps;

    const message = MessageEntity.create({
      chatId,
      senderId,
      type: MessageType.SYSTEM,
      system: content,
    });

    const [trxId, isOwnTrx] = incomingTrxId ? [incomingTrxId, false] : [await this.unitOfWork.start(), true];

    try {
      const chat = await this.chatRepository.findOneById(chatId.value, trxId);

      if (!chat) {
        return Err(new NotFoundException('Chat not found'));
      }

      chat.setLastReadMessageId(message.id, senderId);
      chat.setLastMessageId(message.id);

      if (content.type === SystemMessageType.OFFER_SENDING) {
        chat.setLastOfferMessageId(message.id);
      }

      await this.messageRepository.save(message, trxId);
      await this.chatRepository.save(chat, trxId);

      if (isOwnTrx) {
        await this.unitOfWork.commit(trxId);
      }
    } catch (error) {
      if (isOwnTrx) {
        await this.unitOfWork.rollback(trxId);
      }
      throw error;
    }

    return Ok(message);
  }
}
