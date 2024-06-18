import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class MarkMessageAsReadCommand {
    readonly messageId: UUID;
    readonly userId: UUID;
    constructor(messageId: UUID, userId: UUID);
}
