import { ContractPaymentStatusType } from '@domains/contract/types';
import { TenantContractPaymentInfo } from './tenant-contract-payment-info.service';
export declare class TenantContractPaymentInfoResponse {
    type: ContractPaymentStatusType;
    paidAmount: string;
    payableAmount: string;
    totalAmount: string;
    refundsAmount: string;
    payableAmountOfNextCharge?: string;
    dateOfNextCharge?: string;
    accommodationAvailableDate?: string;
    cancellationDate?: string;
    static create(props: TenantContractPaymentInfo): TenantContractPaymentInfoResponse;
}
