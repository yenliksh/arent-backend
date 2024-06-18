import { CardRegistrationStatus } from '../sdk/innopay-api.types';

export type InnopayStartSaveCard = {
  redirectURL: string;
  userId: number;
};

export type InnopayEndSaveCard = {
  // GetCardStatusRes sdk type
  cardHolder: string;
  cardId: number;
  panMasked: string;
  status: CardRegistrationStatus;
  uniqueCardId: number;
  userId: number;
  userLogin?: string;
  // GetPaymentStatusRes sdk type
  // additionalInformation: Record<string, string>;
  // amountRequested: number;
  // sinkNode: string;
  cardType: string;
};

export type InnopayStartCashOut = {
  customerReference: string;
};

export type InnopayPayCardInfo = {
  cardId: string;
  userId: string;
};
