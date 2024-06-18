import { MessageType } from 'src/rental-context/domains/message/domain/types';
export declare class SendMessageRequest {
    readonly id: string;
    readonly chatId: string;
    readonly type: MessageType;
    readonly text?: string;
    readonly mediaUrl?: string;
    readonly mediaName?: string;
    readonly mediaWeight?: number;
}
