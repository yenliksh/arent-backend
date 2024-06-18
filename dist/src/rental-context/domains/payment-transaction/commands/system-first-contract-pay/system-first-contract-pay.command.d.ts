import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class SystemFirstContractPayCommand {
    readonly contractId: UUID;
    constructor(contractId: UUID);
}
