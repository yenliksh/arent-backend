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
exports.DeleteCardService = void 0;
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const deleting_card_is_active_problem_1 = require("../../problems/deleting-card-is-active.problem");
const innopay_service_bad_request_problem_1 = require("../../../../../infrastructure/problems/innopay-service-bad-request.problem");
const exceptions_1 = require("../../../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const innopay_card_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-card.service");
const oxide_ts_1 = require("oxide.ts");
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
let DeleteCardService = class DeleteCardService {
    constructor(innopayCardService, innopayCardRepository, apartmentAdRepository, contractRepository) {
        this.innopayCardService = innopayCardService;
        this.innopayCardRepository = innopayCardRepository;
        this.apartmentAdRepository = apartmentAdRepository;
        this.contractRepository = contractRepository;
    }
    async handle(userId, cardId) {
        const innopayCards = await this.innopayCardRepository.findManyByUserId(userId.value);
        const deletingCard = innopayCards.find((card) => card.id.value === cardId);
        if (!deletingCard) {
            return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException(`User does not have card with id=${cardId}`));
        }
        const isUsed = await Promise.all([
            this.apartmentAdRepository.findOne({ paymentMethod: { innopayCardId: cardId } }),
            this.contractRepository.findOneActiveByCardId(cardId),
        ]).then((res) => res.some((res) => res !== undefined));
        if (isUsed) {
            return (0, oxide_ts_1.Err)(new deleting_card_is_active_problem_1.DeletingCardIsActiveProblem());
        }
        try {
            await this.innopayCardService.deleteCard(deletingCard.cnpCardId, deletingCard.cnpUserId);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem(error.message));
        }
        const res = await this.innopayCardRepository.delete(deletingCard);
        return (0, oxide_ts_1.Ok)(res);
    }
};
DeleteCardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_card_service_1.InnopayCardService,
        innopay_card_repository_1.InnopayCardRepository,
        apartment_ad_repository_1.ApartmentAdRepository,
        contract_repository_1.ContractRepository])
], DeleteCardService);
exports.DeleteCardService = DeleteCardService;
//# sourceMappingURL=delete-card.service.js.map