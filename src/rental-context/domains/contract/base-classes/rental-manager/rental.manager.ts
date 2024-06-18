import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { ShortTermRentPaymentType } from '@infrastructure/enums';

import { RentalDateGuard } from '../rental-guards/rental-date.guard';
import { LongTermRentStrategy } from '../rental-strategies/long-term-rent-strategy/long-term-rent.strategy';
import { MiddleTermRentStrategy } from '../rental-strategies/middle-term-rent-strategy/middle-term-rent.strategy';
import { RentalStrategyBase } from '../rental-strategies/rental-strategy.base';
import { ShortTermRentStrategy } from '../rental-strategies/short-term-rent-strategy/short-term-rent.strategy';
import { PaymentResponse, RentPeriodStrategyType } from './types';

export class PaymentManager<Strategy extends RentalStrategyBase> {
  _strategy: Strategy;

  constructor(strategy: Strategy) {
    this._strategy = strategy;
  }

  get strategy(): Strategy {
    return this._strategy;
  }

  generate(): PaymentResponse {
    return this._strategy.handle();
  }

  static defineStrategy(contract: ContractEntity): RentalStrategyBase {
    const strategyMapper: {
      [P in RentPeriodStrategyType]: (
        contract: ContractEntity,
        paymentType?: ShortTermRentPaymentType,
      ) => RentalStrategyBase;
    } = {
      [RentPeriodStrategyType.SHORT_TERM_RENT]: (contract: ContractEntity, paymentType?: ShortTermRentPaymentType) =>
        new ShortTermRentStrategy({ contract, paymentType }),
      [RentPeriodStrategyType.MIDDLE_TERM_RENT]: (contract: ContractEntity) => new MiddleTermRentStrategy({ contract }),
      [RentPeriodStrategyType.LONG_TERM_RENT]: (contract: ContractEntity) => new LongTermRentStrategy({ contract }),
    };

    const rentalDateGuard = new RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
    const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
      arrivalDate: contract.arrivalDateOrFail,
      departureDate: contract.departureDateOrFail,
    });

    return strategyMapper[paymentStrategyType](contract, contract.paymentType);
  }
}
