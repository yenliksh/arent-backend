import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { MessageRepository } from '@domain-repositories/message/message.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateContractAfterRequestCommand } from './create-contract-after-request.command';
export declare class CreateContractAfterRequestHandler implements ICommandHandler<CreateContractAfterRequestCommand> {
    private readonly contractRepository;
    private readonly chatRepository;
    private readonly messageRepository;
    private readonly apartmentAdRepository;
    private readonly userRepository;
    private readonly pubSubService;
    private commandBus;
    constructor(contractRepository: ContractRepository, chatRepository: ChatRepository, messageRepository: MessageRepository, apartmentAdRepository: ApartmentAdRepository, userRepository: UserRepository, pubSubService: PubSubService, commandBus: CommandBus);
    execute(command: CreateContractAfterRequestCommand): Promise<[contractId: UUID, chatId: UUID]>;
    private createContract;
    private createChat;
    private sendSystemMessage;
    private publishMessage;
}
