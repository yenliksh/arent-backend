import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ApartmentRentPeriodType, MiddleTermRentCancellationPolicyType } from '@infrastructure/enums';
import { DateUtil } from '@libs/utils/date-util';

import { middleTermRentTenantCancelationStrategyFactory } from './factories/middle-term-rent-cancelation-strategy.factory';

describe('MiddleTermRentTenantCancelationStrategy', () => {
  describe('rental cancelation', () => {
    it('there is 2 completed transaction in the contract and the tenant wants to move out before the end of the last month', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-11-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 2,
        completeTransactions: [1],
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-28T19:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-11-15T09:00:00.000Z');

      expect(result.cancelationDate).toEqual('2022-10-28T19:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-11-15T09:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(152330300);
      expect(result.transferAmountToPlatform).toEqual(16582500);
    });

    it('there is 1 completed transaction in the contract and the tenant wants to move out more than 30 days after the paid month', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-11-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-28T19:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-11-15T10:00:00.000Z');

      expect(result.cancelationDate).toEqual('2022-09-28T19:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-11-15T10:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);

      const transaction = result.recomputedLastStayTransaction?.toObject() as unknown as any;

      expect(transaction.rentDays).toEqual(26);
      expect(transaction.totalAmountPayable.cost).toEqual(145600000);
      expect(transaction.totalAmountToBeTransferred.cost).toEqual(127760900);
      expect(transaction.totalRevenue.cost).toEqual(13907900);
      expect(transaction.cost.cost).toEqual(5000000);
      expect(transaction.taxAmount.cost).toEqual(15600000);
      expect(transaction.endDate).toEqual('2022-11-15T10:00:00.000Z');
    });

    it('it is necessary to recalculate the last payment transaction by the date of check-out in case when user wanna departure right after arrival but after several month', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-08T11:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-08T12:00:00.000Z',
          departureDate: '2023-02-08T10:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-08T15:00:00.000Z').toDate());

      const result = paymentManager.handle('2023-02-06T10:00:00.000Z');

      const transaction = result.recomputedLastStayTransaction?.toObject() as unknown as any;

      expect(result.cancelationDate).toEqual('2022-11-08T15:00:00.000Z');
      expect(result.checkOutDate).toEqual('2023-02-06T10:00:00.000Z');
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);

      expect(transaction.rentDays).toEqual(29);
      expect(transaction.totalAmountPayable.cost).toEqual(16240000);
      expect(transaction.totalAmountToBeTransferred.cost).toEqual(14250300);
      expect(transaction.totalRevenue.cost).toEqual(1551200);
      expect(transaction.cost.cost).toEqual(500000);
      expect(transaction.taxAmount.cost).toEqual(1740000);
      expect(transaction.endDate).toEqual('2023-02-06T10:00:00.000Z');
    });

    it('there are 3 transactions in the contract and only 2 are completed, and the tenant wants to move out earlier than 30 days (stage 3.1)', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-12-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 2,
        completeTransactions: [1],
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-17T19:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-12-15T09:00:00.000Z');

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(152833400);
      expect(result.transferAmountToRecipient).toEqual(286438300);
      expect(result.transferAmountToPlatform).toEqual(31181300);
    });

    it('make refund including platform tax if less than 24 hours have passed since the booking (1 stage)', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-12-20T10:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T19:00:00.000Z').toDate());

      const result = paymentManager.handle(DateUtil.utcNow().toISOString());

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(14546400);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(1800000);
    });

    it('make refund by admin excluding platform tax if less than 24 hours have passed since the booking (0 stage)', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-12-20T10:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T15:00:00.000Z').toDate());

      paymentManager.cancelByAdmin();
      const result = paymentManager.handle(DateUtil.utcNow().toISOString());

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(16346400);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });

    it('is not yet stay time but times more than 24 hours have passed since the booking (2 stage)', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-12-20T10:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-03T15:00:00.000Z').toDate());

      const result = paymentManager.handle(DateUtil.utcNow().toISOString());

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(14741700);
      expect(result.transferAmountToPlatform).toEqual(1604700);
    });

    it('should not refund to tenant by reason less than 24 hours have passed since the booking and less than 14 days left before arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-23T14:20:29.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-12-02T02:00:00.000Z',
          departureDate: '2023-02-14T00:00:00.000Z',
          cost: 1100000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-23T14:20:48.000Z').toDate());

      const result = paymentManager.handle(DateUtil.utcNow().toISOString());

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(33512700);
      expect(result.transferAmountToPlatform).toEqual(3648100);
    });

    it('should not refund to tenant by reason less than 24 hours have passed since the booking and less than 14 days left before arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-29T14:21:29.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-12-06T02:00:00.000Z',
          departureDate: '2023-02-07T00:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-29T12:15:00.000Z').toDate());

      const result = paymentManager.handle(DateUtil.utcNow().toISOString());

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(30466100);
      expect(result.transferAmountToPlatform).toEqual(3316500);
    });

    it('it is necessary to compute the cost of withdrawal from tenant according to the 30-day rules. Case - less than 24h have passed since arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-12-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-20T17:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-10-15T09:00:00.000Z');

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(1166700);
      expect(result.transferAmountToRecipient).toEqual(148440300);
      expect(result.transferAmountToPlatform).toEqual(16158900);
    });

    it('it is necessary to compute the cost of withdrawal from tenant according to the 30-day rules. Case - more than 24h have passed since arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2022-12-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-21T13:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-10-15T09:00:00.000Z');

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(5833400);
      expect(result.transferAmountToRecipient).toEqual(152535200);
      expect(result.transferAmountToPlatform).toEqual(16604700);
    });

    it('must recompute future transaction by reason cancelation more tha 30 days rule', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = middleTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-28T02:00:00.000Z',
          departureDate: '2023-02-25T00:00:00.000Z',
          cost: 1000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T09:26:00.000Z').toDate());

      const result = paymentManager.handle('2022-12-31T00:00:00.000Z');

      expect(result.cancelationPolicyType).toEqual(MiddleTermRentCancellationPolicyType.DEFAULT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.MIDDLE_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);

      const transaction = result.recomputedLastStayTransaction?.toObject() as unknown as any;

      expect(transaction.rentDays).toEqual(3);
      expect(transaction.totalAmountPayable.cost).toEqual(3360000);
      expect(transaction.totalAmountToBeTransferred.cost).toEqual(2948400);
      expect(transaction.totalRevenue.cost).toEqual(320900);
      expect(transaction.cost.cost).toEqual(1000000);
      expect(transaction.taxAmount.cost).toEqual(360000);
      expect(transaction.endDate).toEqual('2022-12-31T00:00:00.000Z');
    });
  });
});
