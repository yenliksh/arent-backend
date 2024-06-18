import {
  IContractCreateProps,
  contractRentalStrategyFactory,
} from '@domains/contract/base-classes/rental-strategies/__tests__/factories/contract-rental-strategy.factory';
import { CardMeta } from '@domains/payment-transaction/domain/types';
import { PaymentMethod } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { ShortTermRentLandlordCancelationStrategy } from '../../short-term-rent-landlord-cancelation.strategy';
import { ShortTermRentTenantCancelationStrategy } from '../../short-term-rent-tenant-cancelation.strategy';

type CashOutWaitingMiddleTermRentTransactionsAmount = 1 | 2;

export const shortTermRentTenantCancelationStrategyFactory = ({
  contractCreateProps,
  cashOutWaitingTransactionsAmount,
  completeTransactions,
}: {
  contractCreateProps: IContractCreateProps;
  cashOutWaitingTransactionsAmount?: CashOutWaitingMiddleTermRentTransactionsAmount;
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

  const shortTermRentCancelationStrategy = new ShortTermRentTenantCancelationStrategy(contract, transactions);

  return shortTermRentCancelationStrategy;
};

export const shortTermRentLandlordCancelationStrategyFactory = ({
  contractCreateProps,
  cashOutWaitingTransactionsAmount,
  completeTransactions,
}: {
  contractCreateProps: IContractCreateProps;
  cashOutWaitingTransactionsAmount?: CashOutWaitingMiddleTermRentTransactionsAmount;
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

  const shortTermRentCancelationStrategy = new ShortTermRentLandlordCancelationStrategy(contract, transactions);

  return shortTermRentCancelationStrategy;
};
