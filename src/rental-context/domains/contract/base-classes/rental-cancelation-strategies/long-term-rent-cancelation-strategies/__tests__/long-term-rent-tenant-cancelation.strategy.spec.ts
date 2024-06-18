import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { costCeil } from '@domains/contract/base-classes/rental-strategies/utils/cost-rounds.util';
import { ApartmentRentPeriodType, LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { DateUtil } from '@libs/utils/date-util';

import { longTermRentTenantCancelationStrategyFactory } from './factories/long-term-rent-cancelation-strategy.factory';

describe('LongTermRentTenantCancelationStrategy', () => {
  describe('rental cancelation', () => {
    it('it is necessary to compute the cost of withdrawal from tenant according to the 30-day rules. Case - less than 24h have passed since arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-01T10:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-28T08:00:00.000Z',
          departureDate: '2023-10-28T06:00:00.000Z',
          cost: 6400000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-28T09:39:25.000Z').toDate());

      const result = paymentManager.handle('2022-12-15T06:00:00.000Z');

      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(19200);
      expect(result.transferAmountToRecipient).toEqual(6502400);
      expect(result.transferAmountToPlatform).toEqual(241600);
    });

    it('must make a refund if less than 24 hours have passed since the booking', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T19:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-09-01T19:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-09-01T19:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(LongTermRentCancellationPolicyType.FORFEIT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);
      // for one month 5400000 with tax
      const cost = 5000000; // цена за месяц
      const livinRate = 0.08; // комиссия ливина
      const cashInTaxRate = 0.027; // комиссия инопэя
      const livinTax = cost * livinRate; // процент который оставляем ливину
      const totalAmountForOneMonthWithdrawn = cost + livinTax; // 5400000 полная сумма которая была списана с тенанта с учетом комиссии
      const cashInTax = totalAmountForOneMonthWithdrawn * cashInTaxRate; // процент который инопэй оставил себе

      expect(result.refundsAmountToSender).toEqual(totalAmountForOneMonthWithdrawn - livinTax - cashInTax); // 4854200
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(livinTax);
    });

    it('refund is required if more than 30 days left before arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-07-01T10:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-07-04T19:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-07-04T19:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-07-04T19:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(LongTermRentCancellationPolicyType.FORFEIT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);
      // for one month 5400000 with tax
      const cost = 5000000; // цена за месяц
      const livinRate = 0.08; // комиссия ливина
      const cashInTaxRate = 0.027; // комиссия инопэя
      const livinTax = cost * livinRate; // процент который оставляем ливину
      const totalAmountForOneMonthWithdrawn = cost + livinTax; // 5400000 полная сумма которая была списана с тенанта с учетом комиссии
      const cashInTax = totalAmountForOneMonthWithdrawn * cashInTaxRate; // процент который инопэй оставил себе

      expect(result.refundsAmountToSender).toEqual(totalAmountForOneMonthWithdrawn - livinTax - cashInTax); // 4854200
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(livinTax);
    });

    // TODO: need to recompute
    it('must make a partial refund and partial withdrawal under the 30 day rules if the time of stay has not become yet', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-10T12:00:00.000Z').toDate());

      const result = paymentManager.handle();

      const cost = 5000000; // цена за месяц

      const cashInTaxRate = 0.027; // комиссия инопэя
      const livinRate = 0.08; // комиссия ливина

      const livinTax = cost * livinRate; // процент который оставляем ливину

      const totalAmountForOneMonthWithdrawn = cost + livinTax; // 5400000 полная сумма которая была списана с тенанта с учетом комиссии

      const cashInTax = totalAmountForOneMonthWithdrawn * cashInTaxRate; // процент который инопэй оставил себе

      const totalAmountForOneMonthWithTax = totalAmountForOneMonthWithdrawn - livinTax - cashInTax; // остаток для возврата

      const timesBeforeFirstArrival = DateUtil.getDiffHours('2022-09-10T12:00:00.000Z', '2022-09-20T12:00:00.000Z'); // дней осталось до заезда
      const stayingTimeInHours = DateUtil.getDiffHours('2022-09-20T12:00:00.000Z', '2022-10-20T12:00:00.000Z'); // дней проживания за первый месяц в часах

      const refundsAmount = costCeil((timesBeforeFirstArrival * totalAmountForOneMonthWithTax) / stayingTimeInHours); // срабатывают правила отмены 30 дней т.е 7 дней до заезды вычитаем из 1 месяц первого проживания и возвращаем тенанту за 7 дней
      const transferAmountToRecipient = totalAmountForOneMonthWithTax - refundsAmount; // переводим лендлорду остальные деньги за 1 месяц - 7 дней компенсацию на поиск нового тенанта

      expect(result.cancelationDate).toEqual('2022-09-10T12:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-09-10T12:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(LongTermRentCancellationPolicyType.FORFEIT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(refundsAmount);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(transferAmountToRecipient);
      expect(result.transferAmountToPlatform).toEqual(livinTax);
    });

    it('it is necessary to compute the cost of withdrawal according to the 30-day rules. Case - more than 24h have passed since arrival. Completed last transaction', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
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
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-25T09:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-09-28T09:00:00.000Z');

      expect(result.cancelationDate).toEqual('2022-09-25T09:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-09-28T09:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(LongTermRentCancellationPolicyType.FORFEIT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(877500);
      expect(result.transferAmountToRecipient).toEqual(823300);
      expect(result.transferAmountToPlatform).toEqual(30600);
    });

    it('it is necessary to compute the cost of withdrawal according to the 30-day rules. Case - more than 24h have passed since arrival. Cash out waiting for last transaction', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-25T09:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-09-28T09:00:00.000Z');

      expect(result.cancelationDate).toEqual('2022-09-25T09:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-09-28T09:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(LongTermRentCancellationPolicyType.FORFEIT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(877500);
      expect(result.transferAmountToRecipient).toEqual(5889200);
      expect(result.transferAmountToPlatform).toEqual(218900);
    });

    it('it is necessary to recalculate the last payment transaction by the date of check-out in case when user wanna departure after the several months', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-01T10:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-09-20T12:00:00.000Z',
          departureDate: '2023-08-20T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-25T09:00:00.000Z').toDate());

      const result = paymentManager.handle('2022-11-02T10:00:00.000Z');

      expect(result.cancelationDate).toEqual('2022-09-25T09:00:00.000Z');
      expect(result.checkOutDate).toEqual('2022-11-02T10:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(LongTermRentCancellationPolicyType.FORFEIT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);

      const transaction = result.recomputedLastStayTransaction?.toObject() as unknown as any;

      expect(transaction.rentDays).toEqual(13);
      expect(transaction.totalAmountPayable.cost).toEqual(2264600);
      expect(transaction.cost.cost).toEqual(5000000);
      expect(transaction.taxAmount.cost).toEqual(167800);
      expect(transaction.endDate).toEqual('2022-11-02T10:00:00.000Z');
    });

    it('it is necessary to recalculate the last payment transaction by the date of check-out in case when user wanna departure right after arrival but after several month', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-08T11:00:00.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-11-08T12:00:00.000Z',
          departureDate: '2023-10-08T10:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set cancelation date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-11-08T15:00:00.000Z').toDate());

      // const result = paymentManager.handle('2022-11-20T10:00:00.000Z');
      const result = paymentManager.handle('2023-02-26T10:00:00.000Z');

      const transaction = result.recomputedLastStayTransaction?.toObject() as unknown as any;

      expect(result.cancelationDate).toEqual('2022-11-08T15:00:00.000Z');
      expect(result.checkOutDate).toEqual('2023-02-26T10:00:00.000Z');
      expect(result.cancelationPolicyType).toEqual(LongTermRentCancellationPolicyType.FORFEIT);
      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);

      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);

      expect(transaction.rentDays).toEqual(18);
      expect(transaction.totalAmountPayable.cost).toEqual(3471500);
      expect(transaction.cost.cost).toEqual(5000000);
      expect(transaction.taxAmount.cost).toEqual(257200);
      expect(transaction.endDate).toEqual('2023-02-26T10:00:00.000Z');
    });

    it('should cancel by admin without innopay tax money', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-19T14:00:01.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2023-09-20T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      paymentManager.cancelByAdmin();

      const result = paymentManager.handle();

      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);
      expect(result.refundsAmountToSender).toEqual(5254200);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });

    it('should cancel by self with innopay tax money', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-19T14:00:01.000Z').toDate());

      const paymentManager = longTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2023-09-20T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.LONG_TERM,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      expect(result.strategyType).toEqual(RentPeriodStrategyType.LONG_TERM_RENT);
      expect(result.refundsAmountToSender).toEqual(4854200);
      expect(result.withdrawalAmountFromSender).toEqual(undefined);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(400000);
    });
  });
});
