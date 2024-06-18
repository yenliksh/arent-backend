import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { PaymentLandlordCancelationResponse } from '../types';
import { BaseShortTermRentCancelationStrategy } from './base-short-term-rent-cancelation.strategy';
export declare class ShortTermRentLandlordCancelationStrategy extends BaseShortTermRentCancelationStrategy {
    readonly contract: ContractEntity;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    handle(): PaymentLandlordCancelationResponse<RentPeriodStrategyType.SHORT_TERM_RENT>;
    private computeRefundsByAdmin;
}
