import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';
import { MessageEntity } from 'src/rental-context/domains/message/domain/entities/message.entity';
import { PushSystemMessageCommand } from './push-system-message.command';
export declare class PushSystemMessageHandler implements ICommandHandler<PushSystemMessageCommand> {
    private readonly messageRepository;
    private readonly chatRepository;
    private readonly unitOfWork;
    constructor(messageRepository: MessageRepository, chatRepository: ChatRepository, unitOfWork: UnitOfWork);
    execute(command: PushSystemMessageCommand): Promise<Result<MessageEntity, NotFoundException>>;
}
