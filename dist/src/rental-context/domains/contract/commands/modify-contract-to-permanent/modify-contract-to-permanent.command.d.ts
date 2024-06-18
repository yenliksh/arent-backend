import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class ModifyContractToPermanentCommand {
    readonly contractId: UUID;
    readonly cardProps: {
        cnpCardId: number;
        cnpUserId: number;
    };
    readonly trxId?: string | undefined;
    constructor(contractId: UUID, cardProps: {
        cnpCardId: number;
        cnpUserId: number;
    }, trxId?: string | undefined);
}
