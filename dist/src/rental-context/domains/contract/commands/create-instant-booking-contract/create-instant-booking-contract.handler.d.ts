import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { MessageRepository } from '@domain-repositories/message/message.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateInstantContractCommand } from './create-instant-booking-contract.command';
export declare class CreateInstantContractHandler implements ICommandHandler<CreateInstantContractCommand> {
    private readonly contractRepository;
    private readonly chatRepository;
    private readonly messageRepository;
    private readonly apartmentAdRepository;
    private readonly innopayCardRepository;
    private readonly userRepository;
    private readonly pubSubService;
    private commandBus;
    constructor(contractRepository: ContractRepository, chatRepository: ChatRepository, messageRepository: MessageRepository, apartmentAdRepository: ApartmentAdRepository, innopayCardRepository: InnopayCardRepository, userRepository: UserRepository, pubSubService: PubSubService, commandBus: CommandBus);
    execute(command: CreateInstantContractCommand): Promise<[contractId: UUID, chatId: UUID]>;
    private checkCardExist;
    private createContract;
    private createChat;
    private sendSystemMessage;
    private publishMessage;
}
