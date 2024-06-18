import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { Logger } from '@nestjs/common';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { CommonShortMiddleTermRentLandlordCancelationStrategy } from '../common/common-short-middle-term-rent-landlord-cancelation.stratiegy';
export declare abstract class BaseShortTermRentCancelationStrategy extends CommonShortMiddleTermRentLandlordCancelationStrategy<RentPeriodStrategyType.SHORT_TERM_RENT> {
    readonly contract: ContractEntity;
    readonly transactions: PaymentTransactionEntity[];
    protected arrivalDate: string;
    protected departureDate: string;
    protected logger: Logger;
    protected _cancelationType: ShortTermRentCancellationPolicyType;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    cancelType: RentPeriodStrategyType;
}
