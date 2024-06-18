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
exports.SaveCardEndService = void 0;
const types_1 = require("../../domain/types");
const innopay_service_bad_request_problem_1 = require("../../../../../infrastructure/problems/innopay-service-bad-request.problem");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const innopay_card_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-card.service");
const oxide_ts_1 = require("oxide.ts");
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
const innopay_card_entity_1 = require("../../domain/entities/innopay-card.entity");
const pan_masked_value_object_1 = require("../../domain/value-objects/pan-masked.value-object");
const user_already_has_this_card_problem_1 = require("../../problems/user-already-has-this-card.problem");
let SaveCardEndService = class SaveCardEndService {
    constructor(innopayCardService, innopayCardRepository) {
        this.innopayCardService = innopayCardService;
        this.innopayCardRepository = innopayCardRepository;
    }
    async handle({ userId, cnpCardId, cnpUserId, customerReference, }) {
        let innopayUser;
        if (userId) {
            innopayUser = await this.innopayCardRepository.findCreditingInnopayUser(userId);
        }
        if (cnpUserId) {
            innopayUser = await this.innopayCardRepository.findCreditingInnopayUserByCnpUserId(cnpUserId);
        }
        if (!innopayUser) {
            return (0, oxide_ts_1.Err)(new common_1.UnprocessableEntityException());
        }
        let endSaveCardResponse;
        try {
            endSaveCardResponse = await this.innopayCardService.endSaveCard(cnpCardId, innopayUser.cnpUserId, customerReference);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem(error.message));
        }
        try {
            const cardType = endSaveCardResponse.cardType in types_1.InnopayCardType ? endSaveCardResponse.cardType : undefined;
            if (!cardType) {
                return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentNotProvidedException(`Card type ${endSaveCardResponse.cardType} not provided`));
            }
            const card = innopay_card_entity_1.InnopayCardEntity.create({
                cnpCardId: endSaveCardResponse.cardId,
                panMasked: new pan_masked_value_object_1.PanMaskedVO(endSaveCardResponse.panMasked),
                cardHolder: endSaveCardResponse.cardHolder,
                cardType,
                appointmentType: types_1.InnopayAppointmentCardType.CREDITING,
                cnpUserId: innopayUser.cnpUserId,
                userId: new uuid_value_object_1.UUID(innopayUser.userId),
            });
            await this.innopayCardRepository.save(card);
            return (0, oxide_ts_1.Ok)(card.id);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new user_already_has_this_card_problem_1.UserAlreadyHasThisCardProblem());
        }
    }
};
SaveCardEndService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_card_service_1.InnopayCardService,
        innopay_card_repository_1.InnopayCardRepository])
], SaveCardEndService);
exports.SaveCardEndService = SaveCardEndService;
//# sourceMappingURL=save-card-end.service.js.map