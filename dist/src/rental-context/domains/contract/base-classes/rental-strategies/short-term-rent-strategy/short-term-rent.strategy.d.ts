import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { ShortTermRentPaymentType } from '@infrastructure/enums';
import { Logger } from '@nestjs/common';
import { PaymentResponse } from '../../rental-manager/types';
import { RentalStrategyBase } from '../rental-strategy.base';
export declare class ShortTermRentStrategy extends RentalStrategyBase {
    constructor({ contract, paymentType }: {
        contract: ContractEntity;
        paymentType?: ShortTermRentPaymentType;
    });
    protected _senderTaxRate: number;
    protected _recipientTaxRate: number;
    protected logger: Logger;
    private _paymentType;
    private _daysBeforeArrivalForSecondWithdrawal;
    private strategyMap;
    handle(): PaymentResponse;
    generateFullPayment(): PaymentResponse;
    generatePartialPayments(): PaymentResponse;
}
