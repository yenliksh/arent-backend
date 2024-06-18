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
exports.ContractTemporaryConcludeService = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const contract_offer_queue_1 = require("../../bulls/queue/contract-offer.queue");
const contract_offer_already_exists_problem_1 = require("../../problems/contract-offer-already-exists.problem");
const enums_1 = require("../../../../../infrastructure/enums");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let ContractTemporaryConcludeService = class ContractTemporaryConcludeService {
    constructor(contractRepository, contractOfferQueue, pubSubService) {
        this.contractRepository = contractRepository;
        this.contractOfferQueue = contractOfferQueue;
        this.pubSubService = pubSubService;
    }
    async handle(dto, userId) {
        const { chatId } = dto;
        const contract = await this.contractRepository.findOneByTenantAndChatId(chatId, userId);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        if (!contract.arrivalDate || !contract.departureDate) {
            return (0, oxide_ts_1.Err)(new common_1.UnprocessableEntityException('Arrival and departure date required for accept contract'));
        }
        if (contract.paymentData) {
            this.publishInnopayPageUrl(userId, contract.paymentData.paymentUrl, contract.paymentData.paymentUrlStartAt, {
                contractId: contract.id.value,
            });
            return (0, oxide_ts_1.Ok)(contract.id);
        }
        if (contract.status.value === enums_1.ContractStatus.CONCLUDED) {
            return (0, oxide_ts_1.Err)(new common_1.UnprocessableEntityException('Contract already concluded'));
        }
        const apartmentAdId = contract.apartmentAdIdOrFail;
        const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
            apartmentAdId: apartmentAdId.value,
            apartmentRentPeriodType: contract.apartmentRentPeriodType,
            from: contract.arrivalDate.value,
            to: contract.departureDate.value,
            selfContractId: contract.id.value,
        });
        if (!isApartmentFree) {
            return (0, oxide_ts_1.Err)(new contract_offer_already_exists_problem_1.ContractOfferAlreadyExistsProblem());
        }
        contract.setPending();
        await this.contractRepository.save(contract);
        this.contractOfferQueue.addTemporaryConcludeJob({
            chatId,
            tenantId: userId,
        });
        return (0, oxide_ts_1.Ok)(contract.id);
    }
    publishInnopayPageUrl(tenantId, url, startUrlDate, refs) {
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.INNOPAY_PAGE_URL, {
            payingId: tenantId,
            url,
            startUrlDate: new Date(startUrlDate),
            ...refs,
        });
    }
};
ContractTemporaryConcludeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        contract_offer_queue_1.ContractOfferQueue,
        pub_sub_service_1.PubSubService])
], ContractTemporaryConcludeService);
exports.ContractTemporaryConcludeService = ContractTemporaryConcludeService;
//# sourceMappingURL=contract-temporary-conclude.service.js.map