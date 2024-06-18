import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { PaymentTenantCancelationResponse } from '../types';
import { BaseShortTermRentCancelationStrategy } from './base-short-term-rent-cancelation.strategy';
export declare class ShortTermRentTenantCancelationStrategy extends BaseShortTermRentCancelationStrategy {
    readonly contract: ContractEntity;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    private _cancelationRulesMap;
    handle(): PaymentTenantCancelationResponse<RentPeriodStrategyType.SHORT_TERM_RENT>;
    protected computeRefunds(feeRate: number): number[];
}
