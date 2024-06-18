import { ContractRentStatus } from '@infrastructure/enums';
import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
export declare class TenantLongTermRentContractsRequest extends BaseAfterCursorPaginateRequest {
    readonly type: ContractRentStatus;
}
