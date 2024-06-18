import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ChatPaginationResponse } from '../dtos/chat-pagination.response';
import { ChatModel } from '../models/chat.model';
import { FindChatRequest } from '../queries/find-chat/find-chat.request';
import { FindChatService } from '../queries/find-chat/find-chat.service';
import { IsChatsExistService } from '../queries/is-chats-exist/is-chats-exist.service';
import { MyChatsRequest } from '../queries/my-chats/my-chats.request.dto';
import { MyChatsService } from '../queries/my-chats/my-chats.service';
export declare class ChatQueryGraphqlResolver {
    private readonly myChatsService;
    private readonly findChatService;
    private readonly isChatsExistService;
    constructor(myChatsService: MyChatsService, findChatService: FindChatService, isChatsExistService: IsChatsExistService);
    myChats(iam: UserOrmEntity, input: MyChatsRequest): Promise<ChatPaginationResponse>;
    chatById(iam: UserOrmEntity, input: FindChatRequest): Promise<ChatModel>;
}
