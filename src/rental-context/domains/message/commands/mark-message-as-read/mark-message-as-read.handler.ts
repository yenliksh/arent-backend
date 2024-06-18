import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { MessageRepository } from '@domain-repositories/message/message.repository';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { MarkMessageAsReadCommand } from './mark-message-as-read.command';

@CommandHandler(MarkMessageAsReadCommand)
export class MarkMessageAsReadHandler implements ICommandHandler<MarkMessageAsReadCommand> {
  constructor(private readonly chatRepository: ChatRepository, private readonly messageRepository: MessageRepository) {}

  public async execute(command: MarkMessageAsReadCommand): Promise<Result<boolean, HttpException>> {
    const { userId, messageId: incomingMessageId } = command;

    const chat = await this.chatRepository.findOneByMessageAndMemberId(incomingMessageId.value, userId.value);

    if (!chat) {
      return Err(new NotFoundException('Message not found'));
    }

    const lastReadMessageId = chat.getLastReadMessageId(userId);
    const newestMessage = lastReadMessageId
      ? await this.messageRepository.findLastOfArray([incomingMessageId.value, lastReadMessageId.value])
      : undefined;

    const messageId = newestMessage ? newestMessage.id : incomingMessageId;

    chat.setLastReadMessageId(messageId, userId);

    await this.chatRepository.save(chat);

    return Ok(true);
  }
}
