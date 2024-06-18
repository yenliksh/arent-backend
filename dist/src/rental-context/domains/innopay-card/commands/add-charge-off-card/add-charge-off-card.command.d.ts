import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class AddChargeOffCardCommand {
    readonly props: {
        userId: UUID;
        cnpUserId: number;
        cnpCardId: number;
        customerReference: string;
    };
    readonly trxId?: string | undefined;
    constructor(props: {
        userId: UUID;
        cnpUserId: number;
        cnpCardId: number;
        customerReference: string;
    }, trxId?: string | undefined);
}
