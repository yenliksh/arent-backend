import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';

import { rentalManagerFactory } from '../../__tests__/factories/rental-manager.factory';

describe('LongTermRentPaymentStrategy', () => {
  describe('generate payment', () => {
    it('should generate properly response data for long term rent payment (1)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2023-09-20T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        RentPeriodStrategyType.LONG_TERM_RENT,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(11);

      expect(result.data[0].totalAmountPayable).toEqual(5400000);
      expect(result.data[10].totalAmountPayable).toEqual(5400000);

      expect(result.data[0].totalAmountToBeTransferred).toEqual(5065900);
      expect(result.data[10].totalAmountToBeTransferred).toEqual(5065900);

      expect(result.data[0].totalRevenue).toEqual(188300);
      expect(result.data[10].totalRevenue).toEqual(188300);

      expect(result.data[0].taxAmount).toEqual(400000);
      expect(result.data[10].taxAmount).toEqual(400000);

      expect(result.data[0].rentDays).toEqual(31);
      expect(result.data[10].rentDays).toEqual(31);

      expect(result.data[0].withdrawFundsDate).toEqual('2022-08-22T16:00:00.000Z');
      expect(result.data[10].withdrawFundsDate).toEqual('2023-08-17T06:00:00.000Z');

      expect(result.data[0].startDate).toEqual('2022-10-20T18:00:00.000Z');
      expect(result.data[10].startDate).toEqual('2023-08-20T18:00:00.000Z');

      expect(result.data[0].endDate).toEqual('2022-11-20T18:00:00.000Z');
      expect(result.data[10].endDate).toEqual('2023-09-20T16:00:00.000Z');
    });
  });

  it('should throw error for amount of rent days greater than 3 month', () => {
    jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

    const paymentManagerCallback = () =>
      rentalManagerFactory(
        {
          arrivalDate: '2022-09-20T01:00:00.000Z',
          departureDate: '2022-12-20T23:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        RentPeriodStrategyType.LONG_TERM_RENT,
      );

    expect(paymentManagerCallback).toThrowError(ArgumentOutOfRangeException);
  });

  describe('generate payment with fine', () => {
    it('should generate totalAmountToBeTransferred less on 20% and totalRevenue greater on 20%', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parse('2022-08-22T16:00:00.000Z').toDate());

      const paymentManager = rentalManagerFactory(
        {
          arrivalDate: '2022-10-20T18:00:00.000Z',
          departureDate: '2023-09-20T16:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
          withFine: true,
        },
        RentPeriodStrategyType.LONG_TERM_RENT,
      );

      const result = paymentManager.generate();

      expect(Array.isArray(result.data)).toEqual(true);
      expect(result.data.length).toEqual(11);

      expect(result.data[0].totalAmountPayable).toEqual(5400000);
      expect(result.data[10].totalAmountPayable).toEqual(5400000);

      expect(result.data[0].totalAmountToBeTransferred).toEqual(4052700);
      expect(result.data[10].totalAmountToBeTransferred).toEqual(4052700);

      expect(result.data[0].totalRevenue).toEqual(1201500);
      expect(result.data[10].totalRevenue).toEqual(1201500);

      expect(result.data[0].rentDays).toEqual(31);
      expect(result.data[10].rentDays).toEqual(31);

      expect(result.data[0].withdrawFundsDate).toEqual('2022-08-22T16:00:00.000Z');
      expect(result.data[10].withdrawFundsDate).toEqual('2023-08-17T06:00:00.000Z');

      expect(result.data[0].startDate).toEqual('2022-10-20T18:00:00.000Z');
      expect(result.data[10].startDate).toEqual('2023-08-20T18:00:00.000Z');

      expect(result.data[0].endDate).toEqual('2022-11-20T18:00:00.000Z');
      expect(result.data[10].endDate).toEqual('2023-09-20T16:00:00.000Z');
    });
  });
});
