import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class UpdateLastMessageCommand {
    readonly chatId: UUID;
    readonly trxId?: string | undefined;
    constructor(chatId: UUID, trxId?: string | undefined);
}
