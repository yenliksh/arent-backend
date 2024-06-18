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
exports.SaveCardStartService = void 0;
const innopay_service_bad_request_problem_1 = require("../../../../../infrastructure/problems/innopay-service-bad-request.problem");
const slash_agnostic_1 = require("../../../../../libs/utils/slash-agnostic");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const innopay_card_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-card.service");
const oxide_ts_1 = require("oxide.ts");
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
let SaveCardStartService = class SaveCardStartService {
    constructor(innopayCardService, innopayCardRepository, configService) {
        this.innopayCardService = innopayCardService;
        this.innopayCardRepository = innopayCardRepository;
        this.configService = configService;
    }
    async handle(userId) {
        const innopayUser = await this.innopayCardRepository.findCreditingInnopayUser(userId.value);
        let data;
        try {
            const returnUrl = (0, slash_agnostic_1.slashAgnostic)(this.configService.get('backendUrl'), 'v1/innopay-card/save-card-end');
            data = await this.innopayCardService.startSaveCard(userId.value, returnUrl, innopayUser === null || innopayUser === void 0 ? void 0 : innopayUser.cnpUserId);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem(error.message));
        }
        if (!innopayUser) {
            await this.innopayCardRepository.saveInnopayUser({
                userId: userId.value,
                cnpUserId: data.userId,
                isCrediting: true,
            });
        }
        return (0, oxide_ts_1.Ok)(data.redirectURL);
    }
};
SaveCardStartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_card_service_1.InnopayCardService,
        innopay_card_repository_1.InnopayCardRepository,
        config_1.ConfigService])
], SaveCardStartService);
exports.SaveCardStartService = SaveCardStartService;
//# sourceMappingURL=save-card-start.service.js.map