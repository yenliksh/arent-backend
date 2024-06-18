import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { Logger } from '@nestjs/common';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { CommonShortMiddleTermRentLandlordCancelationStrategy } from '../common/common-short-middle-term-rent-landlord-cancelation.stratiegy';
export declare abstract class BaseMiddleTermRentCancelationStrategy extends CommonShortMiddleTermRentLandlordCancelationStrategy<RentPeriodStrategyType.MIDDLE_TERM_RENT> {
    readonly contract: ContractEntity;
    readonly transactions: PaymentTransactionEntity[];
    protected logger: Logger;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    cancelType: RentPeriodStrategyType;
}
