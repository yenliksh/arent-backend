import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';

import { longTermRentLandlordCancelationStrategyFactory } from './factories/long-term-rent-cancelation-strategy.factory';

describe('LongTermRentLandlordCancelationStrategy', () => {
  describe('cancelation by admin with valid excuse', () => {
    it('is stay time more than 24 hours with complete transaction', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());

      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
        completeTransactions: [1],
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-21T19:00:00.000Z').toDate());

      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on valid excuse mode

      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-09-21T19:00:00.000Z');
      expect(result.isFine).toEqual(false);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });

    it('is stay time more than 24 hours with cash out waiting transaction', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());

      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-21T19:00:00.000Z').toDate());

      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on valid excuse mode

      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-09-21T19:00:00.000Z');
      expect(result.isFine).toEqual(false);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(5065900);
      expect(result.transferAmountToPlatform).toEqual(188300);
    });

    it('is stay time less than 24 hours passed since arriving', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());

      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T19:00:00.000Z').toDate());

      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on valid excuse mode

      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-09-20T19:00:00.000Z');
      expect(result.isFine).toEqual(false);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(5065900);
      expect(result.transferAmountToPlatform).toEqual(188300);
    });

    it('is not stay time', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());

      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T10:00:00.000Z').toDate());

      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on valid excuse mode

      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-09-20T10:00:00.000Z');
      expect(result.isFine).toEqual(false);

      expect(result.refundsAmountToSender).toEqual(5254200);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });
  });

  describe('cancelation by admin with not valid excuse', () => {
    it('is stay time more than 24 hours', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());
      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 2,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-25T19:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const resultCallback = () => paymentManager.handle();
      expect(resultCallback).toThrowError(IllegalOperationException);
    });
    it('is stay time less than 24 hours', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());
      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T19:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const resultCallback = () => paymentManager.handle();
      expect(resultCallback).toThrowError(IllegalOperationException);
    });
    it('is not stay time less than 24 hours', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());
      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T10:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const resultCallback = () => paymentManager.handle();
      expect(resultCallback).toThrowError(IllegalOperationException);
    });
    it('is not stay time less than 24 hours', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());
      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T10:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.forcedCancelation(); // turn on force cancel
      const result = paymentManager.handle();
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });

    it('is stay time less than 24 hours passed since arriving', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());

      const paymentManager = longTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T19:00:00.000Z').toDate());

      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode

      const resultCallback = () => paymentManager.handle();

      expect(resultCallback).toThrowError(IllegalOperationException);
    });
  });
});
