import { costCeil, costFloor } from '@domains/contract/base-classes/rental-strategies/utils/cost-rounds.util';
import { ApartmentRentPeriodType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { DateUtil } from '@libs/utils/date-util';
import {
  INNOPAY_CASH_IN_TAX_RATE,
  INNOPAY_CASH_OUT_TAX_RATE,
  LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE,
  LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE,
} from 'src/rental-context/constants';

import { shortTermRentTenantCancelationStrategyFactory } from './factories/short-term-rent-cancelation-strategy.factory';

describe('ShortTermRentTenantCancelationStrategy', () => {
  describe('rental cancelation with diff policy', () => {
    it('FLEXIBLE should generate full refund amount with subtract livin tax and innopay tax', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.FLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      const rentDays = 5;
      const costPerDay = 5000000;
      const senderTaxRate = LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
      const recipientTaxRate = LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;

      const totalCost = rentDays * costPerDay;

      const senderTaxAmount = costFloor(totalCost * senderTaxRate);
      const recipientTaxAmount = costFloor(totalCost * recipientTaxRate);

      const totalAmountPayable = costPerDay * rentDays + senderTaxAmount;

      const refundsAmount = totalAmountPayable - senderTaxAmount - totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE; // 24244000

      const totalAmountToBeTransferred = 0;
      const cacheInTax = costCeil((totalCost + senderTaxAmount) * INNOPAY_CASH_IN_TAX_RATE);

      const totalRevenue =
        (totalAmountToBeTransferred <= 0 ? 0 : recipientTaxAmount) +
        senderTaxAmount -
        (refundsAmount ? 0 : cacheInTax) -
        (totalAmountToBeTransferred <= 0 ? 0 : (totalCost - recipientTaxAmount) * INNOPAY_CASH_OUT_TAX_RATE); // 3000000 доход

      expect(result.cancelationDate).toEqual('2022-09-19T15:54:00.000Z');
      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.FLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(refundsAmount);
      expect(result.transferAmountToRecipient).toEqual(totalAmountToBeTransferred);
      expect(result.transferAmountToPlatform).toEqual(totalRevenue);
    });

    it('FLEXIBLE should generate refunds amount 0 for reason left less than 24 h for arrival', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-19T16:00:01.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.FLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      const rentDays = 5;
      const costPerDay = 5000000;
      const senderTaxRate = LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
      const recipientTaxRate = LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;

      const totalCost = rentDays * costPerDay;

      const senderTaxAmount = totalCost * senderTaxRate;
      const recipientTaxAmount = totalCost * recipientTaxRate;

      const refundsAmount = 0;

      const cacheInTax = (totalCost + senderTaxAmount) * INNOPAY_CASH_IN_TAX_RATE;

      const compensationCashOutToRecipient =
        ((totalCost - recipientTaxAmount) * INNOPAY_CASH_OUT_TAX_RATE) / (1 - INNOPAY_CASH_OUT_TAX_RATE);

      const totalAmountToBeTransferred = totalCost - recipientTaxAmount + compensationCashOutToRecipient;

      const totalRevenue =
        (totalAmountToBeTransferred <= 0 ? 0 : recipientTaxAmount) +
        senderTaxAmount -
        cacheInTax -
        (totalAmountToBeTransferred <= 0 ? 0 : compensationCashOutToRecipient); // 3000000 доход

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.FLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(costCeil(refundsAmount));
      expect(result.transferAmountToRecipient).toEqual(costCeil(totalAmountToBeTransferred));
      expect(result.transferAmountToPlatform).toEqual(costFloor(totalRevenue));
    });

    it('FLEXIBLE should generate 0 refund amount for the reason that the tenant already lives in the apartment', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-20T16:00:01.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.FLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.FLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(24569500);
      expect(result.transferAmountToPlatform).toEqual(2674500);
    });

    it('MODERATE should generate full refund amount with subtract livin tax and innopay tax', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-15T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 600000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.MODERATE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      const rentDays = 5;
      const costPerDay = 600000;
      const senderTaxRate = LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
      // const recipientTaxRate = LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;

      const totalCost = rentDays * costPerDay;
      const senderTaxAmount = costFloor(totalCost * senderTaxRate);

      const refundsAmountToSender = costCeil(totalCost - (totalCost + senderTaxAmount) * INNOPAY_CASH_IN_TAX_RATE); // 2909280 изначально -> 2909300 после округления

      const transferAmountToPlatform =
        senderTaxAmount - (refundsAmountToSender ? 0 : (totalCost + senderTaxAmount) * INNOPAY_CASH_IN_TAX_RATE); // 269280 доход

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.MODERATE);
      expect(result.refundsAmountToSender).toEqual(refundsAmountToSender);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(transferAmountToPlatform);
    });

    it('MODERATE should generate 50% refund amount with subtract livin tax and innopay tax', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-15T16:00:01.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 600000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.MODERATE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.MODERATE);
      expect(result.refundsAmountToSender).toEqual(1454700);
      expect(result.transferAmountToRecipient).toEqual(1474200);
      expect(result.transferAmountToPlatform).toEqual(430800);
    });

    it('MODERATE should generate 0 refund amount for the reason that the tenant already lives in the apartment', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-20T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 600000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.MODERATE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.MODERATE);
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(2948400);
      expect(result.transferAmountToPlatform).toEqual(320900);
    });

    it('INFLEXIBLE should generate full refund with subtract livin tax and innopay tax amount for the reason more than 30 days left before arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-10T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.INFLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set now
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-11T19:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.INFLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(2424400);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(300000);
    });

    it('INFLEXIBLE should generate full refund amount with subtract livin tax and innopay tax for the reason time passed since booking less than 48h and days more than 14', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-01T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.INFLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set now
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-02T19:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.INFLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(2424400);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(300000);
    });

    it('INFLEXIBLE should generate 50% refund amount for the reason less than 30 days but more than 7 days left before arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-01T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.INFLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set now
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-03T19:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.INFLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(1212200);
      expect(result.transferAmountToRecipient).toEqual(1228500);
      expect(result.transferAmountToPlatform).toEqual(359000);
    });

    it('INFLEXIBLE should generate 0 refund amount for the reason less than 30 days but more than 7 days left before arrival', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-01T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.INFLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set now
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-26T19:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.INFLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(2457000);
      expect(result.transferAmountToPlatform).toEqual(267400);
    });

    it('STRICT should generate full refund amount with subtract livin tax and innopay tax for the reason time passed since booking less than 48h and days more than 14', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-01T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.MODERATE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set now
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-02T20:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.MODERATE);
      expect(result.refundsAmountToSender).toEqual(2424400);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(300000);
    });

    it('STRICT should generate 50% refund amount for the reason time passed since booking more than 48h and days for arrival more than 7', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-01T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.STRICT,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set now
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-04T20:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.STRICT);
      expect(result.refundsAmountToSender).toEqual(1212200);
      expect(result.transferAmountToRecipient).toEqual(1228500);
      expect(result.transferAmountToPlatform).toEqual(359000);
    });

    it('STRICT should generate 0 refund amount for the reason days for arrival less than 7', () => {
      // set booking date
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-01T16:00:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 500000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.STRICT,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      // set now
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-16T20:00:00.000Z').toDate());

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.STRICT);
      expect(result.refundsAmountToSender).toEqual(0);
      expect(result.transferAmountToRecipient).toEqual(2457000);
      expect(result.transferAmountToPlatform).toEqual(267400);
    });

    it('FLEXIBLE should generate full refund amount', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-09-19T15:54:00.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.FLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      expect(result.cancelationDate).toEqual('2022-09-19T15:54:00.000Z');
      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.FLEXIBLE);
      // 5000000 * 5 + tax = 28000000 - livinTax - cacheIn tax
      expect(result.refundsAmountToSender).toEqual(24244000);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(3000000);
    });

    it('FLEXIBLE should cancel by admin without innopay tax money', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-19T14:00:01.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.FLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      paymentManager.cancelByAdmin();

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.FLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(27244000);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(0);
    });

    it('FLEXIBLE should cancel by self with innopay tax money', () => {
      jest.useFakeTimers().setSystemTime(DateUtil.parseUTC('2022-10-19T14:00:01.000Z').toDate());

      const paymentManager = shortTermRentTenantCancelationStrategyFactory({
        contractCreateProps: {
          arrivalDate: '2022-10-20T16:00:00.000Z',
          departureDate: '2022-10-25T14:00:00.000Z',
          cost: 5000000,
          rentType: ApartmentRentPeriodType.SHORT_TERM,
          shortTermRentCancelationPolicyType: ShortTermRentCancellationPolicyType.FLEXIBLE,
        },
        cashOutWaitingTransactionsAmount: 1,
      });

      const result = paymentManager.handle();

      expect(result.cancelationPolicyType).toEqual(ShortTermRentCancellationPolicyType.FLEXIBLE);
      expect(result.refundsAmountToSender).toEqual(24244000);
      expect(result.transferAmountToRecipient).toEqual(0);
      expect(result.transferAmountToPlatform).toEqual(3000000);
    });
  });
});
