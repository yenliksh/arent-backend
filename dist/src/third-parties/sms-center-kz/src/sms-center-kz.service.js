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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsCenterKzService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const sms_center_kz_types_1 = require("./sms-center-kz.types");
let SmsCenterKzService = class SmsCenterKzService {
    constructor(options, httpService) {
        this.options = options;
        this.httpService = httpService;
        this.charset = 'utf-8';
    }
    async sendSms({ phones, message }) {
        const urlLinkWithParams = this.urlLinkWithParams({ phones, message });
        await this.httpService
            .get(urlLinkWithParams, {
            headers: {
                'Content-Type': 'text/plain',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))
            .pipe((0, rxjs_1.catchError)(() => {
            throw new common_1.ForbiddenException('SMS not working');
        }))
            .toPromise();
    }
    urlLinkWithParams({ phones, message }) {
        let urlLink = '';
        if (this.options.link) {
            urlLink += this.options.link;
        }
        if (this.options.login) {
            urlLink += `login=${this.options.login}`;
        }
        if (this.options.password) {
            urlLink += `&psw=${this.options.password}`;
        }
        if (this.options.sender) {
            urlLink += `&sender=${this.options.sender}`;
        }
        if (phones) {
            urlLink += `&phones=${phones.join(',')}`;
        }
        if (message) {
            urlLink += `&mes=${message}`;
        }
        return encodeURI(urlLink);
    }
};
SmsCenterKzService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sms_center_kz_types_1.SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], SmsCenterKzService);
exports.SmsCenterKzService = SmsCenterKzService;
//# sourceMappingURL=sms-center-kz.service.js.map