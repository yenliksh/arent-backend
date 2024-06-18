import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
export declare class FindContractRequestForLandlordRequest extends BaseAfterCursorPaginateRequest {
    readonly type: ApartmentRentPeriodType;
}
