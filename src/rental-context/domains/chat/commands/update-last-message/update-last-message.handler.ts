import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';

import { UpdateLastMessageCommand } from './update-last-message.command';

@CommandHandler(UpdateLastMessageCommand)
export class UpdateLastMessageHandler implements ICommandHandler<UpdateLastMessageCommand> {
  constructor(private readonly messageRepository: MessageRepository, private readonly chatRepository: ChatRepository) {}

  public async execute(command: UpdateLastMessageCommand) {
    const { chatId, trxId } = command;

    const chat = await this.chatRepository.findOneById(chatId.value, trxId);

    if (!chat) {
      throw new NotFoundException();
    }

    const lastMessage = await this.messageRepository.findLastForChat(chatId.value, trxId);

    chat.setLastMessageId(lastMessage?.id);

    await this.chatRepository.save(chat, trxId);
  }
}
