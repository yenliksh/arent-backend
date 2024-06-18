import { Injectable } from '@nestjs/common';
import { parseStringPromise } from 'xml2js';

import {
  CardRegistrationStatus,
  CashOutTransactionStatus,
  CashOutTransactionStatusRes,
  CompleteCardRegistrationRes,
  CompletePaymentRes,
  CompleteTransactionRes,
  DeleteCardRegistrationRes,
  GetCardStatusRes,
  GetPaymentStatusRes,
  GetTransactionStatusCodeRes,
  PayRes,
  StartCardRegistrationRes,
  StartCashOutToRegisteredCardRes,
  StartTransactionRes,
} from '../innopay-api.types';

@Injectable()
export class InnopaySoapReader {
  async startCardRegistration(xml: string): Promise<StartCardRegistrationRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:startCardRegistrationResponse']?.[0]?.['ns:return']?.[0];

    return {
      success: body?.['ax21:success']?.[0] === 'true',
      redirectURL: typeof body?.['ax21:redirectURL']?.[0] === 'string' ? body?.['ax21:redirectURL']?.[0] : undefined,
      errorDescription:
        typeof body?.['ax21:errorDescription']?.[0] === 'string' ? body?.['ax21:errorDescription']?.[0] : undefined,
      errorCode: typeof body?.['ax21:errorCode']?.[0] === 'string' ? body?.['ax21:errorCode']?.[0] : undefined,
      userId: typeof body?.['ax21:userId']?.[0] === 'string' ? Number(body?.['ax21:userId']?.[0]) : undefined,
    } as StartCardRegistrationRes;
  }

  async getPaymentStatus(xml: string): Promise<GetPaymentStatusRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:getPaymentStatusResponse']?.[0]?.['ns:return']?.[0];
    const additionalInformation = (body?.['ax23:additionalInformation'] as Record<string, string>[])
      .map((info) => ({ [info['ax23:key']]: info['ax23:value']?.[0] }))
      .reduce((acc, curr) => ({ ...acc, ...curr }));
    return {
      amountRequested: Number(body?.['ax23:amountRequested']?.[0]),
      sinkNode: body?.['ax23:sinkNode']?.[0],
      additionalInformation,
      cardType: additionalInformation['CARD_TYPE'],
    };
  }

  async getCardStatus(xml: string): Promise<GetCardStatusRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:getCardStatusResponse']?.[0]?.['ns:return']?.[0];

    return {
      cardId: typeof body?.['ax21:cardId']?.[0] === 'string' ? Number(body?.['ax21:cardId']?.[0]) : undefined,
      status:
        body?.['ax21:status']?.[0] in CardRegistrationStatus
          ? (body?.['ax21:status']?.[0] as CardRegistrationStatus)
          : undefined,
      uniqueCardId:
        typeof body?.['ax21:uniqueCardId']?.[0] === 'string' ? Number(body?.['ax21:uniqueCardId']?.[0]) : undefined,
      userId: typeof body?.['ax21:cardId']?.[0] === 'string' ? Number(body?.['ax21:userId']?.[0]) : undefined,
      cardHolder: typeof body?.['ax21:cardHolder']?.[0] === 'string' ? body?.['ax21:cardHolder']?.[0] : undefined,
      panMasked: typeof body?.['ax21:panMasked']?.[0] === 'string' ? body?.['ax21:panMasked']?.[0] : undefined,
      userLogin: typeof body?.['ax21:userLogin']?.[0] === 'string' ? body?.['ax21:userLogin']?.[0] : undefined,
    } as GetCardStatusRes;
  }

  async completeCardRegistration(xml: string): Promise<CompleteCardRegistrationRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:completeCardRegistrationResponse']?.[0]?.[
        'ns:return'
      ]?.[0];

    return (body as string) === 'true';
  }

  async deleteCardRegistration(xml: string): Promise<DeleteCardRegistrationRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:deleteCardRegistrationResponse']?.[0]?.['ns:return']?.[0];

    return (body as string) === 'true';
  }

  async pay(xml: string): Promise<PayRes> {
    const json = await parseStringPromise(xml);
    const body = json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:payResponse']?.[0]?.['ns:return']?.[0];

    return {
      success: body?.['ax21:success']?.[0] === 'true',
      customerReference:
        typeof body?.['ax21:customerReference']?.[0] === 'string' ? body?.['ax21:customerReference']?.[0] : undefined,
      errorDescription:
        typeof body?.['ax21:errorDescription']?.[0] === 'string' ? body?.['ax21:errorDescription']?.[0] : undefined,
      rspCode: typeof body?.['ax21:rspCode']?.[0] === 'string' ? body?.['ax21:rspCode']?.[0] : undefined,
    } as PayRes;
  }

  async completePayment(xml: string): Promise<CompletePaymentRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:completePaymentResponse']?.[0]?.['ns:return']?.[0];

    return (body as string) === 'true';
  }

  async startCashOutToRegisteredCard(xml: string): Promise<StartCashOutToRegisteredCardRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:startCashOutToRegisteredCardResponse']?.[0]?.[
        'ns:return'
      ]?.[0];

    return {
      success: body?.['ax23:success']?.[0] === 'true',
      customerReference:
        typeof body?.['ax23:customerReference']?.[0] === 'string' &&
        !Number.isNaN(body?.['ax23:customerReference']?.[0])
          ? String(body?.['ax23:customerReference']?.[0])
          : undefined,
      errorDescription:
        typeof body?.['ax23:errorDescription']?.[0] === 'string' ? body?.['ax23:errorDescription']?.[0] : undefined,
      rspCode: typeof body?.['ax23:rspCode']?.[0] === 'string' ? body?.['ax23:rspCode']?.[0] : undefined,
    } as PayRes;
  }

  async getCashOutTransactionStatus(xml: string): Promise<CashOutTransactionStatusRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:getCashOutTransactionStatusResponse']?.[0]?.[
        'ns:return'
      ]?.[0];
    const additionalInformation = (body?.['ax21:additionalInformation'] as Record<string, string>[])
      .map((info) => ({ [info['ax21:key']]: info['ax21:value']?.[0] }))
      .reduce((acc, curr) => ({ ...acc, ...curr }));
    const transactionStatusXml: string | undefined =
      typeof body?.['ax21:transactionStatus']?.[0] === 'string' ? body?.['ax21:transactionStatus']?.[0] : undefined;

    return {
      success: body?.['ax21:success']?.[0] === 'true',
      altCardIssuerCountry:
        typeof body?.['ax21:altCardIssuerCountry']?.[0] === 'string'
          ? body?.['ax21:altCardIssuerCountry']?.[0]
          : undefined,
      additionalInformation,
      altMaskedCardNumber:
        typeof body?.['ax21:altMaskedCardNumber']?.[0] === 'string'
          ? body?.['ax21:altMaskedCardNumber']?.[0]
          : undefined,
      amount: typeof body?.['ax21:amount']?.[0] === 'string' ? Number(body?.['ax21:amount']?.[0]) : undefined,
      authCode: typeof body?.['ax21:authCode']?.[0] === 'string' ? body?.['ax21:authCode']?.[0] : undefined,
      cardIssuerCountry:
        typeof body?.['ax21:cardIssuerCountry']?.[0] === 'string' ? body?.['ax21:cardIssuerCountry']?.[0] : undefined,
      errorDescription:
        typeof body?.['ax21:errorDescription']?.[0] === 'string' ? body?.['ax21:errorDescription']?.[0] : undefined,
      fee: typeof body?.['ax21:fee']?.[0] === 'string' ? body?.['ax21:fee']?.[0] : undefined,
      maskedCardNumber:
        typeof body?.['ax21:maskedCardNumber']?.[0] === 'string' ? body?.['ax21:maskedCardNumber']?.[0] : undefined,
      merchantLocalDateTime:
        typeof body?.['ax21:merchantLocalDateTime']?.[0] === 'string'
          ? body?.['ax21:merchantLocalDateTime']?.[0]
          : undefined,
      merchantOnlineAddress:
        typeof body?.['ax21:merchantOnlineAddress']?.[0] === 'string'
          ? body?.['ax21:merchantOnlineAddress']?.[0]
          : undefined,
      receiverEmail:
        typeof body?.['ax21:receiverEmail']?.[0] === 'string' ? body?.['ax21:receiverEmail']?.[0] : undefined,
      receiverName: typeof body?.['ax21:receiverName']?.[0] === 'string' ? body?.['ax21:receiverName']?.[0] : undefined,
      receiverPhone:
        typeof body?.['ax21:receiverPhone']?.[0] === 'string' ? body?.['ax21:receiverPhone']?.[0] : undefined,
      rspCode: typeof body?.['ax21:rspCode']?.[0] === 'string' ? body?.['ax21:rspCode']?.[0] : undefined,
      senderEmail: typeof body?.['ax21:senderEmail']?.[0] === 'string' ? body?.['ax21:senderEmail']?.[0] : undefined,
      senderName: typeof body?.['ax21:senderName']?.[0] === 'string' ? body?.['ax21:senderName']?.[0] : undefined,
      senderPhone: typeof body?.['ax21:senderPhone']?.[0] === 'string' ? body?.['ax21:senderPhone']?.[0] : undefined,
      transactionCurrencyCode:
        typeof body?.['ax21:transactionCurrencyCode']?.[0] === 'string'
          ? Number(body?.['ax21:transactionCurrencyCode']?.[0])
          : undefined,
      transactionStatus:
        transactionStatusXml && transactionStatusXml in CashOutTransactionStatus
          ? (transactionStatusXml as CashOutTransactionStatus)
          : undefined,
      userIpAddress:
        typeof body?.['ax21:userIpAddress']?.[0] === 'string' ? body?.['ax21:userIpAddress']?.[0] : undefined,
      verified3D:
        typeof body?.['ax21:verified3D']?.[0] === 'string' ? body?.['ax21:verified3D']?.[0] === 'YES' : undefined,
    };
  }

  async completeCashOutTransaction(xml: string): Promise<CashOutTransactionStatusRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:completeCashOutTransactionResponse']?.[0]?.[
        'ns:return'
      ]?.[0];
    const additionalInformation = (body?.['ax21:additionalInformation'] as Record<string, string>[])
      .map((info) => ({ [info['ax21:key']]: info['ax21:value']?.[0] }))
      .reduce((acc, curr) => ({ ...acc, ...curr }));
    const transactionStatusXml = body?.['ax21:transactionStatus']?.[0];

    return {
      success: body?.['ax21:success']?.[0] === 'true',
      altCardIssuerCountry:
        typeof body?.['ax21:altCardIssuerCountry']?.[0] === 'string'
          ? body?.['ax21:altCardIssuerCountry']?.[0]
          : undefined,
      additionalInformation,
      altMaskedCardNumber:
        typeof body?.['ax21:altMaskedCardNumber']?.[0] === 'string'
          ? body?.['ax21:altMaskedCardNumber']?.[0]
          : undefined,
      amount: typeof body?.['ax21:amount']?.[0] === 'string' ? Number(body?.['ax21:amount']?.[0]) : undefined,
      authCode: typeof body?.['ax21:authCode']?.[0] === 'string' ? body?.['ax21:authCode']?.[0] : undefined,
      cardIssuerCountry:
        typeof body?.['ax21:cardIssuerCountry']?.[0] === 'string' ? body?.['ax21:cardIssuerCountry']?.[0] : undefined,
      errorDescription:
        typeof body?.['ax21:errorDescription']?.[0] === 'string' ? body?.['ax21:errorDescription']?.[0] : undefined,
      fee: typeof body?.['ax21:fee']?.[0] === 'string' ? body?.['ax21:fee']?.[0] : undefined,
      maskedCardNumber:
        typeof body?.['ax21:maskedCardNumber']?.[0] === 'string' ? body?.['ax21:maskedCardNumber']?.[0] : undefined,
      merchantLocalDateTime:
        typeof body?.['ax21:merchantLocalDateTime']?.[0] === 'string'
          ? body?.['ax21:merchantLocalDateTime']?.[0]
          : undefined,
      merchantOnlineAddress:
        typeof body?.['ax21:merchantOnlineAddress']?.[0] === 'string'
          ? body?.['ax21:merchantOnlineAddress']?.[0]
          : undefined,
      receiverEmail:
        typeof body?.['ax21:receiverEmail']?.[0] === 'string' ? body?.['ax21:receiverEmail']?.[0] : undefined,
      receiverName: typeof body?.['ax21:receiverName']?.[0] === 'string' ? body?.['ax21:receiverName']?.[0] : undefined,
      receiverPhone:
        typeof body?.['ax21:receiverPhone']?.[0] === 'string' ? body?.['ax21:receiverPhone']?.[0] : undefined,
      rspCode: typeof body?.['ax21:rspCode']?.[0] === 'string' ? body?.['ax21:rspCode']?.[0] : undefined,
      senderEmail: typeof body?.['ax21:senderEmail']?.[0] === 'string' ? body?.['ax21:senderEmail']?.[0] : undefined,
      senderName: typeof body?.['ax21:senderName']?.[0] === 'string' ? body?.['ax21:senderName']?.[0] : undefined,
      senderPhone: typeof body?.['ax21:senderPhone']?.[0] === 'string' ? body?.['ax21:senderPhone']?.[0] : undefined,
      transactionCurrencyCode:
        typeof body?.['ax21:transactionCurrencyCode']?.[0] === 'string'
          ? Number(body?.['ax21:transactionCurrencyCode']?.[0])
          : undefined,
      transactionStatus:
        transactionStatusXml && transactionStatusXml in CashOutTransactionStatus
          ? (transactionStatusXml as CashOutTransactionStatus)
          : undefined,
      userIpAddress:
        typeof body?.['ax21:userIpAddress']?.[0] === 'string' ? body?.['ax21:userIpAddress']?.[0] : undefined,
      verified3D:
        typeof body?.['ax21:verified3D']?.[0] === 'string' ? body?.['ax21:verified3D']?.[0] === 'YES' : undefined,
    };
  }

  async startTransaction(xml: string): Promise<StartTransactionRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:startTransactionResponse']?.[0]?.['ns:return']?.[0];

    return {
      success: body?.['ax23:success']?.[0] === 'true',
      customerReference:
        typeof body?.['ax23:customerReference']?.[0] === 'string'
          ? Number(body?.['ax23:customerReference']?.[0]) // TODO: String(Number(...))
          : undefined,
      errorDescription:
        typeof body?.['ax23:errorDescription']?.[0] === 'string' ? body?.['ax23:errorDescription']?.[0] : undefined,
      redirectURL: typeof body?.['ax23:redirectURL']?.[0] === 'string' ? body?.['ax23:redirectURL']?.[0] : undefined,
    } as StartTransactionRes;
  }

  async completeTransaction(xml: string): Promise<CompleteTransactionRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:completeTransactionResponse']?.[0]?.['ns:return']?.[0];

    return (body as string) === 'true';
  }

  async getTransactionStatusCode(xml: string): Promise<GetTransactionStatusCodeRes> {
    const json = await parseStringPromise(xml);
    const body =
      json?.['soapenv:Envelope']?.['soapenv:Body']?.[0]?.['ns:getTransactionStatusCodeResponse']?.[0]?.[
        'ns:return'
      ]?.[0];

    const additionalInformation = (body?.['ax21:additionalInformation'] as Record<string, string>[])
      .map((info) => ({ [info['ax21:key']]: info['ax21:value']?.[0] }))
      .reduce((acc, curr) => ({ ...acc, ...curr }));

    return {
      additionalInformation: {
        TRAN_TYPE: additionalInformation['TRAN_TYPE'],
        CARD_TYPE: additionalInformation['CARD_TYPE'],
        CARD_ID: additionalInformation['CARD_ID'],
        USER_ID: additionalInformation['USER_ID'],
      },
      merchantOnlineAddress: body?.['ax21:merchantOnlineAddress']?.[0],
      transactionStatus: body?.['ax21:transactionStatus']?.[0],
      amountAuthorised:
        typeof body?.['ax21:amountAuthorised']?.[0] === 'string'
          ? Number(body?.['ax21:amountAuthorised']?.[0])
          : undefined,
      amountRefunded:
        typeof body?.['ax21:amountRefunded']?.[0] === 'string' ? Number(body?.['ax21:amountRefunded']?.[0]) : undefined,
      amountRequested:
        typeof body?.['ax21:amountRequested']?.[0] === 'string'
          ? Number(body?.['ax21:amountRequested']?.[0])
          : undefined,
      amountSettled:
        typeof body?.['ax21:amountSettled']?.[0] === 'string' ? Number(body?.['ax21:amountSettled']?.[0]) : undefined,
      transactionCurrencyCode:
        typeof body?.['ax21:transactionCurrencyCode']?.[0] === 'string'
          ? Number(body?.['ax21:transactionCurrencyCode']?.[0])
          : undefined,
      authCode: typeof body?.['ax21:authCode']?.[0] === 'string' ? body?.['ax21:authCode']?.[0] : undefined,
      bankRRN: typeof body?.['ax21:bankRRN']?.[0] === 'string' ? body?.['ax21:bankRRN']?.[0] : undefined,
      goods: typeof body?.['ax21:goods']?.[0] === 'string' ? body?.['ax21:goods']?.[0] : undefined,
      issuerBank: typeof body?.['ax21:issuerBank']?.[0] === 'string' ? body?.['ax21:issuerBank']?.[0] : undefined,
      merchantLocalDateTime:
        typeof body?.['ax21:merchantLocalDateTime']?.[0] === 'string'
          ? body?.['ax21:merchantLocalDateTime']?.[0]
          : undefined,
      orderId: typeof body?.['ax21:orderId']?.[0] === 'string' ? body?.['ax21:orderId']?.[0] : undefined,
      purchaserEmail:
        typeof body?.['ax21:purchaserEmail']?.[0] === 'string' ? body?.['ax21:purchaserEmail']?.[0].trim() : undefined,
      purchaserName:
        typeof body?.['ax21:purchaserName']?.[0] === 'string' ? body?.['ax21:purchaserName']?.[0].trim() : undefined,
      purchaserPhone:
        typeof body?.['ax21:purchaserPhone']?.[0] === 'string' ? body?.['ax21:purchaserPhone']?.[0].trim() : undefined,
      rspCode: typeof body?.['ax21:rspCode']?.[0] === 'string' ? body?.['ax21:rspCode']?.[0] : undefined,
      rspCodeDesc: typeof body?.['ax21:rspCodeDesc']?.[0] === 'string' ? body?.['ax21:rspCodeDesc']?.[0] : undefined,
      sinkNode: typeof body?.['ax21:sinkNode']?.[0] === 'string' ? body?.['ax21:sinkNode']?.[0] : undefined,
    } as GetTransactionStatusCodeRes;
  }
}
