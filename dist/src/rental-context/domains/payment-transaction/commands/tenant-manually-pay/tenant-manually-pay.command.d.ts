import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class TenantManuallyPayCommand {
    readonly paymentTransactionId: UUID;
    readonly userId: UUID;
    constructor(paymentTransactionId: UUID, userId: UUID);
}
