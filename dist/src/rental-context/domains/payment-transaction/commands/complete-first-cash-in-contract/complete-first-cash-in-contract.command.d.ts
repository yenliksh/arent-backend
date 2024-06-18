import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class CompleteFirstCashInContractCommand {
    readonly contractId: UUID;
    readonly customerReference: string;
    constructor(contractId: UUID, customerReference: string);
}
