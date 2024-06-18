import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { PaymentLandlordCancelationResponse } from '../types';
import { BaseLongTermRentCancelationStrategy } from './base-long-term-rent-cancelation.strategy';
export declare class LongTermRentLandlordCancelationStrategy extends BaseLongTermRentCancelationStrategy {
    readonly contract: ContractEntity;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    private _validExcuse;
    private _forcedCancelation;
    validExcuse(): void;
    forcedCancelation(): void;
    handle(): PaymentLandlordCancelationResponse<RentPeriodStrategyType.LONG_TERM_RENT>;
    private lastPayedTransaction;
    private computeRefundsCancelationByAdmin;
}
