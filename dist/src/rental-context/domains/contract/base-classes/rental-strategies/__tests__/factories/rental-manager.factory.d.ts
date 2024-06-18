import { PaymentManager } from '@domains/contract/base-classes/rental-manager/rental.manager';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ShortTermRentPaymentType } from '@infrastructure/enums';
import { RentalStrategyBase } from '../../rental-strategy.base';
import { IContractCreateProps } from './contract-rental-strategy.factory';
export declare const rentalManagerFactory: (contractCreateProps: IContractCreateProps, rentPeriodStrategyType: RentPeriodStrategyType, shortTermRentPaymentMethodType?: ShortTermRentPaymentType) => PaymentManager<RentalStrategyBase>;
