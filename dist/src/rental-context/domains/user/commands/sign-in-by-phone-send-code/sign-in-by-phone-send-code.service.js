"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInByPhoneSendCodeService = void 0;
const utils_1 = require("../../../../../libs/utils");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const src_1 = require("../../../../../third-parties/cloud-cache-storage/src");
const src_2 = require("../../../../../third-parties/simple-notification/src");
const src_3 = require("../../../../../third-parties/sms-center-kz/src");
const libphonenumber_js_1 = require("libphonenumber-js");
const moment = require("moment");
const oxide_ts_1 = require("oxide.ts");
const send_sms_code_rescriction_problem_1 = require("../../problems/send-sms-code-rescriction.problem");
let SignInByPhoneSendCodeService = class SignInByPhoneSendCodeService {
    constructor(configService, cacheStorageService, simpleNotificationService, smsCenterKzService) {
        this.configService = configService;
        this.cacheStorageService = cacheStorageService;
        this.simpleNotificationService = simpleNotificationService;
        this.smsCenterKzService = smsCenterKzService;
        this.smsCodeExpiresIn = configService.get('smsCode.expiresInSeconds');
        this.smsCodeLength = configService.get('smsCode.codeLength');
    }
    async handle(dto) {
        const { phone } = dto;
        let codeRecord = await this.getSMScode(phone);
        const expirationResult = this.checkExpiration(codeRecord);
        if (expirationResult.isErr()) {
            return expirationResult;
        }
        let smscode = this.generateSmsCode();
        codeRecord = this.saveSMSCode(smscode, phone);
        await this.sendSmsCodeToPhone(phone, smscode);
        const isProduction = this.configService.get('nodeEnv') === 'production';
        if (isProduction) {
            smscode = null;
        }
        return (0, oxide_ts_1.Ok)(smscode);
    }
    saveSMSCode(smscode, phone) {
        const { expDate } = this.cacheStorageService.setValueWithExp(phone, { smscode }, this.smsCodeExpiresIn);
        return {
            smscode,
            expDate,
        };
    }
    getSMScode(phone) {
        return this.cacheStorageService.getValue(phone);
    }
    checkExpiration(codeRecord) {
        if (!codeRecord) {
            return (0, oxide_ts_1.Ok)(true);
        }
        const dateDiff = moment.duration(moment(codeRecord.expDate).diff(moment()));
        return (0, oxide_ts_1.Err)(new send_sms_code_rescriction_problem_1.SendSmsCodeRestrictionProblem(dateDiff.get('seconds')));
    }
    generateSmsCode() {
        return (0, utils_1.generateSmsCode)(this.smsCodeLength).toString();
    }
    async sendSmsCodeToPhone(phone, smscode) {
        var _a, _b;
        const isProduction = this.configService.get('nodeEnv') === 'production';
        const parsed = (0, libphonenumber_js_1.findPhoneNumbersInText)(phone, 'KZ');
        const message = `Введите ${smscode} для авторизации в livin.kz`;
        if (isProduction) {
            if (((_b = (_a = parsed[0]) === null || _a === void 0 ? void 0 : _a.number) === null || _b === void 0 ? void 0 : _b.country) === 'KZ') {
                await this.smsCenterKzService.sendSms({
                    phones: [phone],
                    message,
                });
            }
            else {
                await this.simpleNotificationService.publish({
                    phoneNumber: phone,
                    message,
                });
            }
        }
    }
};
SignInByPhoneSendCodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        src_1.CloudCacheStorageService,
        src_2.SimpleNotificationService,
        src_3.SmsCenterKzService])
], SignInByPhoneSendCodeService);
exports.SignInByPhoneSendCodeService = SignInByPhoneSendCodeService;
//# sourceMappingURL=sign-in-by-phone-send-code.service.js.map