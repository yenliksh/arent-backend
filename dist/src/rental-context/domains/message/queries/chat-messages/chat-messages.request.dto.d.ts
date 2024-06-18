import { BaseBeforeCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
export declare class ChatMessagesRequest extends BaseBeforeCursorPaginateRequest {
    readonly chatId: string;
}
