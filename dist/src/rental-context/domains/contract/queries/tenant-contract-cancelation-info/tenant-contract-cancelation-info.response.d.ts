import { LongPeriodTenantCheckOutCancelationType, PaymentTenantCancelationResponse } from '@domains/contract/base-classes/rental-cancelation-strategies/types';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
export declare class TenantContractCancelationInfoResponse {
    strategyType: RentPeriodStrategyType;
    cancelationDate: string;
    checkOutDate: string;
    refundsAmount: string;
    withdrawalAmount?: string;
    recomputedLastStayWithdrawalAmount?: string;
    checkoutType?: LongPeriodTenantCheckOutCancelationType;
    static create(props: PaymentTenantCancelationResponse<RentPeriodStrategyType>): TenantContractCancelationInfoResponse;
}
