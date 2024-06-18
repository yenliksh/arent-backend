export enum ContractBulls {
  CONTRACT_OFFER_QUEUE = 'CONTRACT_OFFER_QUEUE',
}

export enum ContractOfferProcess {
  SEND = 'SEND_CONTRACT_OFFER_PROCESS',
  ACCEPT = 'ACCEPT_CONTRACT_OFFER_PROCESS',
  REJECT = 'REJECT_CONTRACT_OFFER_PROCESS',
  INSTANT_BOOKING = 'INSTANT_BOOKING_PROCESS',
  INSTANT_TEMPORARY_BOOKING = 'INSTANT_TEMPORARY_BOOKING',
  TEMPORARY_CONCLUDE = 'TEMPORARY_CONCLUDE',
}

export interface InstantBookingJobPayload {
  contractId: string;
}

export interface SendContractOfferJobPayload {
  chatId: string;
  landlordId: string;
  allowedWithPets: boolean;
  allowedWithChildren: boolean;
  allowedToSmoke: boolean;
  allowedToHangingOut: boolean;
}

export interface AcceptContractOfferJobPayload {
  chatId: string;
  tenantId: string;
  cardId: string;
}

export interface RejectContractOfferJobPayload {
  chatId: string;
  userId: string;
  rejectTrigger: RejectTrigger;
}

export interface TemporaryConcludeJobPayload {
  chatId: string;
  tenantId: string;
}

export interface TemporaryInstantBookingJobPayload {
  contractId: string;
}

export enum RejectTrigger {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}

export enum ContractExceptions {
  CONTRACT_NOT_FOUND = 'CONTRACT_NOT_FOUND',
  CONTRACT_NOT_PENDING = 'CONTRACT_NOT_PENDING',
  APARTMENT_IS_NOT_FREE = 'APARTMENT_IS_NOT_FREE',
  CHAT_NOT_FOUND = 'CHAT_NOT_FOUND',
  CHAT_MEMBER_REQUIRED = 'CHAT_MEMBER_REQUIRED',
  APARTMENT_AD_NOT_FOUND = 'APARTMENT_AD_NOT_FOUND',
  ARRIVAL_AND_DEPARTURE_DATES_REQUIRED = 'ARRIVAL_AND_DEPARTURE_DATES_REQUIRED',
  INNOPAY_CARD_NOT_FOUND = 'INNOPAY_CARD_NOT_FOUND',
  INVALID_ARGUMENTS_FOR_RENT_PERIOD_TYPE = 'INVALID_ARGUMENTS_FOR_RENT_PERIOD_TYPE',
  CONTRACT_REQUEST_NOT_FOUND = 'CONTRACT_REQUEST_NOT_FOUND',
  LANDLORD_NOT_FOUND = 'LANDLORD_NOT_FOUND',
}
