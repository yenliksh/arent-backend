import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
import { UserChatRole } from 'src/rental-context/domains/chat/domain/types';
export declare class MyChatsRequest extends BaseAfterCursorPaginateRequest {
    readonly role: UserChatRole;
    readonly filter?: string;
}
