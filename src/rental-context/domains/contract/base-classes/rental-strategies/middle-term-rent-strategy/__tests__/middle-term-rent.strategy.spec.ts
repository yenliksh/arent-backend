import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ApartmentRentPeriodType, ShortTermRentPaymentType } from '@infrastructure/enums';
import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';

import { rentalManagerFactory } from '../../__tests__/factories/rental-manager.factory';

describe('MiddleTermRentPaymentStrategy', () => {
  describe('generate payment', () => {
    it('should generate properly response data for middle term rent payment (1)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2022-11-21T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.MIDDLE_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(2);
      expect(result.data[0].totalAmountPayable).toEqual(173600000);
      expect(result.data[1].totalAmountPayable).toEqual(5600000);
      expect(result.data[0].taxAmount).toEqual(18600000);
      expect(result.data[1].taxAmount).toEqual(600000);
      expect(result.data[0].rentDays).toEqual(31);
      expect(result.data[1].rentDays).toEqual(1);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(152330300);
      expect(result.data[1].totalAmountToBeTransferred).toEqual(4913900);
      expect(result.data[0].totalRevenue).toEqual(16582500);
      expect(result.data[1].totalRevenue).toEqual(534900);
      // first withdrawFundsDate equal today
      expect(result.data[0].withdrawFundsDate).toEqual('2022-08-22T16:00:00.000Z');
      // each subsequent withdrawFundsDate equal startDate subtract 3 day
      expect(result.data[1].withdrawFundsDate).toEqual('2022-11-17T06:00:00.000Z');
    });

    it('should generate properly response data for middle term rent payment (2)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T01:00:00.000Z',
          departureDate: '2022-11-20T23:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.MIDDLE_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(2);
      expect(result.data[0].totalAmountPayable).toEqual(173600000);
      expect(result.data[1].totalAmountPayable).toEqual(5600000);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(152330300);
      expect(result.data[1].totalAmountToBeTransferred).toEqual(4913900);
      expect(result.data[0].totalRevenue).toEqual(16582500);
      expect(result.data[1].totalRevenue).toEqual(534900);
      expect(result.data[0].taxAmount).toEqual(18600000);
      expect(result.data[1].taxAmount).toEqual(600000);
      expect(result.data[0].rentDays).toEqual(31);
      expect(result.data[1].rentDays).toEqual(1);
      expect(result.data[0].withdrawFundsDate).toEqual('2022-08-22T16:00:00.000Z');
      expect(result.data[1].withdrawFundsDate).toEqual('2022-11-17T06:00:00.000Z');
    });

    it('should generate properly response data for short term rent payment (3)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T01:00:00.000Z',
          departureDate: '2022-12-20T23:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.MIDDLE_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(3);

      expect(result.data[0].totalAmountPayable).toEqual(173600000);
      expect(result.data[1].totalAmountPayable).toEqual(168000000);
      expect(result.data[2].totalAmountPayable).toEqual(5600000);

      expect(result.data[0].totalAmountToBeTransferred).toEqual(152330300);
      expect(result.data[1].totalAmountToBeTransferred).toEqual(147416500);
      expect(result.data[2].totalAmountToBeTransferred).toEqual(4913900);

      expect(result.data[0].totalRevenue).toEqual(16582500);
      expect(result.data[1].totalRevenue).toEqual(16047500);
      expect(result.data[2].totalRevenue).toEqual(534900);

      expect(result.data[0].taxAmount).toEqual(18600000);
      expect(result.data[1].taxAmount).toEqual(18000000);
      expect(result.data[2].taxAmount).toEqual(600000);

      expect(result.data[0].rentDays).toEqual(31);
      expect(result.data[1].rentDays).toEqual(30);
      expect(result.data[2].rentDays).toEqual(1);

      expect(result.data[0].withdrawFundsDate).toEqual('2022-08-22T16:00:00.000Z');
      expect(result.data[1].withdrawFundsDate).toEqual('2022-11-17T06:00:00.000Z');
      expect(result.data[2].withdrawFundsDate).toEqual('2022-12-17T06:00:00.000Z');
    });

    it('should generate properly response data for middle term rent payment (4)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-09-20T01:00:00.000Z',
          departureDate: '2022-12-19T23:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        RentPeriodStrategyType.MIDDLE_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(3);

      expect(result.data[0].totalAmountPayable).toEqual(168000000);
      expect(result.data[1].totalAmountPayable).toEqual(173600000);
      expect(result.data[2].totalAmountPayable).toEqual(168000000);

      expect(result.data[0].totalAmountToBeTransferred).toEqual(147416500);
      expect(result.data[1].totalAmountToBeTransferred).toEqual(152330300);
      expect(result.data[2].totalAmountToBeTransferred).toEqual(147416500);

      expect(result.data[0].totalRevenue).toEqual(16047500);
      expect(result.data[1].totalRevenue).toEqual(16582500);
      expect(result.data[2].totalRevenue).toEqual(16047500);

      expect(result.data[0].taxAmount).toEqual(18000000);
      expect(result.data[1].taxAmount).toEqual(18600000);
      expect(result.data[2].taxAmount).toEqual(18000000);

      expect(result.data[0].rentDays).toEqual(30);
      expect(result.data[1].rentDays).toEqual(31);
      expect(result.data[2].rentDays).toEqual(30);

      expect(result.data[0].withdrawFundsDate).toEqual('2022-08-22T16:00:00.000Z');
      expect(result.data[1].withdrawFundsDate).toEqual('2022-10-17T06:00:00.000Z');
      expect(result.data[2].withdrawFundsDate).toEqual('2022-11-17T06:00:00.000Z');
    });
  });

  describe('generate payment errors', () => {
    it('should throw error for amount of wrong days for middle term rent payment', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());
      const paymentManagerCallback = () =>
        rentalManagerFactory(
          {
            arrivalDate: '2022-10-20T16:00:00.000Z',
            departureDate: '2022-10-25T12:00:00.000Z',
            cost: 5000000,
            rentType: ApartmentRentPeriodType.SHORT_TERM,
          },
          RentPeriodStrategyType.MIDDLE_TERM_RENT,
        ).generate();

      expect(paymentManagerCallback).toThrowError(ArgumentOutOfRangeException);
    });

    it('should throw error for amount of rent days greater than 3 month', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManagerCallback = () =>
        rentalManagerFactory(
          {
            arrivalDate: '2022-09-20T01:00:00.000Z',
            departureDate: '2022-12-20T23:00:00.000Z',
            cost: 5000000,
            rentType: ApartmentRentPeriodType.SHORT_TERM,
          },
          RentPeriodStrategyType.MIDDLE_TERM_RENT,
          ShortTermRentPaymentType.FULL,
        );

      expect(paymentManagerCallback).toThrowError(ArgumentOutOfRangeException);
    });

    it('should throw error for amount of rent days greater than 3 month', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManagerCallback = () =>
        rentalManagerFactory(
          {
            arrivalDate: '2022-09-20T01:00:00.000Z',
            departureDate: '2022-12-20T23:00:00.000Z',
            cost: 5000000,
            rentType: ApartmentRentPeriodType.SHORT_TERM,
          },
          RentPeriodStrategyType.MIDDLE_TERM_RENT,
          ShortTermRentPaymentType.FULL,
        );

      expect(paymentManagerCallback).toThrowError(ArgumentOutOfRangeException);
    });
  });

  describe('generate payment with fine', () => {
    it('should generate totalAmountToBeTransferred less on 20% and totalRevenue greater on 20%', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2022-11-21T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          withFine: true,
        },
        RentPeriodStrategyType.MIDDLE_TERM_RENT,
        ShortTermRentPaymentType.FULL,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(2);
      expect(result.data[0].totalAmountPayable).toEqual(173600000);
      expect(result.data[1].totalAmountPayable).toEqual(5600000);
      expect(result.data[0].taxAmount).toEqual(18600000);
      expect(result.data[1].taxAmount).toEqual(600000);
      expect(result.data[0].rentDays).toEqual(31);
      expect(result.data[1].rentDays).toEqual(1);
      expect(result.data[0].totalAmountToBeTransferred).toEqual(120922000);
      expect(result.data[1].totalAmountToBeTransferred).toEqual(3900800);
      expect(result.data[0].totalRevenue).toEqual(47990800);
      expect(result.data[1].totalRevenue).toEqual(1548000);
      // first withdrawFundsDate equal today
      expect(result.data[0].withdrawFundsDate).toEqual('2022-08-22T16:00:00.000Z');
      // each subsequent withdrawFundsDate equal startDate subtract 3 day
      expect(result.data[1].withdrawFundsDate).toEqual('2022-11-17T06:00:00.000Z');
    });
  });
});
