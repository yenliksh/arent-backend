"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopaySoapReader = void 0;
const common_1 = require("@nestjs/common");
const xml2js_1 = require("xml2js");
const innopay_api_types_1 = require("../innopay-api.types");
let InnopaySoapReader = class InnopaySoapReader {
    async startCardRegistration(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:startCardRegistrationResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return {
            success: ((_g = body === null || body === void 0 ? void 0 : body['ax21:success']) === null || _g === void 0 ? void 0 : _g[0]) === 'true',
            redirectURL: typeof ((_h = body === null || body === void 0 ? void 0 : body['ax21:redirectURL']) === null || _h === void 0 ? void 0 : _h[0]) === 'string' ? (_j = body === null || body === void 0 ? void 0 : body['ax21:redirectURL']) === null || _j === void 0 ? void 0 : _j[0] : undefined,
            errorDescription: typeof ((_k = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _k === void 0 ? void 0 : _k[0]) === 'string' ? (_l = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _l === void 0 ? void 0 : _l[0] : undefined,
            errorCode: typeof ((_m = body === null || body === void 0 ? void 0 : body['ax21:errorCode']) === null || _m === void 0 ? void 0 : _m[0]) === 'string' ? (_o = body === null || body === void 0 ? void 0 : body['ax21:errorCode']) === null || _o === void 0 ? void 0 : _o[0] : undefined,
            userId: typeof ((_p = body === null || body === void 0 ? void 0 : body['ax21:userId']) === null || _p === void 0 ? void 0 : _p[0]) === 'string' ? Number((_q = body === null || body === void 0 ? void 0 : body['ax21:userId']) === null || _q === void 0 ? void 0 : _q[0]) : undefined,
        };
    }
    async getPaymentStatus(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:getPaymentStatusResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        const additionalInformation = (body === null || body === void 0 ? void 0 : body['ax23:additionalInformation'])
            .map((info) => { var _a; return ({ [info['ax23:key']]: (_a = info['ax23:value']) === null || _a === void 0 ? void 0 : _a[0] }); })
            .reduce((acc, curr) => ({ ...acc, ...curr }));
        return {
            amountRequested: Number((_g = body === null || body === void 0 ? void 0 : body['ax23:amountRequested']) === null || _g === void 0 ? void 0 : _g[0]),
            sinkNode: (_h = body === null || body === void 0 ? void 0 : body['ax23:sinkNode']) === null || _h === void 0 ? void 0 : _h[0],
            additionalInformation,
            cardType: additionalInformation['CARD_TYPE'],
        };
    }
    async getCardStatus(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:getCardStatusResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return {
            cardId: typeof ((_g = body === null || body === void 0 ? void 0 : body['ax21:cardId']) === null || _g === void 0 ? void 0 : _g[0]) === 'string' ? Number((_h = body === null || body === void 0 ? void 0 : body['ax21:cardId']) === null || _h === void 0 ? void 0 : _h[0]) : undefined,
            status: ((_j = body === null || body === void 0 ? void 0 : body['ax21:status']) === null || _j === void 0 ? void 0 : _j[0]) in innopay_api_types_1.CardRegistrationStatus
                ? (_k = body === null || body === void 0 ? void 0 : body['ax21:status']) === null || _k === void 0 ? void 0 : _k[0]
                : undefined,
            uniqueCardId: typeof ((_l = body === null || body === void 0 ? void 0 : body['ax21:uniqueCardId']) === null || _l === void 0 ? void 0 : _l[0]) === 'string' ? Number((_m = body === null || body === void 0 ? void 0 : body['ax21:uniqueCardId']) === null || _m === void 0 ? void 0 : _m[0]) : undefined,
            userId: typeof ((_o = body === null || body === void 0 ? void 0 : body['ax21:cardId']) === null || _o === void 0 ? void 0 : _o[0]) === 'string' ? Number((_p = body === null || body === void 0 ? void 0 : body['ax21:userId']) === null || _p === void 0 ? void 0 : _p[0]) : undefined,
            cardHolder: typeof ((_q = body === null || body === void 0 ? void 0 : body['ax21:cardHolder']) === null || _q === void 0 ? void 0 : _q[0]) === 'string' ? (_r = body === null || body === void 0 ? void 0 : body['ax21:cardHolder']) === null || _r === void 0 ? void 0 : _r[0] : undefined,
            panMasked: typeof ((_s = body === null || body === void 0 ? void 0 : body['ax21:panMasked']) === null || _s === void 0 ? void 0 : _s[0]) === 'string' ? (_t = body === null || body === void 0 ? void 0 : body['ax21:panMasked']) === null || _t === void 0 ? void 0 : _t[0] : undefined,
            userLogin: typeof ((_u = body === null || body === void 0 ? void 0 : body['ax21:userLogin']) === null || _u === void 0 ? void 0 : _u[0]) === 'string' ? (_v = body === null || body === void 0 ? void 0 : body['ax21:userLogin']) === null || _v === void 0 ? void 0 : _v[0] : undefined,
        };
    }
    async completeCardRegistration(xml) {
        var _a, _b, _c, _d, _e, _f;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:completeCardRegistrationResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return body === 'true';
    }
    async deleteCardRegistration(xml) {
        var _a, _b, _c, _d, _e, _f;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:deleteCardRegistrationResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return body === 'true';
    }
    async pay(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:payResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return {
            success: ((_g = body === null || body === void 0 ? void 0 : body['ax21:success']) === null || _g === void 0 ? void 0 : _g[0]) === 'true',
            customerReference: typeof ((_h = body === null || body === void 0 ? void 0 : body['ax21:customerReference']) === null || _h === void 0 ? void 0 : _h[0]) === 'string' ? (_j = body === null || body === void 0 ? void 0 : body['ax21:customerReference']) === null || _j === void 0 ? void 0 : _j[0] : undefined,
            errorDescription: typeof ((_k = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _k === void 0 ? void 0 : _k[0]) === 'string' ? (_l = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _l === void 0 ? void 0 : _l[0] : undefined,
            rspCode: typeof ((_m = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _m === void 0 ? void 0 : _m[0]) === 'string' ? (_o = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _o === void 0 ? void 0 : _o[0] : undefined,
        };
    }
    async completePayment(xml) {
        var _a, _b, _c, _d, _e, _f;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:completePaymentResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return body === 'true';
    }
    async startCashOutToRegisteredCard(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:startCashOutToRegisteredCardResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return {
            success: ((_g = body === null || body === void 0 ? void 0 : body['ax23:success']) === null || _g === void 0 ? void 0 : _g[0]) === 'true',
            customerReference: typeof ((_h = body === null || body === void 0 ? void 0 : body['ax23:customerReference']) === null || _h === void 0 ? void 0 : _h[0]) === 'string' &&
                !Number.isNaN((_j = body === null || body === void 0 ? void 0 : body['ax23:customerReference']) === null || _j === void 0 ? void 0 : _j[0])
                ? String((_k = body === null || body === void 0 ? void 0 : body['ax23:customerReference']) === null || _k === void 0 ? void 0 : _k[0])
                : undefined,
            errorDescription: typeof ((_l = body === null || body === void 0 ? void 0 : body['ax23:errorDescription']) === null || _l === void 0 ? void 0 : _l[0]) === 'string' ? (_m = body === null || body === void 0 ? void 0 : body['ax23:errorDescription']) === null || _m === void 0 ? void 0 : _m[0] : undefined,
            rspCode: typeof ((_o = body === null || body === void 0 ? void 0 : body['ax23:rspCode']) === null || _o === void 0 ? void 0 : _o[0]) === 'string' ? (_p = body === null || body === void 0 ? void 0 : body['ax23:rspCode']) === null || _p === void 0 ? void 0 : _p[0] : undefined,
        };
    }
    async getCashOutTransactionStatus(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:getCashOutTransactionStatusResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        const additionalInformation = (body === null || body === void 0 ? void 0 : body['ax21:additionalInformation'])
            .map((info) => { var _a; return ({ [info['ax21:key']]: (_a = info['ax21:value']) === null || _a === void 0 ? void 0 : _a[0] }); })
            .reduce((acc, curr) => ({ ...acc, ...curr }));
        const transactionStatusXml = typeof ((_g = body === null || body === void 0 ? void 0 : body['ax21:transactionStatus']) === null || _g === void 0 ? void 0 : _g[0]) === 'string' ? (_h = body === null || body === void 0 ? void 0 : body['ax21:transactionStatus']) === null || _h === void 0 ? void 0 : _h[0] : undefined;
        return {
            success: ((_j = body === null || body === void 0 ? void 0 : body['ax21:success']) === null || _j === void 0 ? void 0 : _j[0]) === 'true',
            altCardIssuerCountry: typeof ((_k = body === null || body === void 0 ? void 0 : body['ax21:altCardIssuerCountry']) === null || _k === void 0 ? void 0 : _k[0]) === 'string'
                ? (_l = body === null || body === void 0 ? void 0 : body['ax21:altCardIssuerCountry']) === null || _l === void 0 ? void 0 : _l[0]
                : undefined,
            additionalInformation,
            altMaskedCardNumber: typeof ((_m = body === null || body === void 0 ? void 0 : body['ax21:altMaskedCardNumber']) === null || _m === void 0 ? void 0 : _m[0]) === 'string'
                ? (_o = body === null || body === void 0 ? void 0 : body['ax21:altMaskedCardNumber']) === null || _o === void 0 ? void 0 : _o[0]
                : undefined,
            amount: typeof ((_p = body === null || body === void 0 ? void 0 : body['ax21:amount']) === null || _p === void 0 ? void 0 : _p[0]) === 'string' ? Number((_q = body === null || body === void 0 ? void 0 : body['ax21:amount']) === null || _q === void 0 ? void 0 : _q[0]) : undefined,
            authCode: typeof ((_r = body === null || body === void 0 ? void 0 : body['ax21:authCode']) === null || _r === void 0 ? void 0 : _r[0]) === 'string' ? (_s = body === null || body === void 0 ? void 0 : body['ax21:authCode']) === null || _s === void 0 ? void 0 : _s[0] : undefined,
            cardIssuerCountry: typeof ((_t = body === null || body === void 0 ? void 0 : body['ax21:cardIssuerCountry']) === null || _t === void 0 ? void 0 : _t[0]) === 'string' ? (_u = body === null || body === void 0 ? void 0 : body['ax21:cardIssuerCountry']) === null || _u === void 0 ? void 0 : _u[0] : undefined,
            errorDescription: typeof ((_v = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _v === void 0 ? void 0 : _v[0]) === 'string' ? (_w = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _w === void 0 ? void 0 : _w[0] : undefined,
            fee: typeof ((_x = body === null || body === void 0 ? void 0 : body['ax21:fee']) === null || _x === void 0 ? void 0 : _x[0]) === 'string' ? (_y = body === null || body === void 0 ? void 0 : body['ax21:fee']) === null || _y === void 0 ? void 0 : _y[0] : undefined,
            maskedCardNumber: typeof ((_z = body === null || body === void 0 ? void 0 : body['ax21:maskedCardNumber']) === null || _z === void 0 ? void 0 : _z[0]) === 'string' ? (_0 = body === null || body === void 0 ? void 0 : body['ax21:maskedCardNumber']) === null || _0 === void 0 ? void 0 : _0[0] : undefined,
            merchantLocalDateTime: typeof ((_1 = body === null || body === void 0 ? void 0 : body['ax21:merchantLocalDateTime']) === null || _1 === void 0 ? void 0 : _1[0]) === 'string'
                ? (_2 = body === null || body === void 0 ? void 0 : body['ax21:merchantLocalDateTime']) === null || _2 === void 0 ? void 0 : _2[0]
                : undefined,
            merchantOnlineAddress: typeof ((_3 = body === null || body === void 0 ? void 0 : body['ax21:merchantOnlineAddress']) === null || _3 === void 0 ? void 0 : _3[0]) === 'string'
                ? (_4 = body === null || body === void 0 ? void 0 : body['ax21:merchantOnlineAddress']) === null || _4 === void 0 ? void 0 : _4[0]
                : undefined,
            receiverEmail: typeof ((_5 = body === null || body === void 0 ? void 0 : body['ax21:receiverEmail']) === null || _5 === void 0 ? void 0 : _5[0]) === 'string' ? (_6 = body === null || body === void 0 ? void 0 : body['ax21:receiverEmail']) === null || _6 === void 0 ? void 0 : _6[0] : undefined,
            receiverName: typeof ((_7 = body === null || body === void 0 ? void 0 : body['ax21:receiverName']) === null || _7 === void 0 ? void 0 : _7[0]) === 'string' ? (_8 = body === null || body === void 0 ? void 0 : body['ax21:receiverName']) === null || _8 === void 0 ? void 0 : _8[0] : undefined,
            receiverPhone: typeof ((_9 = body === null || body === void 0 ? void 0 : body['ax21:receiverPhone']) === null || _9 === void 0 ? void 0 : _9[0]) === 'string' ? (_10 = body === null || body === void 0 ? void 0 : body['ax21:receiverPhone']) === null || _10 === void 0 ? void 0 : _10[0] : undefined,
            rspCode: typeof ((_11 = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _11 === void 0 ? void 0 : _11[0]) === 'string' ? (_12 = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _12 === void 0 ? void 0 : _12[0] : undefined,
            senderEmail: typeof ((_13 = body === null || body === void 0 ? void 0 : body['ax21:senderEmail']) === null || _13 === void 0 ? void 0 : _13[0]) === 'string' ? (_14 = body === null || body === void 0 ? void 0 : body['ax21:senderEmail']) === null || _14 === void 0 ? void 0 : _14[0] : undefined,
            senderName: typeof ((_15 = body === null || body === void 0 ? void 0 : body['ax21:senderName']) === null || _15 === void 0 ? void 0 : _15[0]) === 'string' ? (_16 = body === null || body === void 0 ? void 0 : body['ax21:senderName']) === null || _16 === void 0 ? void 0 : _16[0] : undefined,
            senderPhone: typeof ((_17 = body === null || body === void 0 ? void 0 : body['ax21:senderPhone']) === null || _17 === void 0 ? void 0 : _17[0]) === 'string' ? (_18 = body === null || body === void 0 ? void 0 : body['ax21:senderPhone']) === null || _18 === void 0 ? void 0 : _18[0] : undefined,
            transactionCurrencyCode: typeof ((_19 = body === null || body === void 0 ? void 0 : body['ax21:transactionCurrencyCode']) === null || _19 === void 0 ? void 0 : _19[0]) === 'string'
                ? Number((_20 = body === null || body === void 0 ? void 0 : body['ax21:transactionCurrencyCode']) === null || _20 === void 0 ? void 0 : _20[0])
                : undefined,
            transactionStatus: transactionStatusXml && transactionStatusXml in innopay_api_types_1.CashOutTransactionStatus
                ? transactionStatusXml
                : undefined,
            userIpAddress: typeof ((_21 = body === null || body === void 0 ? void 0 : body['ax21:userIpAddress']) === null || _21 === void 0 ? void 0 : _21[0]) === 'string' ? (_22 = body === null || body === void 0 ? void 0 : body['ax21:userIpAddress']) === null || _22 === void 0 ? void 0 : _22[0] : undefined,
            verified3D: typeof ((_23 = body === null || body === void 0 ? void 0 : body['ax21:verified3D']) === null || _23 === void 0 ? void 0 : _23[0]) === 'string' ? ((_24 = body === null || body === void 0 ? void 0 : body['ax21:verified3D']) === null || _24 === void 0 ? void 0 : _24[0]) === 'YES' : undefined,
        };
    }
    async completeCashOutTransaction(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:completeCashOutTransactionResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        const additionalInformation = (body === null || body === void 0 ? void 0 : body['ax21:additionalInformation'])
            .map((info) => { var _a; return ({ [info['ax21:key']]: (_a = info['ax21:value']) === null || _a === void 0 ? void 0 : _a[0] }); })
            .reduce((acc, curr) => ({ ...acc, ...curr }));
        const transactionStatusXml = (_g = body === null || body === void 0 ? void 0 : body['ax21:transactionStatus']) === null || _g === void 0 ? void 0 : _g[0];
        return {
            success: ((_h = body === null || body === void 0 ? void 0 : body['ax21:success']) === null || _h === void 0 ? void 0 : _h[0]) === 'true',
            altCardIssuerCountry: typeof ((_j = body === null || body === void 0 ? void 0 : body['ax21:altCardIssuerCountry']) === null || _j === void 0 ? void 0 : _j[0]) === 'string'
                ? (_k = body === null || body === void 0 ? void 0 : body['ax21:altCardIssuerCountry']) === null || _k === void 0 ? void 0 : _k[0]
                : undefined,
            additionalInformation,
            altMaskedCardNumber: typeof ((_l = body === null || body === void 0 ? void 0 : body['ax21:altMaskedCardNumber']) === null || _l === void 0 ? void 0 : _l[0]) === 'string'
                ? (_m = body === null || body === void 0 ? void 0 : body['ax21:altMaskedCardNumber']) === null || _m === void 0 ? void 0 : _m[0]
                : undefined,
            amount: typeof ((_o = body === null || body === void 0 ? void 0 : body['ax21:amount']) === null || _o === void 0 ? void 0 : _o[0]) === 'string' ? Number((_p = body === null || body === void 0 ? void 0 : body['ax21:amount']) === null || _p === void 0 ? void 0 : _p[0]) : undefined,
            authCode: typeof ((_q = body === null || body === void 0 ? void 0 : body['ax21:authCode']) === null || _q === void 0 ? void 0 : _q[0]) === 'string' ? (_r = body === null || body === void 0 ? void 0 : body['ax21:authCode']) === null || _r === void 0 ? void 0 : _r[0] : undefined,
            cardIssuerCountry: typeof ((_s = body === null || body === void 0 ? void 0 : body['ax21:cardIssuerCountry']) === null || _s === void 0 ? void 0 : _s[0]) === 'string' ? (_t = body === null || body === void 0 ? void 0 : body['ax21:cardIssuerCountry']) === null || _t === void 0 ? void 0 : _t[0] : undefined,
            errorDescription: typeof ((_u = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _u === void 0 ? void 0 : _u[0]) === 'string' ? (_v = body === null || body === void 0 ? void 0 : body['ax21:errorDescription']) === null || _v === void 0 ? void 0 : _v[0] : undefined,
            fee: typeof ((_w = body === null || body === void 0 ? void 0 : body['ax21:fee']) === null || _w === void 0 ? void 0 : _w[0]) === 'string' ? (_x = body === null || body === void 0 ? void 0 : body['ax21:fee']) === null || _x === void 0 ? void 0 : _x[0] : undefined,
            maskedCardNumber: typeof ((_y = body === null || body === void 0 ? void 0 : body['ax21:maskedCardNumber']) === null || _y === void 0 ? void 0 : _y[0]) === 'string' ? (_z = body === null || body === void 0 ? void 0 : body['ax21:maskedCardNumber']) === null || _z === void 0 ? void 0 : _z[0] : undefined,
            merchantLocalDateTime: typeof ((_0 = body === null || body === void 0 ? void 0 : body['ax21:merchantLocalDateTime']) === null || _0 === void 0 ? void 0 : _0[0]) === 'string'
                ? (_1 = body === null || body === void 0 ? void 0 : body['ax21:merchantLocalDateTime']) === null || _1 === void 0 ? void 0 : _1[0]
                : undefined,
            merchantOnlineAddress: typeof ((_2 = body === null || body === void 0 ? void 0 : body['ax21:merchantOnlineAddress']) === null || _2 === void 0 ? void 0 : _2[0]) === 'string'
                ? (_3 = body === null || body === void 0 ? void 0 : body['ax21:merchantOnlineAddress']) === null || _3 === void 0 ? void 0 : _3[0]
                : undefined,
            receiverEmail: typeof ((_4 = body === null || body === void 0 ? void 0 : body['ax21:receiverEmail']) === null || _4 === void 0 ? void 0 : _4[0]) === 'string' ? (_5 = body === null || body === void 0 ? void 0 : body['ax21:receiverEmail']) === null || _5 === void 0 ? void 0 : _5[0] : undefined,
            receiverName: typeof ((_6 = body === null || body === void 0 ? void 0 : body['ax21:receiverName']) === null || _6 === void 0 ? void 0 : _6[0]) === 'string' ? (_7 = body === null || body === void 0 ? void 0 : body['ax21:receiverName']) === null || _7 === void 0 ? void 0 : _7[0] : undefined,
            receiverPhone: typeof ((_8 = body === null || body === void 0 ? void 0 : body['ax21:receiverPhone']) === null || _8 === void 0 ? void 0 : _8[0]) === 'string' ? (_9 = body === null || body === void 0 ? void 0 : body['ax21:receiverPhone']) === null || _9 === void 0 ? void 0 : _9[0] : undefined,
            rspCode: typeof ((_10 = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _10 === void 0 ? void 0 : _10[0]) === 'string' ? (_11 = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _11 === void 0 ? void 0 : _11[0] : undefined,
            senderEmail: typeof ((_12 = body === null || body === void 0 ? void 0 : body['ax21:senderEmail']) === null || _12 === void 0 ? void 0 : _12[0]) === 'string' ? (_13 = body === null || body === void 0 ? void 0 : body['ax21:senderEmail']) === null || _13 === void 0 ? void 0 : _13[0] : undefined,
            senderName: typeof ((_14 = body === null || body === void 0 ? void 0 : body['ax21:senderName']) === null || _14 === void 0 ? void 0 : _14[0]) === 'string' ? (_15 = body === null || body === void 0 ? void 0 : body['ax21:senderName']) === null || _15 === void 0 ? void 0 : _15[0] : undefined,
            senderPhone: typeof ((_16 = body === null || body === void 0 ? void 0 : body['ax21:senderPhone']) === null || _16 === void 0 ? void 0 : _16[0]) === 'string' ? (_17 = body === null || body === void 0 ? void 0 : body['ax21:senderPhone']) === null || _17 === void 0 ? void 0 : _17[0] : undefined,
            transactionCurrencyCode: typeof ((_18 = body === null || body === void 0 ? void 0 : body['ax21:transactionCurrencyCode']) === null || _18 === void 0 ? void 0 : _18[0]) === 'string'
                ? Number((_19 = body === null || body === void 0 ? void 0 : body['ax21:transactionCurrencyCode']) === null || _19 === void 0 ? void 0 : _19[0])
                : undefined,
            transactionStatus: transactionStatusXml && transactionStatusXml in innopay_api_types_1.CashOutTransactionStatus
                ? transactionStatusXml
                : undefined,
            userIpAddress: typeof ((_20 = body === null || body === void 0 ? void 0 : body['ax21:userIpAddress']) === null || _20 === void 0 ? void 0 : _20[0]) === 'string' ? (_21 = body === null || body === void 0 ? void 0 : body['ax21:userIpAddress']) === null || _21 === void 0 ? void 0 : _21[0] : undefined,
            verified3D: typeof ((_22 = body === null || body === void 0 ? void 0 : body['ax21:verified3D']) === null || _22 === void 0 ? void 0 : _22[0]) === 'string' ? ((_23 = body === null || body === void 0 ? void 0 : body['ax21:verified3D']) === null || _23 === void 0 ? void 0 : _23[0]) === 'YES' : undefined,
        };
    }
    async startTransaction(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:startTransactionResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return {
            success: ((_g = body === null || body === void 0 ? void 0 : body['ax23:success']) === null || _g === void 0 ? void 0 : _g[0]) === 'true',
            customerReference: typeof ((_h = body === null || body === void 0 ? void 0 : body['ax23:customerReference']) === null || _h === void 0 ? void 0 : _h[0]) === 'string'
                ? Number((_j = body === null || body === void 0 ? void 0 : body['ax23:customerReference']) === null || _j === void 0 ? void 0 : _j[0])
                : undefined,
            errorDescription: typeof ((_k = body === null || body === void 0 ? void 0 : body['ax23:errorDescription']) === null || _k === void 0 ? void 0 : _k[0]) === 'string' ? (_l = body === null || body === void 0 ? void 0 : body['ax23:errorDescription']) === null || _l === void 0 ? void 0 : _l[0] : undefined,
            redirectURL: typeof ((_m = body === null || body === void 0 ? void 0 : body['ax23:redirectURL']) === null || _m === void 0 ? void 0 : _m[0]) === 'string' ? (_o = body === null || body === void 0 ? void 0 : body['ax23:redirectURL']) === null || _o === void 0 ? void 0 : _o[0] : undefined,
        };
    }
    async completeTransaction(xml) {
        var _a, _b, _c, _d, _e, _f;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:completeTransactionResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        return body === 'true';
    }
    async getTransactionStatusCode(xml) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
        const json = await (0, xml2js_1.parseStringPromise)(xml);
        const body = (_f = (_e = (_d = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json['soapenv:Envelope']) === null || _a === void 0 ? void 0 : _a['soapenv:Body']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['ns:getTransactionStatusCodeResponse']) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e['ns:return']) === null || _f === void 0 ? void 0 : _f[0];
        const additionalInformation = (body === null || body === void 0 ? void 0 : body['ax21:additionalInformation'])
            .map((info) => { var _a; return ({ [info['ax21:key']]: (_a = info['ax21:value']) === null || _a === void 0 ? void 0 : _a[0] }); })
            .reduce((acc, curr) => ({ ...acc, ...curr }));
        return {
            additionalInformation: {
                TRAN_TYPE: additionalInformation['TRAN_TYPE'],
                CARD_TYPE: additionalInformation['CARD_TYPE'],
                CARD_ID: additionalInformation['CARD_ID'],
                USER_ID: additionalInformation['USER_ID'],
            },
            merchantOnlineAddress: (_g = body === null || body === void 0 ? void 0 : body['ax21:merchantOnlineAddress']) === null || _g === void 0 ? void 0 : _g[0],
            transactionStatus: (_h = body === null || body === void 0 ? void 0 : body['ax21:transactionStatus']) === null || _h === void 0 ? void 0 : _h[0],
            amountAuthorised: typeof ((_j = body === null || body === void 0 ? void 0 : body['ax21:amountAuthorised']) === null || _j === void 0 ? void 0 : _j[0]) === 'string'
                ? Number((_k = body === null || body === void 0 ? void 0 : body['ax21:amountAuthorised']) === null || _k === void 0 ? void 0 : _k[0])
                : undefined,
            amountRefunded: typeof ((_l = body === null || body === void 0 ? void 0 : body['ax21:amountRefunded']) === null || _l === void 0 ? void 0 : _l[0]) === 'string' ? Number((_m = body === null || body === void 0 ? void 0 : body['ax21:amountRefunded']) === null || _m === void 0 ? void 0 : _m[0]) : undefined,
            amountRequested: typeof ((_o = body === null || body === void 0 ? void 0 : body['ax21:amountRequested']) === null || _o === void 0 ? void 0 : _o[0]) === 'string'
                ? Number((_p = body === null || body === void 0 ? void 0 : body['ax21:amountRequested']) === null || _p === void 0 ? void 0 : _p[0])
                : undefined,
            amountSettled: typeof ((_q = body === null || body === void 0 ? void 0 : body['ax21:amountSettled']) === null || _q === void 0 ? void 0 : _q[0]) === 'string' ? Number((_r = body === null || body === void 0 ? void 0 : body['ax21:amountSettled']) === null || _r === void 0 ? void 0 : _r[0]) : undefined,
            transactionCurrencyCode: typeof ((_s = body === null || body === void 0 ? void 0 : body['ax21:transactionCurrencyCode']) === null || _s === void 0 ? void 0 : _s[0]) === 'string'
                ? Number((_t = body === null || body === void 0 ? void 0 : body['ax21:transactionCurrencyCode']) === null || _t === void 0 ? void 0 : _t[0])
                : undefined,
            authCode: typeof ((_u = body === null || body === void 0 ? void 0 : body['ax21:authCode']) === null || _u === void 0 ? void 0 : _u[0]) === 'string' ? (_v = body === null || body === void 0 ? void 0 : body['ax21:authCode']) === null || _v === void 0 ? void 0 : _v[0] : undefined,
            bankRRN: typeof ((_w = body === null || body === void 0 ? void 0 : body['ax21:bankRRN']) === null || _w === void 0 ? void 0 : _w[0]) === 'string' ? (_x = body === null || body === void 0 ? void 0 : body['ax21:bankRRN']) === null || _x === void 0 ? void 0 : _x[0] : undefined,
            goods: typeof ((_y = body === null || body === void 0 ? void 0 : body['ax21:goods']) === null || _y === void 0 ? void 0 : _y[0]) === 'string' ? (_z = body === null || body === void 0 ? void 0 : body['ax21:goods']) === null || _z === void 0 ? void 0 : _z[0] : undefined,
            issuerBank: typeof ((_0 = body === null || body === void 0 ? void 0 : body['ax21:issuerBank']) === null || _0 === void 0 ? void 0 : _0[0]) === 'string' ? (_1 = body === null || body === void 0 ? void 0 : body['ax21:issuerBank']) === null || _1 === void 0 ? void 0 : _1[0] : undefined,
            merchantLocalDateTime: typeof ((_2 = body === null || body === void 0 ? void 0 : body['ax21:merchantLocalDateTime']) === null || _2 === void 0 ? void 0 : _2[0]) === 'string'
                ? (_3 = body === null || body === void 0 ? void 0 : body['ax21:merchantLocalDateTime']) === null || _3 === void 0 ? void 0 : _3[0]
                : undefined,
            orderId: typeof ((_4 = body === null || body === void 0 ? void 0 : body['ax21:orderId']) === null || _4 === void 0 ? void 0 : _4[0]) === 'string' ? (_5 = body === null || body === void 0 ? void 0 : body['ax21:orderId']) === null || _5 === void 0 ? void 0 : _5[0] : undefined,
            purchaserEmail: typeof ((_6 = body === null || body === void 0 ? void 0 : body['ax21:purchaserEmail']) === null || _6 === void 0 ? void 0 : _6[0]) === 'string' ? (_7 = body === null || body === void 0 ? void 0 : body['ax21:purchaserEmail']) === null || _7 === void 0 ? void 0 : _7[0].trim() : undefined,
            purchaserName: typeof ((_8 = body === null || body === void 0 ? void 0 : body['ax21:purchaserName']) === null || _8 === void 0 ? void 0 : _8[0]) === 'string' ? (_9 = body === null || body === void 0 ? void 0 : body['ax21:purchaserName']) === null || _9 === void 0 ? void 0 : _9[0].trim() : undefined,
            purchaserPhone: typeof ((_10 = body === null || body === void 0 ? void 0 : body['ax21:purchaserPhone']) === null || _10 === void 0 ? void 0 : _10[0]) === 'string' ? (_11 = body === null || body === void 0 ? void 0 : body['ax21:purchaserPhone']) === null || _11 === void 0 ? void 0 : _11[0].trim() : undefined,
            rspCode: typeof ((_12 = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _12 === void 0 ? void 0 : _12[0]) === 'string' ? (_13 = body === null || body === void 0 ? void 0 : body['ax21:rspCode']) === null || _13 === void 0 ? void 0 : _13[0] : undefined,
            rspCodeDesc: typeof ((_14 = body === null || body === void 0 ? void 0 : body['ax21:rspCodeDesc']) === null || _14 === void 0 ? void 0 : _14[0]) === 'string' ? (_15 = body === null || body === void 0 ? void 0 : body['ax21:rspCodeDesc']) === null || _15 === void 0 ? void 0 : _15[0] : undefined,
            sinkNode: typeof ((_16 = body === null || body === void 0 ? void 0 : body['ax21:sinkNode']) === null || _16 === void 0 ? void 0 : _16[0]) === 'string' ? (_17 = body === null || body === void 0 ? void 0 : body['ax21:sinkNode']) === null || _17 === void 0 ? void 0 : _17[0] : undefined,
        };
    }
};
InnopaySoapReader = __decorate([
    (0, common_1.Injectable)()
], InnopaySoapReader);
exports.InnopaySoapReader = InnopaySoapReader;
//# sourceMappingURL=innopay-soap.reader.js.map