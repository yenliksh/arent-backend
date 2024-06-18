import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { ApartmentRentPeriodType, ContractStatus } from '@infrastructure/enums';
import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';

import { IArrivalDepartureDates, RentPeriodStrategyType } from '../rental-manager/types';

const DAY_LIVE_IN_HOURS = 22;

export class RentalDateGuard {
  constructor(
    private readonly rentPeriods: RentPeriodVersionEntity,
    private readonly contractStatus?: ContractStatus,
  ) {}

  private validatorMap: {
    [P in RentPeriodStrategyType]: (props: IArrivalDepartureDates) => void;
  } = {
    [RentPeriodStrategyType.SHORT_TERM_RENT]: (props: IArrivalDepartureDates) => {
      this.validateShortTermRent(props);
    },
    [RentPeriodStrategyType.MIDDLE_TERM_RENT]: (props: IArrivalDepartureDates) => {
      this.validateMiddleTermRent(props);
    },
    [RentPeriodStrategyType.LONG_TERM_RENT]: (props: IArrivalDepartureDates) => {
      this.validateLongTermRent(props);
    },
  };

  public validateOrThrowError(
    { arrivalDate, departureDate }: IArrivalDepartureDates,
    rentPeriodStrategyType: RentPeriodStrategyType,
  ) {
    this.validatorMap[rentPeriodStrategyType]({ arrivalDate, departureDate });
  }

  private validatePositiveOrThrowError({ arrivalDate, departureDate }: IArrivalDepartureDates) {
    const amountOfRentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });

    if (amountOfRentDays < 1) {
      const errorMessage = `Arrival and departure dates must be positive`;

      throw new ArgumentOutOfRangeException(errorMessage);
    }
  }

  static validateTimeOrThrowError(
    { arrivalDate, departureDate }: IArrivalDepartureDates,
    contractStatus?: ContractStatus,
  ) {
    if (contractStatus && contractStatus === ContractStatus.REJECTED) {
      return;
    }

    const errorMessage = `Time difference must be equal ${DAY_LIVE_IN_HOURS} hours`;

    const parsedArrivalDate = DateUtil.parseUTC(arrivalDate);
    const parsedDepartureDate = DateUtil.parseUTC(departureDate);

    const isDepartureTimeLessThanArrivalTime = parsedArrivalDate.hour() >= parsedDepartureDate.hour();

    if (isDepartureTimeLessThanArrivalTime) {
      const differenceInHours = DateUtil.getDiffBetweenTwoDatesUTC(
        arrivalDate,
        parsedArrivalDate
          .hour(parsedDepartureDate.hour())
          .minute(parsedDepartureDate.minute())
          .millisecond(parsedDepartureDate.millisecond())
          .add(1, 'day')
          .toISOString(),
        'hours',
      );

      const isValid = differenceInHours === DAY_LIVE_IN_HOURS;

      if (isValid) {
        return;
      }

      throw new ArgumentOutOfRangeException(errorMessage);
    }

    const differenceInHours = DateUtil.getDiffBetweenTwoDatesUTC(
      arrivalDate,
      parsedArrivalDate
        .hour(parsedDepartureDate.hour())
        .minute(parsedDepartureDate.minute())
        .millisecond(parsedDepartureDate.millisecond())
        .toISOString(),
      'hours',
    );

    const isValid = differenceInHours === DAY_LIVE_IN_HOURS;

    if (isValid) {
      return;
    }

    throw new ArgumentOutOfRangeException(errorMessage);
  }

  private getAmountOfRentDays({ arrivalDate, departureDate }: IArrivalDepartureDates) {
    return Math.ceil(DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'days', true));
  }

  private validateShortTermRent({ arrivalDate, departureDate }: IArrivalDepartureDates) {
    const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });

    RentalDateGuard.validateTimeOrThrowError({ arrivalDate, departureDate }, this.contractStatus);

    this.validatePositiveOrThrowError({ arrivalDate, departureDate });

    const [allowedDayStarts, allowedDayEnds] = this.getRangeOfAllowedBookingDays(
      arrivalDate,
      this.rentPeriods.shortTermRentMonth,
    );

    const isValidAmountRentDays = allowedDayStarts < rentDays && rentDays <= allowedDayEnds;

    if (!isValidAmountRentDays) {
      const errorMessage = `Short term rent days must be greater then ${allowedDayStarts} and less than or equal ${allowedDayEnds}`;

      throw new ArgumentOutOfRangeException(errorMessage);
    }
  }

  static mustBeDaysBeforeArrival(now: string, arrivalDate: string, mustBeDays: number) {
    const amountOfDaysBeforeTheArrival = DateUtil.getDiffBetweenTwoDatesUTC(now, arrivalDate, 'days');

    if (amountOfDaysBeforeTheArrival <= mustBeDays) {
      const errorMessage = `Days before arrival must be greater then ${mustBeDays} for using partial payment method`;

      throw new ArgumentOutOfRangeException(errorMessage);
    }
  }

  private validateMiddleTermRent({ arrivalDate, departureDate }: IArrivalDepartureDates) {
    const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });

    RentalDateGuard.validateTimeOrThrowError({ arrivalDate, departureDate }, this.contractStatus);

    this.validatePositiveOrThrowError({ arrivalDate, departureDate });

    const [allowedDayStarts, allowedDayEnds] = this.getRangeOfAllowedBookingDays(
      arrivalDate,
      this.rentPeriods.middleTermRentMonth,
    );

    const isValidAmountRentDays = allowedDayStarts < rentDays && rentDays <= allowedDayEnds;

    if (!isValidAmountRentDays) {
      const errorMessage = `Middle term rent days must be greater then ${allowedDayStarts} and less than or equal ${allowedDayEnds}`;

      throw new ArgumentOutOfRangeException(errorMessage);
    }
  }

  private validateLongTermRent({ arrivalDate, departureDate }: IArrivalDepartureDates) {
    const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });

    RentalDateGuard.validateTimeOrThrowError({ arrivalDate, departureDate }, this.contractStatus);

    this.validatePositiveOrThrowError({ arrivalDate, departureDate });

    const [amountOfAllowedDays] = this.getAmountOfAllowedBookingDays(arrivalDate, this.rentPeriods.longTermRentMonth);

    const validAmountRentDays = amountOfAllowedDays === rentDays;

    if (!validAmountRentDays) {
      const errorMessage = `Long term rent days must be equal ${amountOfAllowedDays}`;

      throw new ArgumentOutOfRangeException(errorMessage);
    }
  }

  private getRangeOfAllowedBookingDays(arrivalDate: string, allowedMonthRange: number[]): number[] {
    const [fromMonth, toMonth] = allowedMonthRange;

    const relativeArrivalDateFromMonth = DateUtil.parse(arrivalDate).add(fromMonth, 'month');
    const relativeArrivalDateToMonth = DateUtil.parse(arrivalDate).add(toMonth, 'month');

    const allowedDayStarts = DateUtil.getDiffBetweenTwoDatesUTC(
      DateUtil.parse(arrivalDate).toDate(),
      relativeArrivalDateFromMonth.toDate(),
      'days',
    );

    const allowedDaysEnds = DateUtil.getDiffBetweenTwoDatesUTC(
      DateUtil.parse(arrivalDate).toDate(),
      relativeArrivalDateToMonth.toDate(),
      'days',
    );

    return [allowedDayStarts, allowedDaysEnds];
  }

  private getAmountOfAllowedBookingDays(arrivalDate: string, allowedMonthRange: number[]): number[] {
    const [allowedMonth] = allowedMonthRange;

    const relativeArrivalDateAmountOfMonths = DateUtil.parseUTC(arrivalDate).add(allowedMonth, 'month');

    const allowedDayDiffs = DateUtil.getDiffBetweenTwoDatesUTC(
      DateUtil.parse(arrivalDate).toDate(),
      relativeArrivalDateAmountOfMonths.toDate(),
      'days',
    );

    return [allowedDayDiffs];
  }

  public defineRentPeriodStrategyType(
    { arrivalDate, departureDate }: IArrivalDepartureDates,
    apartmentRentPeriodType?: ApartmentRentPeriodType,
  ): RentPeriodStrategyType {
    const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });

    const [shortAllowedDayStarts, shortAllowedDayEnds] = this.getRangeOfAllowedBookingDays(
      arrivalDate,
      this.rentPeriods.shortTermRentMonth,
    );
    const isShortTermRentPaymentType =
      shortAllowedDayStarts < rentDays &&
      rentDays <= shortAllowedDayEnds &&
      (!apartmentRentPeriodType || apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM);

    if (isShortTermRentPaymentType) {
      return RentPeriodStrategyType.SHORT_TERM_RENT;
    }

    const [middleAllowedDayStarts, middleAllowedDayEnds] = this.getRangeOfAllowedBookingDays(
      arrivalDate,
      this.rentPeriods.middleTermRentMonth,
    );
    const isMiddleTermRentPaymentType =
      middleAllowedDayStarts < rentDays &&
      rentDays <= middleAllowedDayEnds &&
      (!apartmentRentPeriodType || apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM); //not misprint (middle term rent is part of short term rent)

    if (isMiddleTermRentPaymentType) {
      return RentPeriodStrategyType.MIDDLE_TERM_RENT;
    }

    const [longAllowedRentDays] = this.getRangeOfAllowedBookingDays(arrivalDate, this.rentPeriods.longTermRentMonth);
    const isLongTermRentPaymentType =
      longAllowedRentDays === rentDays &&
      (!apartmentRentPeriodType || apartmentRentPeriodType === ApartmentRentPeriodType.LONG_TERM);

    if (isLongTermRentPaymentType) {
      return RentPeriodStrategyType.LONG_TERM_RENT;
    }

    throw new ArgumentOutOfRangeException("Rent days aren't matched with specified range rules");
  }
}
