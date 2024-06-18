import { PaymentManager } from '@domains/contract/base-classes/rental-manager/rental.manager';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ShortTermRentPaymentType } from '@infrastructure/enums';

import { LongTermRentStrategy } from '../../long-term-rent-strategy/long-term-rent.strategy';
import { MiddleTermRentStrategy } from '../../middle-term-rent-strategy/middle-term-rent.strategy';
import { RentalStrategyBase } from '../../rental-strategy.base';
import { ShortTermRentStrategy } from '../../short-term-rent-strategy/short-term-rent.strategy';
import { IContractCreateProps, contractRentalStrategyFactory } from './contract-rental-strategy.factory';

export const rentalManagerFactory = (
  contractCreateProps: IContractCreateProps,
  rentPeriodStrategyType: RentPeriodStrategyType,
  shortTermRentPaymentMethodType?: ShortTermRentPaymentType,
) => {
  const contract = contractRentalStrategyFactory(contractCreateProps);

  const strategyMap: { [P in RentPeriodStrategyType]: () => RentalStrategyBase } = {
    [RentPeriodStrategyType.SHORT_TERM_RENT]: () =>
      new ShortTermRentStrategy({ contract, paymentType: shortTermRentPaymentMethodType }),
    [RentPeriodStrategyType.MIDDLE_TERM_RENT]: () => new MiddleTermRentStrategy({ contract }),
    [RentPeriodStrategyType.LONG_TERM_RENT]: () => new LongTermRentStrategy({ contract }),
  };

  const strategy = strategyMap[rentPeriodStrategyType]();

  const payment = new PaymentManager(strategy);

  return payment;
};
