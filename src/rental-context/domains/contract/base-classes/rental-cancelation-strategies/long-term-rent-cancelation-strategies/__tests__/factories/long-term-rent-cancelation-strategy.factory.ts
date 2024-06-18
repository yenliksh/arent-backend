import {
  IContractCreateProps,
  contractRentalStrategyFactory,
} from '@domains/contract/base-classes/rental-strategies/__tests__/factories/contract-rental-strategy.factory';
import { CardMeta } from '@domains/payment-transaction/domain/types';
import { PaymentMethod } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { LongTermRentLandlordCancelationStrategy } from '../../long-term-rent-landlord-cancelation.strategy';
import { LongTermRentTenantCancelationStrategy } from '../../long-term-rent-tenant-cancelation.strategy';

type CashOutWaitingLongTermRentTransactionsAmount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const longTermRentTenantCancelationStrategyFactory = ({
  contractCreateProps,
  cashOutWaitingTransactionsAmount,
  completeTransactions,
}: {
  contractCreateProps: IContractCreateProps;
  cashOutWaitingTransactionsAmount?: CashOutWaitingLongTermRentTransactionsAmount;
  completeTransactions?: number[];
}) => {
  const contract = contractRentalStrategyFactory(contractCreateProps);

  contract.setOffer({
    allowedToHangingOut: true,
    allowedToSmoke: true,
    allowedWithChildren: true,
    allowedWithPets: true,
  });

  const transactions = contract.acceptOffer(UUID.generate());

  const cardMeta: CardMeta = {
    id: '0a991c03-1666-4dc3-b50a-7f1b699915f6',
    paymentMethod: PaymentMethod.INNOPAY,
    cardType: 'VISA',
    panMasked: '1234',
    cardHolder: 'Roy Johnson',
  };

  if (cashOutWaitingTransactionsAmount != null) {
    transactions.forEach((t, i) =>
      i + 1 <= cashOutWaitingTransactionsAmount
        ? t.cashInSuccess(cardMeta, { customerReference: '674108327830' })
        : null,
    );
  }

  if (completeTransactions != null) {
    transactions.forEach((t, i) =>
      completeTransactions.includes(i + 1) ? t.cashOutSuccess(cardMeta, { customerReference: '674108327830' }) : null,
    );
  }

  const longTermRentCancelationStrategy = new LongTermRentTenantCancelationStrategy(contract, transactions);

  return longTermRentCancelationStrategy;
};

export const longTermRentLandlordCancelationStrategyFactory = ({
  contractCreateProps,
  cashOutWaitingTransactionsAmount,
  completeTransactions,
}: {
  contractCreateProps: IContractCreateProps;
  cashOutWaitingTransactionsAmount?: CashOutWaitingLongTermRentTransactionsAmount;
  completeTransactions?: number[];
}) => {
  const contract = contractRentalStrategyFactory(contractCreateProps);

  contract.setOffer({
    allowedToHangingOut: true,
    allowedToSmoke: true,
    allowedWithChildren: true,
    allowedWithPets: true,
  });

  const transactions = contract.acceptOffer(UUID.generate());

  const cardMeta: CardMeta = {
    id: '0a991c03-1666-4dc3-b50a-7f1b699915f6',
    paymentMethod: PaymentMethod.INNOPAY,
    cardType: 'VISA',
    panMasked: '1234',
    cardHolder: 'Roy Johnson',
  };

  if (cashOutWaitingTransactionsAmount != null) {
    transactions.forEach((t, i) =>
      i + 1 <= cashOutWaitingTransactionsAmount
        ? t.cashInSuccess(cardMeta, { customerReference: '674108327830' })
        : null,
    );
  }

  if (completeTransactions != null) {
    transactions.forEach((t, i) =>
      completeTransactions.includes(i + 1) ? t.cashOutSuccess(cardMeta, { customerReference: '674108327830' }) : null,
    );
  }

  const longTermRentCancelationStrategy = new LongTermRentLandlordCancelationStrategy(contract, transactions);

  return longTermRentCancelationStrategy;
};
