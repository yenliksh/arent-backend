import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { Logger } from '@nestjs/common';
import { PaymentResponse } from '../../rental-manager/types';
import { RentalStrategyBase } from '../rental-strategy.base';
export declare class MiddleTermRentStrategy extends RentalStrategyBase {
    constructor({ contract }: {
        contract: ContractEntity;
    });
    protected _senderTaxRate: number;
    protected _recipientTaxRate: number;
    protected logger: Logger;
    private _daysBeforeOfWithdrawSubsequentRents;
    handle(): PaymentResponse;
}
