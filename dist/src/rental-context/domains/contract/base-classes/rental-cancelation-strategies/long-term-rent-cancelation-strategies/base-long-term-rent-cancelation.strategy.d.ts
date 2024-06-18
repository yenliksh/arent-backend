import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { Logger } from '@nestjs/common';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { RentalCancelationStrategyBase } from '../rental-cancelation-strategy.base';
export declare abstract class BaseLongTermRentCancelationStrategy extends RentalCancelationStrategyBase<RentPeriodStrategyType.LONG_TERM_RENT> {
    readonly contract: ContractEntity;
    readonly transactions: PaymentTransactionEntity[];
    protected arrivalDate: string;
    protected departureDate: string;
    protected logger: Logger;
    protected _senderTaxRate: number;
    protected _recipientTaxRate: number;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
}
