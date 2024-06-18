import { AdminCancelationMode, CancellationTrigger } from '@domains/contract/domain/types';
export declare class AdminCancelationModeRequest implements AdminCancelationMode {
    readonly force: boolean;
    readonly validExcuse: boolean;
}
export declare class ContractCancellationRequest {
    readonly cancellationMeta?: AdminCancelationModeRequest;
    readonly requestingUserRole: CancellationTrigger;
}
