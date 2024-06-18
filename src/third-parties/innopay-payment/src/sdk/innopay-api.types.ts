export const InnopayDateTimeFormat = 'DD.MM.YYYY HH:mm:ss';

type BaseCardReq = {
  userId: number;
  cardId: number;
};

export enum CashOutTransactionStatus {
  NO_SUCH_TRANSACTION = 'NO_SUCH_TRANSACTION',
  PENDING_CUSTOMER_INPUT = 'PENDING_CUSTOMER_INPUT',
  PENDING_APPROVEMENT = 'PENDING_APPROVEMENT',
  PROCESSED = 'PROCESSED',
  DECLINED = 'DECLINED',
  REVERSED = 'REVERSED',
  INVALID_MID = 'INVALID_MID',
  MID_DISABLED = 'MID_DISABLED',
}

export enum CashInTransactionStatus {
  NO_SUCH_TRANSACTION = 'NO_SUCH_TRANSACTION',
  DECLINED = 'DECLINED',
  REVERSED = 'REVERSED',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  PENDING_CUSTOMER_INPUT = 'PENDING_CUSTOMER_INPUT',
  PENDING_AUTH_RESULT = 'PENDING_AUTH_RESULT',
  AUTHORISED = 'AUTHORISED',
  INVALID_MID = 'INVALID_MID',
  MID_DISABLED = 'MID_DISABLED',
}

export enum CardRegistrationStatus {
  REGISTERED = 'REGISTERED',
  UNCOMPLETED = 'UNCOMPLETED',
  NOT_FOUND = 'NOT_FOUND',
}

export type StartCardRegistrationReq = {
  userLogin: string;
  userId?: number;
  returningUrl: string;
  currencyCode?: number; // TODO: change to enum
  languageCode?: string; // TODO: change to enum
};

export type StartCardRegistrationRes = {
  success: boolean;
  redirectURL?: string;
  userId?: number;
  errorCode?: string;
  errorDescription?: string;
};

export type GetPaymentStatusReq = {
  userId: number;
  customerReference: string;
};

export type GetPaymentStatusRes = {
  additionalInformation: Record<string, string>;
  amountRequested: number;
  sinkNode: string;
  cardType: string;
};

export type CompleteCardRegistrationReq = BaseCardReq & {
  testAmount: number;
};

export type CompleteCardRegistrationRes = boolean;

export type GetCardStatusReq = BaseCardReq;

export type GetCardStatusRes = {
  cardHolder?: string;
  cardId: number;
  panMasked?: string;
  status?: CardRegistrationStatus;
  uniqueCardId: number;
  userId: number;
  userLogin?: string;
};

export type DeleteCardRegistrationReq = BaseCardReq;

export type DeleteCardRegistrationRes = boolean;

export type PayReq = BaseCardReq & {
  userLogin: string;
  currencyCode?: number; // TODO: change to enum
  languageCode?: string; // TODO: change to enum
  amount: number;
  paymentTarget: string;
};

export type PayRes = {
  customerReference?: string;
  errorDescription?: string;
  rspCode?: string;
  success: boolean;
};

export type CompletePaymentReq = {
  customerReference: string;
  transactionSuccess: boolean;
};

export type CompletePaymentRes = boolean;

export type StartCashOutToRegisteredCardReq = {
  tranAmount: number;
  currencyCode?: number; // TODO: change to enum
  languageCode?: string; // TODO: change to enum
  senderName: string;
  returnURL?: string;
  merchantLocalDateTime: string; // format: InnopayDateTimeFormat
  additionalInformationList: {
    USER_ID: number;
    CARD_ID: number;
    USER_LOGIN?: string;
    RECEIVER_CARD_ID: number;
    RECEIVER_USER_ID: number;
  };
};

export type StartCashOutToRegisteredCardRes = {
  customerReference?: string;
  errorDescription?: string;
  rspCode?: string;
  success: boolean;
};

export type GetCashOutTransactionStatusReq = {
  referenceNr: string;
};

export type CashOutTransactionStatusRes = {
  additionalInformation?: Record<string, string>;
  altCardIssuerCountry?: unknown;
  altMaskedCardNumber?: unknown;
  amount?: number;
  authCode?: unknown;
  cardIssuerCountry?: string;
  errorDescription?: string;
  fee?: unknown;
  maskedCardNumber?: string;
  merchantLocalDateTime?: string; // format: InnopayDateTimeFormat
  merchantOnlineAddress?: string;
  receiverEmail?: string;
  receiverName?: string;
  receiverPhone?: string;
  rspCode?: string;
  senderEmail?: string;
  senderName?: string;
  senderPhone?: string;
  success: boolean;
  transactionCurrencyCode?: number; // TODO: change to enum
  transactionStatus?: CashOutTransactionStatus;
  userIpAddress?: string;
  verified3D?: boolean;
};

export type CompleteCashOutTransactionReq = {
  referenceNr: string;
  transactionSuccess: boolean;
  overrideAmount?: number;
};

export type StartTransactionReq = {
  customerReference?: string;
  totalAmount: number;
  returnURL: string;
  currencyCode?: number; // TODO: change to enum
  languageCode?: string; // TODO: change to enum
  description?: string;
  merchantLocalDateTime: string; // format: InnopayDateTimeFormat
};

export type StartTransactionRes = {
  customerReference?: string;
  errorDescription?: string;
  redirectURL?: string;
  success: boolean;
};

export type GetTransactionStatusCodeReq = {
  referenceNr: string;
};

export type GetTransactionStatusCodeRes = {
  transactionStatus: CashInTransactionStatus;
  merchantOnlineAddress: string;
  additionalInformation: {
    TRAN_TYPE?: string;
    CARD_TYPE?: string;
    CARD_ID?: string;
    USER_ID?: string;
  };
  amountAuthorised?: number;
  amountRefunded?: number;
  amountRequested?: number;
  amountSettled?: number;
  bankRRN?: string;
  issuerBank?: string;
  merchantLocalDateTime?: string;
  purchaserEmail?: string;
  purchaserName?: string;
  purchaserPhone?: string;
  rspCode?: string;
  sinkNode?: string;
  transactionCurrencyCode?: number;
  authCode?: unknown;
  goods?: unknown;
  orderId?: unknown;
  rspCodeDesc?: unknown;
};

export type CompleteTransactionReq = {
  referenceNr: string;
  transactionSuccess: boolean;
  overrideAmount?: number;
};

export type CompleteTransactionRes = boolean;
