import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { ICancelationRulesMeta, PaymentTenantCancelationResponse } from '../types';
import { BaseLongTermRentCancelationStrategy } from './base-long-term-rent-cancelation.strategy';
export declare class LongTermRentTenantCancelationStrategy extends BaseLongTermRentCancelationStrategy {
    readonly contract: ContractEntity;
    private _cancelationType;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    static cancelationRulesMap: {
        [P in LongTermRentCancellationPolicyType]: ICancelationRulesMeta;
    };
    private getCurrentStayTransaction;
    private getNextStayTransaction;
    private getFirstPaidTransaction;
    private getLastPaidTransaction;
    private getUnpaidAmountOfHours;
    private getCostPerHour;
    handle(checkOutDate?: string): PaymentTenantCancelationResponse<RentPeriodStrategyType.LONG_TERM_RENT>;
    private recomputeLastTransaction;
    private getMinAllowedCheckoutDate;
    protected computeRefundByAdmin(): number[];
    protected computeRefundByFirstTransaction(): number[];
}
