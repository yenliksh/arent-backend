export declare const InnopayDateTimeFormat = "DD.MM.YYYY HH:mm:ss";
declare type BaseCardReq = {
    userId: number;
    cardId: number;
};
export declare enum CashOutTransactionStatus {
    NO_SUCH_TRANSACTION = "NO_SUCH_TRANSACTION",
    PENDING_CUSTOMER_INPUT = "PENDING_CUSTOMER_INPUT",
    PENDING_APPROVEMENT = "PENDING_APPROVEMENT",
    PROCESSED = "PROCESSED",
    DECLINED = "DECLINED",
    REVERSED = "REVERSED",
    INVALID_MID = "INVALID_MID",
    MID_DISABLED = "MID_DISABLED"
}
export declare enum CashInTransactionStatus {
    NO_SUCH_TRANSACTION = "NO_SUCH_TRANSACTION",
    DECLINED = "DECLINED",
    REVERSED = "REVERSED",
    PAID = "PAID",
    REFUNDED = "REFUNDED",
    PENDING_CUSTOMER_INPUT = "PENDING_CUSTOMER_INPUT",
    PENDING_AUTH_RESULT = "PENDING_AUTH_RESULT",
    AUTHORISED = "AUTHORISED",
    INVALID_MID = "INVALID_MID",
    MID_DISABLED = "MID_DISABLED"
}
export declare enum CardRegistrationStatus {
    REGISTERED = "REGISTERED",
    UNCOMPLETED = "UNCOMPLETED",
    NOT_FOUND = "NOT_FOUND"
}
export declare type StartCardRegistrationReq = {
    userLogin: string;
    userId?: number;
    returningUrl: string;
    currencyCode?: number;
    languageCode?: string;
};
export declare type StartCardRegistrationRes = {
    success: boolean;
    redirectURL?: string;
    userId?: number;
    errorCode?: string;
    errorDescription?: string;
};
export declare type GetPaymentStatusReq = {
    userId: number;
    customerReference: string;
};
export declare type GetPaymentStatusRes = {
    additionalInformation: Record<string, string>;
    amountRequested: number;
    sinkNode: string;
    cardType: string;
};
export declare type CompleteCardRegistrationReq = BaseCardReq & {
    testAmount: number;
};
export declare type CompleteCardRegistrationRes = boolean;
export declare type GetCardStatusReq = BaseCardReq;
export declare type GetCardStatusRes = {
    cardHolder?: string;
    cardId: number;
    panMasked?: string;
    status?: CardRegistrationStatus;
    uniqueCardId: number;
    userId: number;
    userLogin?: string;
};
export declare type DeleteCardRegistrationReq = BaseCardReq;
export declare type DeleteCardRegistrationRes = boolean;
export declare type PayReq = BaseCardReq & {
    userLogin: string;
    currencyCode?: number;
    languageCode?: string;
    amount: number;
    paymentTarget: string;
};
export declare type PayRes = {
    customerReference?: string;
    errorDescription?: string;
    rspCode?: string;
    success: boolean;
};
export declare type CompletePaymentReq = {
    customerReference: string;
    transactionSuccess: boolean;
};
export declare type CompletePaymentRes = boolean;
export declare type StartCashOutToRegisteredCardReq = {
    tranAmount: number;
    currencyCode?: number;
    languageCode?: string;
    senderName: string;
    returnURL?: string;
    merchantLocalDateTime: string;
    additionalInformationList: {
        USER_ID: number;
        CARD_ID: number;
        USER_LOGIN?: string;
        RECEIVER_CARD_ID: number;
        RECEIVER_USER_ID: number;
    };
};
export declare type StartCashOutToRegisteredCardRes = {
    customerReference?: string;
    errorDescription?: string;
    rspCode?: string;
    success: boolean;
};
export declare type GetCashOutTransactionStatusReq = {
    referenceNr: string;
};
export declare type CashOutTransactionStatusRes = {
    additionalInformation?: Record<string, string>;
    altCardIssuerCountry?: unknown;
    altMaskedCardNumber?: unknown;
    amount?: number;
    authCode?: unknown;
    cardIssuerCountry?: string;
    errorDescription?: string;
    fee?: unknown;
    maskedCardNumber?: string;
    merchantLocalDateTime?: string;
    merchantOnlineAddress?: string;
    receiverEmail?: string;
    receiverName?: string;
    receiverPhone?: string;
    rspCode?: string;
    senderEmail?: string;
    senderName?: string;
    senderPhone?: string;
    success: boolean;
    transactionCurrencyCode?: number;
    transactionStatus?: CashOutTransactionStatus;
    userIpAddress?: string;
    verified3D?: boolean;
};
export declare type CompleteCashOutTransactionReq = {
    referenceNr: string;
    transactionSuccess: boolean;
    overrideAmount?: number;
};
export declare type StartTransactionReq = {
    customerReference?: string;
    totalAmount: number;
    returnURL: string;
    currencyCode?: number;
    languageCode?: string;
    description?: string;
    merchantLocalDateTime: string;
};
export declare type StartTransactionRes = {
    customerReference?: string;
    errorDescription?: string;
    redirectURL?: string;
    success: boolean;
};
export declare type GetTransactionStatusCodeReq = {
    referenceNr: string;
};
export declare type GetTransactionStatusCodeRes = {
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
export declare type CompleteTransactionReq = {
    referenceNr: string;
    transactionSuccess: boolean;
    overrideAmount?: number;
};
export declare type CompleteTransactionRes = boolean;
export {};
