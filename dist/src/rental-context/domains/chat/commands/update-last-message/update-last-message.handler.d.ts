import { ICommandHandler } from '@nestjs/cqrs';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';
import { UpdateLastMessageCommand } from './update-last-message.command';
export declare class UpdateLastMessageHandler implements ICommandHandler<UpdateLastMessageCommand> {
    private readonly messageRepository;
    private readonly chatRepository;
    constructor(messageRepository: MessageRepository, chatRepository: ChatRepository);
    execute(command: UpdateLastMessageCommand): Promise<void>;
}
