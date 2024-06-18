import { ContractPaymentStatusType } from '@domains/contract/types';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { TenantContractPaymentInfoRequest } from './tenant-contract-payment-info.request';
export interface TenantContractPaymentInfo {
    type: ContractPaymentStatusType;
    paidAmount: number;
    payableAmount: number;
    totalAmount: number;
    payableAmountOfNextCharge?: number;
    dateOfNextCharge?: Date;
    accommodationAvailableDate?: Date;
    refundsAmount: number;
    cancellationDate?: Date;
}
export declare class TenantContractPaymentInfoService {
    handle(dto: TenantContractPaymentInfoRequest, userId: UserOrmEntity['id']): Promise<TenantContractPaymentInfo>;
    private defineContractPaymentStatusType;
}
