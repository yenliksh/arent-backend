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
exports.RejectContractOfferService = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const contract_offer_queue_1 = require("../../bulls/queue/contract-offer.queue");
const types_1 = require("../../bulls/types");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let RejectContractOfferService = class RejectContractOfferService {
    constructor(contractRepository, contractOfferQueue) {
        this.contractRepository = contractRepository;
        this.contractOfferQueue = contractOfferQueue;
    }
    async handle(dto, userId) {
        const { chatId } = dto;
        const contract = await this.contractRepository.findOneByMemberAndChatId(chatId, userId);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException());
        }
        contract.setPending();
        await this.contractRepository.save(contract);
        this.contractOfferQueue.addRejectJob({
            chatId,
            userId,
            rejectTrigger: types_1.RejectTrigger.USER,
        });
        return (0, oxide_ts_1.Ok)(contract.id);
    }
};
RejectContractOfferService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        contract_offer_queue_1.ContractOfferQueue])
], RejectContractOfferService);
exports.RejectContractOfferService = RejectContractOfferService;
//# sourceMappingURL=reject-contract-offer.service.js.map