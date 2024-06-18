import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class RejectIntersectedContractsCommand {
    readonly concludedContractId: UUID;
    constructor(concludedContractId: UUID);
}
