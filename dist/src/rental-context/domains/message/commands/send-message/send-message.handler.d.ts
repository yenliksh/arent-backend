import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { ChatIsNotActiveProblem } from '@domains/message/problems/chat-is-not-active.problem';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { HttpException } from '@nestjs/common';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';
import { SendMessageCommand } from './send-message.command';
export declare class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
    private readonly messageRepository;
    private readonly chatRepository;
    private readonly contractRepository;
    private readonly pubSubService;
    private readonly contractOfferQueue;
    private commandBus;
    private readonly unitOfWork;
    private eventEmitter;
    constructor(messageRepository: MessageRepository, chatRepository: ChatRepository, contractRepository: ContractRepository, pubSubService: PubSubService, contractOfferQueue: ContractOfferQueue, commandBus: CommandBus, unitOfWork: UnitOfWork, eventEmitter: EventEmitter2);
    execute(command: SendMessageCommand): Promise<Result<UUID, ChatIsNotActiveProblem | ArgumentInvalidException | HttpException>>;
    private rejectContractOfferIfExist;
    private publishMessage;
}
