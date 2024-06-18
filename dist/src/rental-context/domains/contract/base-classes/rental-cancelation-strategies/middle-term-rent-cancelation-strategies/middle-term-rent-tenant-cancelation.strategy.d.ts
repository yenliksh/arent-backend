import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { MiddleTermRentCancellationPolicyType } from '@infrastructure/enums';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { ICancelationRulesMeta, PaymentTenantCancelationResponse } from '../types';
import { BaseMiddleTermRentCancelationStrategy } from './base-middle-term-rent-cancelation.strategy';
export declare class MiddleTermRentTenantCancelationStrategy extends BaseMiddleTermRentCancelationStrategy {
    readonly contract: ContractEntity;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    private _cancelationType;
    static cancelationRulesMap: {
        [P in MiddleTermRentCancellationPolicyType]: ICancelationRulesMeta;
    };
    private getCurrentStayTransaction;
    private getNextStayTransaction;
    private getFirstPaidTransaction;
    private getLastPaidTransaction;
    private getUnpaidAmountOfHours;
    private getCostPerHour;
    handle(checkOutDate?: string): PaymentTenantCancelationResponse<RentPeriodStrategyType.MIDDLE_TERM_RENT>;
    private recomputeLastTransaction;
    private getMinAllowedCheckoutDate;
    protected computeRefundByAdmin(): number[];
    protected computeRefundByFirstTransaction(): number[];
}
