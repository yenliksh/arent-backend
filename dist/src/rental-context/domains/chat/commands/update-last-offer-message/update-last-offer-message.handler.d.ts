import { ICommandHandler } from '@nestjs/cqrs';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';
import { UpdateLastOfferMessageCommand } from './update-last-offer-message.command';
export declare class UpdateLastOfferMessageHandler implements ICommandHandler<UpdateLastOfferMessageCommand> {
    private readonly messageRepository;
    private readonly chatRepository;
    constructor(messageRepository: MessageRepository, chatRepository: ChatRepository);
    execute(command: UpdateLastOfferMessageCommand): Promise<void>;
}
