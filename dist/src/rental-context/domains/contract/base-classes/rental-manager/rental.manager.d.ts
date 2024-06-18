import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { RentalStrategyBase } from '../rental-strategies/rental-strategy.base';
import { PaymentResponse } from './types';
export declare class PaymentManager<Strategy extends RentalStrategyBase> {
    _strategy: Strategy;
    constructor(strategy: Strategy);
    get strategy(): Strategy;
    generate(): PaymentResponse;
    static defineStrategy(contract: ContractEntity): RentalStrategyBase;
}
