import { ContractRequestRepository } from '@domain-repositories/contract-request/contract-request.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';
import { CreateChatCommand } from './create-chat.command';
export declare class CreateChatHandler implements ICommandHandler<CreateChatCommand> {
    private readonly contractRepository;
    private readonly contractRequestRepository;
    private readonly messageRepository;
    private readonly chatRepository;
    constructor(contractRepository: ContractRepository, contractRequestRepository: ContractRequestRepository, messageRepository: MessageRepository, chatRepository: ChatRepository);
    execute(command: CreateChatCommand): Promise<Result<UUID, NotFoundException>>;
    private sendSystemMessage;
}
