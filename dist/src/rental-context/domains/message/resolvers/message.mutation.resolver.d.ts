import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { CommandBus } from '@nestjs/cqrs';
import { MarkMessageAsReadRequest } from '../commands/mark-message-as-read/mark-message-as-read.request.dto';
import { SendMessageRequest } from '../commands/send-message/send-message.request.dto';
import { MessageResponse } from '../dtos/message.response.dto';
import { FindMessageService } from '../queries/find-message/find-message.service';
export declare class MessageMutationGraphqlResolver {
    private commandBus;
    private readonly findByIdService;
    constructor(commandBus: CommandBus, findByIdService: FindMessageService);
    sendMessage(iam: UserOrmEntity, input: SendMessageRequest): Promise<MessageResponse>;
    markAsRead(iam: UserOrmEntity, input: MarkMessageAsReadRequest): Promise<boolean>;
}
