import { SystemMessageProps } from '@domains/message/domain/value-objects/system-message.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class PushSystemMessageCommand {
    readonly messageProps: {
        chatId: UUID;
        senderId: UUID;
        content: SystemMessageProps;
    };
    readonly trxId?: string | undefined;
    constructor(messageProps: {
        chatId: UUID;
        senderId: UUID;
        content: SystemMessageProps;
    }, trxId?: string | undefined);
}
