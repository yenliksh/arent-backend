import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { DateUtil } from '@libs/utils/date-util';

import { RentalDateGuard } from '../rental-guards/rental-date.guard';
import { IArrivalDepartureDates, IStayDates, PaymentResponse } from '../rental-manager/types';

export abstract class RentalStrategyBase {
  protected dateGuard: RentalDateGuard;

  constructor(protected readonly contract: ContractEntity) {
    this.dateGuard = new RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
  }

  protected get now() {
    return DateUtil.utcNow().millisecond(0).toISOString();
  }

  protected getRentDays({ arrivalDate, departureDate }: IArrivalDepartureDates) {
    return Math.ceil(DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'days', true));
  }

  protected getStayDates({ arrivalDate, departureDate }: IArrivalDepartureDates): IStayDates[] {
    const rentMonths = DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'months', true);

    const stayDates = new Array(Math.ceil(rentMonths)).fill(undefined).reduce<IStayDates[]>((acc, _, index) => {
      const startDate = acc[acc.length - 1] ? acc[acc.length - 1].endDate : arrivalDate;

      const currentRentMonth = index + 1;

      if (currentRentMonth > rentMonths) {
        acc.push({ startDate, endDate: departureDate });

        return acc;
      }

      const endDate = DateUtil.parse(arrivalDate).add(currentRentMonth, 'month').toISOString();

      acc.push({ startDate, endDate });

      return acc;
    }, []);

    return stayDates;
  }

  abstract handle(): PaymentResponse;
}
