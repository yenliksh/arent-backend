import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { Ok } from 'oxide.ts';
import { ChatMessagesRequest } from './chat-messages.request.dto';
export declare class ChatMessagesService {
    handle(dto: ChatMessagesRequest, userId: UserOrmEntity['id']): Promise<Ok<PaginationResult<MessageOrmEntity>>>;
}
