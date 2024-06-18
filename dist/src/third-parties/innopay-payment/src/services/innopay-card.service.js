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
exports.InnopayCardService = void 0;
const common_1 = require("@nestjs/common");
const innopay_api_types_1 = require("../sdk/innopay-api.types");
const innopay_card_sdk_service_1 = require("../sdk/services/innopay-card-sdk.service");
const innopay_status_sdk_service_1 = require("../sdk/services/innopay-status-sdk.service");
const get_card_type_util_1 = require("./utils/get-card-type.util");
let InnopayCardService = class InnopayCardService {
    constructor(innopayCardSdkService, innopayStatusSdkService) {
        this.innopayCardSdkService = innopayCardSdkService;
        this.innopayStatusSdkService = innopayStatusSdkService;
    }
    async startSaveCard(userLogin, returningUrl, userId) {
        const checkResponseType = (obj) => {
            return ((obj === null || obj === void 0 ? void 0 : obj.userId) !== undefined && (obj === null || obj === void 0 ? void 0 : obj.redirectURL) !== undefined);
        };
        const data = await this.innopayCardSdkService.startCardRegistration({
            userLogin,
            userId,
            returningUrl,
        });
        if (!data.success || !checkResponseType(data)) {
            throw new common_1.BadGatewayException(data.errorDescription);
        }
        return data;
    }
    async endSaveCard(cardId, userId, _customerReference) {
        const checkResponseType = (obj) => {
            return ((obj === null || obj === void 0 ? void 0 : obj.cardHolder) !== undefined &&
                (obj === null || obj === void 0 ? void 0 : obj.panMasked) !== undefined &&
                (obj === null || obj === void 0 ? void 0 : obj.status) !== undefined &&
                (obj === null || obj === void 0 ? void 0 : obj.status) in innopay_api_types_1.CardRegistrationStatus);
        };
        const data = await this.innopayStatusSdkService.getCardStatus({
            cardId,
            userId,
        });
        if (data.status === innopay_api_types_1.CardRegistrationStatus.NOT_FOUND) {
            throw new common_1.BadGatewayException('Card with this credentials not found');
        }
        if (!checkResponseType(data)) {
            throw new common_1.BadGatewayException(`Card registration status = ${data.status}`);
        }
        return { ...data, cardType: (0, get_card_type_util_1.getCardType)(data.panMasked) };
    }
    async deleteCard(cardId, userId) {
        const data = await this.innopayCardSdkService.deleteCardRegistration({
            cardId,
            userId,
        });
        if (!data) {
            throw new common_1.BadGatewayException(`Card with id=${cardId} not deleted`);
        }
    }
    async getCardInfo(cardId, userId, customerReference) {
        const checkResponseType = (obj) => {
            return ((obj === null || obj === void 0 ? void 0 : obj.cardHolder) !== undefined && (obj === null || obj === void 0 ? void 0 : obj.panMasked) !== undefined);
        };
        const paymentStatus = await this.innopayStatusSdkService.getPaymentStatus({
            userId,
            customerReference,
        });
        const data = await this.innopayStatusSdkService.getCardStatus({
            cardId,
            userId,
        });
        if (data.status !== innopay_api_types_1.CardRegistrationStatus.REGISTERED || !checkResponseType(data)) {
            throw new common_1.BadGatewayException(`Card registration status = ${data.status}`);
        }
        return { ...data, ...paymentStatus };
    }
};
InnopayCardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_card_sdk_service_1.InnopayCardSdkService,
        innopay_status_sdk_service_1.InnopayStatusSdkService])
], InnopayCardService);
exports.InnopayCardService = InnopayCardService;
//# sourceMappingURL=innopay-card.service.js.map