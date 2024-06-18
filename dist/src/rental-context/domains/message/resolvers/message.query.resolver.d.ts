import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { MessagePaginationResponse } from '../dtos/message-pagination.response.dto';
import { ChatMessagesRequest } from '../queries/chat-messages/chat-messages.request.dto';
import { ChatMessagesService } from '../queries/chat-messages/chat-messages.service';
export declare class MessageQueryGraphqlResolver {
    private readonly chatMessagesService;
    constructor(chatMessagesService: ChatMessagesService);
    getChatMessages(iam: UserOrmEntity, input: ChatMessagesRequest): Promise<MessagePaginationResponse>;
}
