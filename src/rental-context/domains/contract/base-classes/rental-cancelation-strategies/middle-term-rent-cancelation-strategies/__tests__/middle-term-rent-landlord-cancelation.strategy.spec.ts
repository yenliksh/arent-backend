import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';

import { middleTermRentLandlordCancelationStrategyFactory } from './factories/middle-term-rent-cancelation-strategy.factory';

describe('MiddleTermRentLandlordCancelationStrategy', () => {
  describe('more than 24 hours left before arrival', () => {
    it('refund to tenant with livin tax (valid excuse, 1 cash-out-waiting)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T18:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-11-28T18:00:00.000Z');
      expect(result.isFine).toEqual(false);
      expect(result.refundsAmountToSender).toEqual(32692800);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });

    it('refund to tenant with livin tax, set fine (invalid excuse, 1 cash-out-waiting)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T18:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-11-28T18:00:00.000Z');
      expect(result.isFine).toEqual(true);
      expect(result.refundsAmountToSender).toEqual(32692800);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });
  });

  describe('less than 24 hours left before arrival', () => {
    it('refund to tenant without livin tax and innopay tax, refund to platform tenant tax (valid excuse, 1 cash-out-waiting)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-30T04:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-11-30T04:00:00.000Z');
      expect(result.isFine).toEqual(false);
      expect(result.refundsAmountToSender).toEqual(29092800);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(4507200);
    });

    it('refund to tenant with livin tax (invalid excuse, 1 cash-out-waiting)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-30T04:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-11-30T04:00:00.000Z');
      expect(result.isFine).toEqual(true);
      expect(result.refundsAmountToSender).toEqual(32692800);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });
  });

  describe('within 24 hours of stay', () => {
    it('refund to tenant by unused hours, transferring money to livin and the landlord for the hours lived (valid excuse, 1 cash-out-waiting)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-12-01T06:59:59.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-12-01T06:59:59.000Z');
      expect(result.isFine).toEqual(false);
      expect(result.refundsAmountToSender).toEqual(31585700);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(982800);
      expect(result.transferAmountToPlatform).toEqual(123600);
    });

    it('refund to tenant by unused hours, transferring money to livin and the landlord for the hours lived, set fine (invalid excuse, 1 cash-out-waiting)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-12-01T06:59:59.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-12-01T06:59:59.000Z');
      expect(result.isFine).toEqual(true);
      expect(result.refundsAmountToSender).toEqual(31585700);
      expect(result.withdrawalAmountFromRecipient).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(982800);
      expect(result.transferAmountToPlatform).toEqual(123600);
    });

    it('return the error by reason that the arrival time less than 24 hours and money not on sub-account', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
        completeTransactions: [1],
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-12-01T06:59:59.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const result = () => paymentManager.handle();

      expect(result).toThrowError(IllegalOperationException);
    });
  });

  describe('while living (after 24 hours of stay)', () => {
    it('refund to tenant by unused hours, set withdrawalAmountFromRecipient (valid excuse, 1 completed)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
        completeTransactions: [1],
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-12-01T07:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-12-01T07:00:00.000Z');
      expect(result.isFine).toEqual(false);
      expect(result.refundsAmountToSender).toEqual(31585600);
      expect(result.withdrawalAmountFromRecipient).toEqual(29000000);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(123600);
    });

    it('refund to tenant by unused hours, set withdrawalAmountFromRecipient (valid excuse, 1 cash-out-waiting)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-12-01T07:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      paymentManager.validExcuse(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-12-01T07:00:00.000Z');
      expect(result.isFine).toEqual(false);
      expect(result.refundsAmountToSender).toEqual(31585600);
      expect(result.withdrawalAmountFromRecipient).toEqual(29000000);
      expect(result.transferAmountToRecipient).toEqual(29483300);
      expect(result.transferAmountToPlatform).toEqual(3333100);
    });

    it('refund to tenant by unused hours, set withdrawalAmountFromRecipient, set fine (invalid excuse, 1 completed)', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T15:54:00.000Z').toDate());
      const paymentManager = middleTermRentLandlordCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-30T07:00:00.000Z',
          departureDate: '2023-01-03T05:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
        completeTransactions: [1],
      });
      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-12-01T07:00:00.000Z').toDate());
      paymentManager.cancelByAdmin(); // turn on cancelation by admin mode
      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-12-01T07:00:00.000Z');
      expect(result.isFine).toEqual(true);
      expect(result.refundsAmountToSender).toEqual(31585600);
      expect(result.withdrawalAmountFromRecipient).toEqual(29000000);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(123600);
    });
  });
});
