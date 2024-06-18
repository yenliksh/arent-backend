import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { ChatModel } from '../models/chat.model';
declare const ChatPaginationResponse_base: import("@nestjs/common").Type<import("@infrastructure/dto/base-cursor-pagination.response").IBaseCursorPaginationResponse<ChatModel>>;
export declare class ChatPaginationResponse extends ChatPaginationResponse_base {
    isChatsExist: boolean;
    static create(props: PaginationResult<ChatOrmEntity>, isChatsExist: boolean): ChatPaginationResponse;
}
export {};
