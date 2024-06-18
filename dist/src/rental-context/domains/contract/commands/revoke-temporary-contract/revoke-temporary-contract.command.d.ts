import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class RevokeTemporaryContractCommand {
    readonly contractId: UUID;
    constructor(contractId: UUID);
}
