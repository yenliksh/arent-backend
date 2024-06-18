import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ApartmentRentPeriodType, ShortTermRentPaymentType } from '@infrastructure/enums';
import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';

import { rentalManagerFactory } from '../../__tests__/factories/rental-manager.factory';

describe('ShortTermRentFullPaymentStrategy', () => {
  describe('generate payment', () => {
    it('should generate properly response data for short term rent payment (1)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-08-22T16:00:00.000Z').toDate());

      const shortTermRentStrategy = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = shortTermRentStrategy.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(1);
      // 5000000 * rentDays (5) + 12% taxRate
      expect(result.data[0].taxAmount).toEqual(3000000);
      expect(result.data[0].totalAmountPayable).toEqual(28000000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(24569500);
      expect(result.data[0].totalRevenue).toEqual(2674500);
      /*
       * 4.91 days difference
       * between 2022-10-20T16:00:00.000Z and 2022-10-25T14:00:00.000Z and rounding up them = 5
       * 0.09 is a 2 hours for cleaning flat after tenant vacates
       */
      expect(result.data[0].rentDays).toEqual(5);
    });

    it('should generate properly response data for short term rent payment (2)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-08-22T16:00:00.000Z').toDate());

      const shortTermRentStrategy = rentalManagerFactory(
        {
          arrivalDate: '2022-12-31T23:00:00.000Z',
          departureDate: '2023-01-05T21:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = shortTermRentStrategy.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].taxAmount).toEqual(3000000);
      expect(result.data[0].totalAmountPayable).toEqual(28000000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(24569500);
      expect(result.data[0].totalRevenue).toEqual(2674500);
      expect(result.data[0].rentDays).toEqual(5);
    });

    it('should generate properly response data for short term rent payment (3)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-08-22T16:00:00.000Z').toDate());

      const shortTermRentStrategy = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2022-11-20T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = shortTermRentStrategy.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].taxAmount).toEqual(18600000);
      expect(result.data[0].totalAmountPayable).toEqual(173600000);
      expect(result.data[0].rentDays).toEqual(31);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(152330300);
      expect(result.data[0].totalRevenue).toEqual(16582500);
    });

    it('should generate a correct withdrawal date', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T16:30:00.000Z').toDate());

      const shortTermRentStrategy = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2022-11-20T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = shortTermRentStrategy.generate();
      // must generate now date time utc
      expect(result.data[0].withdrawFundsDate).toEqual('2022-09-19T16:30:00.000Z');
    });
  });

  describe('generate payment errors', () => {
    it('should throw error by generate with wrong data for short term rent payment', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-08-22T16:00:00.000Z').toDate());
      const paymentManagerCallback = () =>
        rentalManagerFactory(
          {
            arrivalDate: '2022-10-20T16:00:00.000Z',
            departureDate: '2022-11-21T14:00:00.000Z',
            cost: 5000000,
            rentType: ApartmentRentPeriodType.SHORT_TERM,
          },
          RentPeriodStrategyType.SHORT_TERM_RENT,
          ShortTermRentPaymentType.FULL,
        ).generate();

      expect(paymentManagerCallback).toThrowError(ArgumentOutOfRangeException);
    });
  });

  describe('generate payment with fine', () => {
    it('should generate totalAmountToBeTransferred less on 20% and totalRevenue greater on 20%', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-08-22T16:00:00.000Z').toDate());

      const shortTermRentStrategy = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          withFine: true,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = shortTermRentStrategy.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(1);
      // 5000000 * rentDays (5) + 12% taxRate
      expect(result.data[0].taxAmount).toEqual(3000000);
      expect(result.data[0].totalAmountPayable).toEqual(28000000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(19503600);
      expect(result.data[0].totalRevenue).toEqual(7740400);
      /*
       * 4.91 days difference
       * between 2022-10-20T16:00:00.000Z and 2022-10-25T14:00:00.000Z and rounding up them = 5
       * 0.09 is a 2 hours for cleaning flat after tenant vacates
       */
      expect(result.data[0].rentDays).toEqual(5);
    });
  });
});
