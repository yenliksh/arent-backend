import { Injectable } from '@nestjs/common';
import * as xmlbuilder from 'xmlbuilder';

import { InnopayServiceType } from '../../types/enums';
import {
  CompleteCardRegistrationReq,
  CompleteCashOutTransactionReq,
  CompletePaymentReq,
  CompleteTransactionReq,
  DeleteCardRegistrationReq,
  GetCardStatusReq,
  GetCashOutTransactionStatusReq,
  GetPaymentStatusReq,
  GetTransactionStatusCodeReq,
  PayReq,
  StartCardRegistrationReq,
  StartCashOutToRegisteredCardReq,
  StartTransactionReq,
} from '../innopay-api.types';

/*
  create -- An XML document is created by calling the create function of the module. All arguments and their 
    default values are shown below.

  att -- Node attributes are created with the attribute function (can also be abbreviated to att or a). 
    attribute will create a new attribute or overwrite the attribute value if it already exists

  ele -- Child nodes are created with the element function (can also be abbreviated to ele or e).

  up -- The up function provides a means to return back to the parent node after creating the child node 
    (can also be abbreviated to u).

  end -- Once the XML document is created, it can be converted to a string by calling the end function 
    from anywhere in the document

  end({ pretty: true }) - convert xml to pretty indented string
*/

@Injectable()
export class InnopaySoapWriter {
  private readonly xsdUrls: { [P in InnopayServiceType]: { xsd: string; xsd1: string } } = {
    [InnopayServiceType.ONE_CLICK]: {
      xsd: 'http://kz.processing.cnp.oneclick.merchant_ws/xsd',
      xsd1: 'http://beans.merchant.oneclick.cnp.processing.kz/xsd',
    },
    [InnopayServiceType.E_COM]: {
      xsd: 'http://kz.processing.cnp.merchant_ws/xsd',
      xsd1: 'http://beans.merchant_web_services.cnp.processing.kz/xsd',
    },
  };

  private initSoap(innopayServiceType: InnopayServiceType): xmlbuilder.XMLElement {
    const { xsd, xsd1 } = this.xsdUrls[innopayServiceType];
    return xmlbuilder
      .create('soapenv:Envelope', { encoding: 'UTF-8' })
      .att('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/')
      .att('xmlns:xsd', xsd)
      .att('xmlns:xsd1', xsd1)
      .ele('soapenv:Header')
      .up();
  }

  startCardRegistration(
    merchantId: string,
    { userLogin, userId, returningUrl, currencyCode = 398, languageCode = 'ru' }: StartCardRegistrationReq,
  ) {
    const soap = this.initSoap(InnopayServiceType.ONE_CLICK);
    soap
      .ele('soapenv:Body')
      .ele('xsd:startCardRegistration')
      .ele('xsd:registration')
      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:userLogin', {}, userLogin)
      .up()
      .ele('xsd1:userId', {}, userId)
      .up()
      .ele('xsd1:currencyCode', {}, currencyCode)
      .up()
      .ele('xsd1:languageCode', {}, languageCode)
      .up()
      .ele('xsd1:returnURL', {}, returningUrl)
      .up()
      .up()
      .up()
      .up();
    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  getPaymentStatus(merchantId: string, { customerReference, userId }: GetPaymentStatusReq) {
    const soap = this.initSoap(InnopayServiceType.ONE_CLICK);
    soap
      .ele('soapenv:Body')
      .ele('xsd:getPaymentStatus')
      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:userId', {}, userId)
      .up()
      .ele('xsd1:customerReference', {}, customerReference)
      .up()
      .up()
      .up();
    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  getCardStatus(merchantId: string, { cardId, userId }: GetCardStatusReq) {
    const soap = this.initSoap(InnopayServiceType.ONE_CLICK);
    soap
      .ele('soapenv:Body')
      .ele('xsd:getCardStatus')
      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:userId', {}, userId)
      .up()
      .ele('xsd1:cardId', {}, cardId)
      .up()
      .up()
      .up();
    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  completeCardRegistration(merchantId: string, { cardId, testAmount, userId }: CompleteCardRegistrationReq) {
    const soap = this.initSoap(InnopayServiceType.ONE_CLICK);
    soap
      .ele('soapenv:Body')
      .ele('xsd:completeCardRegistration')
      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:userId', {}, userId)
      .up()
      .ele('xsd1:cardId', {}, cardId)
      .up()
      .ele('xsd1:testAmount', {}, testAmount)
      .up()
      .up()
      .up();
    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  deleteCardRegistration(merchantId: string, { cardId, userId }: DeleteCardRegistrationReq) {
    const soap = this.initSoap(InnopayServiceType.ONE_CLICK);
    soap
      .ele('soapenv:Body')
      .ele('xsd:deleteCardRegistration')
      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:userId', {}, userId)
      .up()
      .ele('xsd1:cardId', {}, cardId)
      .up()
      .up()
      .up();
    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  pay(
    merchantId: string,
    { amount, cardId, paymentTarget, userId, userLogin, currencyCode = 398, languageCode = 'ru' }: PayReq,
  ) {
    const soap = this.initSoap(InnopayServiceType.ONE_CLICK);
    soap
      .ele('soapenv:Body')
      .ele('xsd:pay')
      .ele('xsd:details')
      .ele('xsd1:customerReference')
      .up()
      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:cardId', {}, cardId)
      .up()
      .ele('xsd1:userId', {}, userId)
      .up()
      .ele('xsd1:userLogin', {}, userLogin)
      .up()
      .ele('xsd1:currencyCode', {}, currencyCode)
      .up()
      .ele('xsd1:languageCode', {}, languageCode)
      .up()
      .ele('xsd1:amount', {}, amount)
      .up()
      .ele('xsd1:paymentTarget', {}, paymentTarget)
      .up()
      .up()
      .up()
      .up();
    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  completePayment(merchantId: string, { customerReference, transactionSuccess }: CompletePaymentReq) {
    const soap = this.initSoap(InnopayServiceType.ONE_CLICK);
    soap
      .ele('soapenv:Body')
      .ele('xsd:completePayment')
      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:customerReference', {}, customerReference)
      .up()
      .ele('xsd1:transactionSuccess', {}, transactionSuccess)
      .up()
      .up()
      .up();

    // Dont work
    /*
    if (overrideAmount) {
      soap.ele('xsd1:overrideAmount', {}, overrideAmount).up();
    }
    */

    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  startCashOutToRegisteredCard(
    merchantId: string,
    merchantKeyword: string,
    {
      additionalInformationList,
      merchantLocalDateTime,
      returnURL,
      senderName,
      tranAmount,
      currencyCode = 398,
      languageCode = 'ru',
    }: StartCashOutToRegisteredCardReq,
  ) {
    const soap = this.initSoap(InnopayServiceType.E_COM);
    soap
      .ele('soapenv:Body')
      .ele('xsd:startCashOutToRegisteredCard')
      .ele('xsd:transaction')

      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:merchantKeyword', {}, merchantKeyword)
      .up()
      .ele('xsd1:terminalId')
      .up()
      .ele('xsd1:customerReference')
      .up()
      .ele('xsd1:tranAmount', {}, tranAmount)
      .up()
      .ele('xsd1:currencyCode', {}, currencyCode)
      .up()
      .ele('xsd1:languageCode', {}, languageCode)
      .up()
      .ele('xsd1:senderName', {}, senderName)
      .up()
      .ele('xsd1:returnURL', {}, returnURL)
      .up()
      .ele('xsd1:merchantLocalDateTime', {}, merchantLocalDateTime)
      .up()

      .ele('xsd1:additionalInformationList')
      .ele('xsd1:key', {}, 'USER_ID')
      .up()
      .ele('xsd1:value', {}, additionalInformationList.USER_ID)
      .up()
      .up()
      .ele('xsd1:additionalInformationList')
      .ele('xsd1:key', {}, 'CARD_ID')
      .up()
      .ele('xsd1:value', {}, additionalInformationList.CARD_ID)
      .up()
      .up()
      .ele('xsd1:additionalInformationList')
      .ele('xsd1:key', {}, 'USER_LOGIN')
      .up()
      .ele('xsd1:value', {}, additionalInformationList.USER_LOGIN)
      .up()
      .up()
      .ele('xsd1:additionalInformationList')
      .ele('xsd1:key', {}, 'RECEIVER_CARD_ID')
      .up()
      .ele('xsd1:value', {}, additionalInformationList.RECEIVER_CARD_ID)
      .up()
      .up()
      .ele('xsd1:additionalInformationList')
      .ele('xsd1:key', {}, 'RECEIVER_USER_ID')
      .up()
      .ele('xsd1:value', {}, additionalInformationList.RECEIVER_USER_ID)
      .up()
      .up()

      .up()
      .up()
      .up();

    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  getCashOutTransactionStatus(
    merchantId: string,
    merchantKeyword: string,
    { referenceNr }: GetCashOutTransactionStatusReq,
  ) {
    const soap = this.initSoap(InnopayServiceType.E_COM);
    soap
      .ele('soapenv:Body')
      .ele('xsd:getCashOutTransactionStatus')

      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:referenceNr', {}, referenceNr)
      .up()
      .ele('xsd1:merchantKeyword', {}, merchantKeyword)
      .up()

      .up()
      .up();

    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  completeCashOutTransaction(
    merchantId: string,
    merchantKeyword: string,
    { referenceNr, transactionSuccess, overrideAmount }: CompleteCashOutTransactionReq,
  ) {
    const soap = this.initSoap(InnopayServiceType.E_COM);
    soap
      .ele('soapenv:Body')
      .ele('xsd:completeCashOutTransaction')

      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:referenceNr', {}, referenceNr)
      .up()
      .ele('xsd1:transactionSuccess', {}, transactionSuccess)
      .up()
      .ele('xsd1:merchantKeyword', {}, merchantKeyword)
      .up()
      .ele('xsd1:overrideAmount', {}, overrideAmount)
      .up()

      .up()
      .up();

    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  startTransaction(
    merchantId: string,
    {
      merchantLocalDateTime,
      returnURL,
      totalAmount,
      customerReference,
      description,
      currencyCode = 398,
      languageCode = 'ru',
    }: StartTransactionReq,
  ) {
    const soap = this.initSoap(InnopayServiceType.E_COM);
    soap
      .ele('soapenv:Body')
      .ele('xsd:startTransaction')
      .ele('xsd:transaction')

      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:customerReference', {}, customerReference)
      .up()
      .ele('xsd1:returnURL', {}, returnURL)
      .up()
      .ele('xsd1:totalAmount', {}, totalAmount)
      .up()
      .ele('xsd1:merchantLocalDateTime', {}, merchantLocalDateTime)
      .up()
      .ele('xsd1:currencyCode', {}, currencyCode)
      .up()
      .ele('xsd1:languageCode', {}, languageCode)
      .up()
      .ele('xsd1:description', {}, description)
      .up()

      .up()
      .up()
      .up();

    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  getTransactionStatusCode(merchantId: string, { referenceNr }: GetTransactionStatusCodeReq) {
    const soap = this.initSoap(InnopayServiceType.E_COM);
    soap
      .ele('soapenv:Body')
      .ele('xsd:getTransactionStatusCode')

      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:referenceNr', {}, referenceNr)
      .up()

      .up()
      .up();

    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }

  completeTransaction(merchantId: string, { referenceNr, transactionSuccess, overrideAmount }: CompleteTransactionReq) {
    const soap = this.initSoap(InnopayServiceType.E_COM);
    soap
      .ele('soapenv:Body')
      .ele('xsd:completeTransaction')

      .ele('xsd1:merchantId', {}, merchantId)
      .up()
      .ele('xsd1:referenceNr', {}, referenceNr)
      .up()
      .ele('xsd1:transactionSuccess', {}, transactionSuccess)
      .up()
      .ele('xsd1:overrideAmount', {}, overrideAmount)
      .up()

      .up()
      .up();

    return soap.end({ pretty: true }); // TODO: remove pretty: true
  }
}
