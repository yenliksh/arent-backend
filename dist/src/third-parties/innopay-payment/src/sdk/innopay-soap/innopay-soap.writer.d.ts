import { CompleteCardRegistrationReq, CompleteCashOutTransactionReq, CompletePaymentReq, CompleteTransactionReq, DeleteCardRegistrationReq, GetCardStatusReq, GetCashOutTransactionStatusReq, GetPaymentStatusReq, GetTransactionStatusCodeReq, PayReq, StartCardRegistrationReq, StartCashOutToRegisteredCardReq, StartTransactionReq } from '../innopay-api.types';
export declare class InnopaySoapWriter {
    private readonly xsdUrls;
    private initSoap;
    startCardRegistration(merchantId: string, { userLogin, userId, returningUrl, currencyCode, languageCode }: StartCardRegistrationReq): string;
    getPaymentStatus(merchantId: string, { customerReference, userId }: GetPaymentStatusReq): string;
    getCardStatus(merchantId: string, { cardId, userId }: GetCardStatusReq): string;
    completeCardRegistration(merchantId: string, { cardId, testAmount, userId }: CompleteCardRegistrationReq): string;
    deleteCardRegistration(merchantId: string, { cardId, userId }: DeleteCardRegistrationReq): string;
    pay(merchantId: string, { amount, cardId, paymentTarget, userId, userLogin, currencyCode, languageCode }: PayReq): string;
    completePayment(merchantId: string, { customerReference, transactionSuccess }: CompletePaymentReq): string;
    startCashOutToRegisteredCard(merchantId: string, merchantKeyword: string, { additionalInformationList, merchantLocalDateTime, returnURL, senderName, tranAmount, currencyCode, languageCode, }: StartCashOutToRegisteredCardReq): string;
    getCashOutTransactionStatus(merchantId: string, merchantKeyword: string, { referenceNr }: GetCashOutTransactionStatusReq): string;
    completeCashOutTransaction(merchantId: string, merchantKeyword: string, { referenceNr, transactionSuccess, overrideAmount }: CompleteCashOutTransactionReq): string;
    startTransaction(merchantId: string, { merchantLocalDateTime, returnURL, totalAmount, customerReference, description, currencyCode, languageCode, }: StartTransactionReq): string;
    getTransactionStatusCode(merchantId: string, { referenceNr }: GetTransactionStatusCodeReq): string;
    completeTransaction(merchantId: string, { referenceNr, transactionSuccess, overrideAmount }: CompleteTransactionReq): string;
}
