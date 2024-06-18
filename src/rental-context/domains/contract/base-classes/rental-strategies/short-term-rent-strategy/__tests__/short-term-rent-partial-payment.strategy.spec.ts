import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ApartmentRentPeriodType, ShortTermRentPaymentType } from '@infrastructure/enums';
import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';

import { rentalManagerFactory } from '../../__tests__/factories/rental-manager.factory';

describe('ShortTermRentPartialPaymentStrategy', () => {
  describe('generate payment', () => {
    it('should generate properly response data for short term rent payment (1)', () => {
      // allowed use partial payment method if days before arrival date more than 30
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T00:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.PARTIAL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(2);
      // 5000000 * rentDays (5) + 12% taxRate / 2 (50% each payment)
      expect(result.data[0].totalAmountPayable).toEqual(14000000);
      expect(result.data[1].totalAmountPayable).toEqual(14000000);
      expect(result.data[0].taxAmount).toEqual(1500000);
      expect(result.data[1].taxAmount).toEqual(1500000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(12284800);
      expect(result.data[1].totalRevenue).toEqual(1337200);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(12284800);
      expect(result.data[1].totalRevenue).toEqual(1337200);
      expect(result.data[0].rentDays).toEqual(5);
    });

    it('should generate properly response data for short term rent payment (2)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T00:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-12-20T12:00:00.000Z',
          departureDate: '2023-01-15T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.PARTIAL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(2);
      expect(result.data[0].totalAmountPayable).toEqual(72800000);
      expect(result.data[1].totalAmountPayable).toEqual(72800000);
      expect(result.data[0].taxAmount).toEqual(7800000);
      expect(result.data[1].taxAmount).toEqual(7800000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(63880500);
      expect(result.data[1].totalRevenue).toEqual(6953900);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(63880500);
      expect(result.data[1].totalRevenue).toEqual(6953900);
      expect(result.data[0].rentDays).toEqual(26);
    });

    it('should generate properly response data for short term rent payment (3)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T00:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2022-11-20T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.PARTIAL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(2);
      expect(result.data[0].totalAmountPayable).toEqual(86800000);
      expect(result.data[1].totalAmountPayable).toEqual(86800000);
      expect(result.data[0].taxAmount).toEqual(9300000);
      expect(result.data[1].taxAmount).toEqual(9300000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(76165200);
      expect(result.data[1].totalRevenue).toEqual(8291200);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(76165200);
      expect(result.data[1].totalRevenue).toEqual(8291200);
      expect(result.data[0].rentDays).toEqual(31);
    });

    it('should generate a correct withdrawal dates', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T16:30:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2022-11-20T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.PARTIAL,
      );

      const result = paymentManager.generate();
      // must generate now date time utc
      expect(result.data[0].withdrawFundsDate).toEqual('2022-09-19T16:30:00.000Z');
      // must generate a second withdrawal date 14 days prior to arrival(2022-10-20T18:00:00.000Z)
      expect(result.data[1].withdrawFundsDate).toEqual('2022-10-06T06:00:00.000Z');
    });
  });

  describe('generate payment errors', () => {
    it('should throw error by generate with wrong data for partial short term rent payment', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T00:00:00.000Z').toDate());

      const paymentManagerCallback = () =>
        rentalManagerFactory(
          {
            arrivalDate: '2022-10-20T14:00:00.000Z',
            departureDate: '2022-11-21T12:00:00.000Z',
            cost: 5000000,
            rentType: ApartmentRentPeriodType.SHORT_TERM,
          },
          RentPeriodStrategyType.SHORT_TERM_RENT,
          ShortTermRentPaymentType.PARTIAL,
        ).generate();

      /**
       * error because difference
       * between 2022-10-20T14:00:00.000Z and 2022-11-21T12:00:00.000Z is 32 days
       * and 32 days is not valid for short term rent payment strategy
       */
      expect(paymentManagerCallback).toThrowError(ArgumentOutOfRangeException);
    });

    it('should throw an error because there are less than 30 days left before arrival', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-25T00:00:00.000Z').toDate());

      const paymentManagerCallback = () =>
        rentalManagerFactory(
          {
            arrivalDate: '2022-10-20T18:00:00.000Z',
            departureDate: '2022-11-20T16:00:00.000Z',
            cost: 5000000,
            rentType: ApartmentRentPeriodType.SHORT_TERM,
          },
          RentPeriodStrategyType.SHORT_TERM_RENT,
          ShortTermRentPaymentType.PARTIAL,
        ).generate();

      expect(paymentManagerCallback).toThrowError(ArgumentOutOfRangeException);
    });
  });

  describe('generate payment with fine', () => {
    it('should generate totalAmountToBeTransferred less on 20% and totalRevenue greater on 20%', () => {
      // allowed use partial payment method if days before arrival date more than 30
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T00:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          withFine: true,
        },
        RentPeriodStrategyType.SHORT_TERM_RENT,
        ShortTermRentPaymentType.PARTIAL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(2);
      // 5000000 * rentDays (5) + 12% taxRate / 2 (50% each payment)
      expect(result.data[0].totalAmountPayable).toEqual(14000000);
      expect(result.data[1].totalAmountPayable).toEqual(14000000);
      expect(result.data[0].taxAmount).toEqual(1500000);
      expect(result.data[1].taxAmount).toEqual(1500000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(9751800);
      expect(result.data[1].totalRevenue).toEqual(3870200);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(9751800);
      expect(result.data[1].totalRevenue).toEqual(3870200);
      expect(result.data[0].rentDays).toEqual(5);
    });
  });
});
