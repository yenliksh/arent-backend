import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { MessageRepository } from '@domain-repositories/message/message.repository';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { MarkMessageAsReadCommand } from './mark-message-as-read.command';
export declare class MarkMessageAsReadHandler implements ICommandHandler<MarkMessageAsReadCommand> {
    private readonly chatRepository;
    private readonly messageRepository;
    constructor(chatRepository: ChatRepository, messageRepository: MessageRepository);
    execute(command: MarkMessageAsReadCommand): Promise<Result<boolean, HttpException>>;
}
