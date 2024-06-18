import { AdminCancelationMode, CancellationTrigger } from '@domains/contract/domain/types';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class CancelContractByAdminCommand {
    readonly props: {
        contractId: UUID;
        trigger: CancellationTrigger;
        adminCancelMeta?: AdminCancelationMode;
    };
    constructor(props: {
        contractId: UUID;
        trigger: CancellationTrigger;
        adminCancelMeta?: AdminCancelationMode;
    });
}
