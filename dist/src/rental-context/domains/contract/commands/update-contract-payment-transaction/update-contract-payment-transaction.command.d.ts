import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class UpdateContractPaymentTransactionCommand {
    readonly contractId: UUID;
    readonly trxId?: string | undefined;
    constructor(contractId: UUID, trxId?: string | undefined);
}
