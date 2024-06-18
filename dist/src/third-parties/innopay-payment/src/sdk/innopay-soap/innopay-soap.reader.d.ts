import { CashOutTransactionStatusRes, CompleteCardRegistrationRes, CompletePaymentRes, CompleteTransactionRes, DeleteCardRegistrationRes, GetCardStatusRes, GetPaymentStatusRes, GetTransactionStatusCodeRes, PayRes, StartCardRegistrationRes, StartCashOutToRegisteredCardRes, StartTransactionRes } from '../innopay-api.types';
export declare class InnopaySoapReader {
    startCardRegistration(xml: string): Promise<StartCardRegistrationRes>;
    getPaymentStatus(xml: string): Promise<GetPaymentStatusRes>;
    getCardStatus(xml: string): Promise<GetCardStatusRes>;
    completeCardRegistration(xml: string): Promise<CompleteCardRegistrationRes>;
    deleteCardRegistration(xml: string): Promise<DeleteCardRegistrationRes>;
    pay(xml: string): Promise<PayRes>;
    completePayment(xml: string): Promise<CompletePaymentRes>;
    startCashOutToRegisteredCard(xml: string): Promise<StartCashOutToRegisteredCardRes>;
    getCashOutTransactionStatus(xml: string): Promise<CashOutTransactionStatusRes>;
    completeCashOutTransaction(xml: string): Promise<CashOutTransactionStatusRes>;
    startTransaction(xml: string): Promise<StartTransactionRes>;
    completeTransaction(xml: string): Promise<CompleteTransactionRes>;
    getTransactionStatusCode(xml: string): Promise<GetTransactionStatusCodeRes>;
}
