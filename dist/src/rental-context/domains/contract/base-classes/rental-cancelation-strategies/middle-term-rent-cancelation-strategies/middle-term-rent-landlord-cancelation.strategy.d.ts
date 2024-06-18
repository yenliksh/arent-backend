import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { PaymentLandlordCancelationResponse } from '../types';
import { BaseMiddleTermRentCancelationStrategy } from './base-middle-term-rent-cancelation.strategy';
export declare class MiddleTermRentLandlordCancelationStrategy extends BaseMiddleTermRentCancelationStrategy {
    readonly contract: ContractEntity;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    handle(): PaymentLandlordCancelationResponse<RentPeriodStrategyType.MIDDLE_TERM_RENT>;
    private computeRefundsByAdmin;
}
