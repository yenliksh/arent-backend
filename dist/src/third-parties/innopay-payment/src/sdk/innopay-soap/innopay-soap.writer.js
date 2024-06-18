"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopaySoapWriter = void 0;
const common_1 = require("@nestjs/common");
const xmlbuilder = require("xmlbuilder");
const enums_1 = require("../../types/enums");
let InnopaySoapWriter = class InnopaySoapWriter {
    constructor() {
        this.xsdUrls = {
            [enums_1.InnopayServiceType.ONE_CLICK]: {
                xsd: 'http://kz.processing.cnp.oneclick.merchant_ws/xsd',
                xsd1: 'http://beans.merchant.oneclick.cnp.processing.kz/xsd',
            },
            [enums_1.InnopayServiceType.E_COM]: {
                xsd: 'http://kz.processing.cnp.merchant_ws/xsd',
                xsd1: 'http://beans.merchant_web_services.cnp.processing.kz/xsd',
            },
        };
    }
    initSoap(innopayServiceType) {
        const { xsd, xsd1 } = this.xsdUrls[innopayServiceType];
        return xmlbuilder
            .create('soapenv:Envelope', { encoding: 'UTF-8' })
            .att('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/')
            .att('xmlns:xsd', xsd)
            .att('xmlns:xsd1', xsd1)
            .ele('soapenv:Header')
            .up();
    }
    startCardRegistration(merchantId, { userLogin, userId, returningUrl, currencyCode = 398, languageCode = 'ru' }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.ONE_CLICK);
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
        return soap.end({ pretty: true });
    }
    getPaymentStatus(merchantId, { customerReference, userId }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.ONE_CLICK);
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
        return soap.end({ pretty: true });
    }
    getCardStatus(merchantId, { cardId, userId }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.ONE_CLICK);
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
        return soap.end({ pretty: true });
    }
    completeCardRegistration(merchantId, { cardId, testAmount, userId }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.ONE_CLICK);
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
        return soap.end({ pretty: true });
    }
    deleteCardRegistration(merchantId, { cardId, userId }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.ONE_CLICK);
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
        return soap.end({ pretty: true });
    }
    pay(merchantId, { amount, cardId, paymentTarget, userId, userLogin, currencyCode = 398, languageCode = 'ru' }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.ONE_CLICK);
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
        return soap.end({ pretty: true });
    }
    completePayment(merchantId, { customerReference, transactionSuccess }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.ONE_CLICK);
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
        return soap.end({ pretty: true });
    }
    startCashOutToRegisteredCard(merchantId, merchantKeyword, { additionalInformationList, merchantLocalDateTime, returnURL, senderName, tranAmount, currencyCode = 398, languageCode = 'ru', }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.E_COM);
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
        return soap.end({ pretty: true });
    }
    getCashOutTransactionStatus(merchantId, merchantKeyword, { referenceNr }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.E_COM);
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
        return soap.end({ pretty: true });
    }
    completeCashOutTransaction(merchantId, merchantKeyword, { referenceNr, transactionSuccess, overrideAmount }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.E_COM);
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
        return soap.end({ pretty: true });
    }
    startTransaction(merchantId, { merchantLocalDateTime, returnURL, totalAmount, customerReference, description, currencyCode = 398, languageCode = 'ru', }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.E_COM);
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
        return soap.end({ pretty: true });
    }
    getTransactionStatusCode(merchantId, { referenceNr }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.E_COM);
        soap
            .ele('soapenv:Body')
            .ele('xsd:getTransactionStatusCode')
            .ele('xsd1:merchantId', {}, merchantId)
            .up()
            .ele('xsd1:referenceNr', {}, referenceNr)
            .up()
            .up()
            .up();
        return soap.end({ pretty: true });
    }
    completeTransaction(merchantId, { referenceNr, transactionSuccess, overrideAmount }) {
        const soap = this.initSoap(enums_1.InnopayServiceType.E_COM);
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
        return soap.end({ pretty: true });
    }
};
InnopaySoapWriter = __decorate([
    (0, common_1.Injectable)()
], InnopaySoapWriter);
exports.InnopaySoapWriter = InnopaySoapWriter;
//# sourceMappingURL=innopay-soap.writer.js.map