import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRequestRepository } from '@domain-repositories/contract-request/contract-request.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { MessageRepository } from '@domain-repositories/message/message.repository';
import { TemporaryPaymentTransactionRepository } from '@domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { RevokeTemporaryContractCommand } from './revoke-temporary-contract.command';
export declare class RevokeTemporaryContractHandler implements ICommandHandler<RevokeTemporaryContractCommand> {
    private readonly contractRepository;
    private readonly contractRequestRepository;
    private readonly messageRepository;
    private readonly chatRepository;
    private readonly temporaryPaymentTransactionRepository;
    private readonly userRepository;
    private readonly pubSubService;
    private readonly unitOfWork;
    private commandBus;
    constructor(contractRepository: ContractRepository, contractRequestRepository: ContractRequestRepository, messageRepository: MessageRepository, chatRepository: ChatRepository, temporaryPaymentTransactionRepository: TemporaryPaymentTransactionRepository, userRepository: UserRepository, pubSubService: PubSubService, unitOfWork: UnitOfWork, commandBus: CommandBus);
    execute(command: RevokeTemporaryContractCommand): Promise<void>;
    private revokeInstantBookingContract;
    private revokeChatBookingContract;
    private sendSystemMessage;
    private publishContract;
}
