import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { Ok } from 'oxide.ts';
import { MyChatsRequest } from './my-chats.request.dto';
export declare class MyChatsService {
    handle(userId: string, input: MyChatsRequest): Promise<Ok<PaginationResult<ChatOrmEntity>>>;
}
