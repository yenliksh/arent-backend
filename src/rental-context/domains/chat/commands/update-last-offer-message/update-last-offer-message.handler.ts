import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';

import { UpdateLastOfferMessageCommand } from './update-last-offer-message.command';

@CommandHandler(UpdateLastOfferMessageCommand)
export class UpdateLastOfferMessageHandler implements ICommandHandler<UpdateLastOfferMessageCommand> {
  constructor(private readonly messageRepository: MessageRepository, private readonly chatRepository: ChatRepository) {}

  public async execute(command: UpdateLastOfferMessageCommand) {
    const { chatId, trxId } = command;

    const chat = await this.chatRepository.findOneById(chatId.value, trxId);

    if (!chat) {
      throw new NotFoundException();
    }

    const lastOfferMessage = await this.messageRepository.findLastOfferForChat(chatId.value, trxId);

    chat.setLastOfferMessageId(lastOfferMessage?.id);

    await this.chatRepository.save(chat, trxId);
  }
}
