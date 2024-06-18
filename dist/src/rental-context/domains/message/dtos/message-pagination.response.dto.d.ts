import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { MessageModel } from '../models/message.model';
declare const MessagePaginationResponse_base: import("@nestjs/common").Type<import("@infrastructure/dto/base-cursor-pagination.response").IBaseCursorPaginationResponse<MessageModel>>;
export declare class MessagePaginationResponse extends MessagePaginationResponse_base {
    static create(props: PaginationResult<MessageOrmEntity>): MessagePaginationResponse;
}
export {};
