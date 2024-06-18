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
exports.ContractOfferQueue = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const types_1 = require("../types");
let ContractOfferQueue = class ContractOfferQueue {
    constructor(contractOfferQueue) {
        this.contractOfferQueue = contractOfferQueue;
        this.params = {
            removeOnFail: true,
            removeOnComplete: true,
        };
    }
    addAcceptJob(payload) {
        this.contractOfferQueue.add(types_1.ContractOfferProcess.ACCEPT, payload, this.params);
    }
    addRejectJob(payload) {
        this.contractOfferQueue.add(types_1.ContractOfferProcess.REJECT, payload, this.params);
    }
    addSendJob(payload) {
        this.contractOfferQueue.add(types_1.ContractOfferProcess.SEND, payload, this.params);
    }
    addInstantBookingJob(payload) {
        this.contractOfferQueue.add(types_1.ContractOfferProcess.INSTANT_BOOKING, payload, this.params);
    }
    addTemporaryConcludeJob(payload) {
        this.contractOfferQueue.add(types_1.ContractOfferProcess.TEMPORARY_CONCLUDE, payload, this.params);
    }
    addTemporaryInstantBookingJob(payload) {
        this.contractOfferQueue.add(types_1.ContractOfferProcess.INSTANT_TEMPORARY_BOOKING, payload, this.params);
    }
};
ContractOfferQueue = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)(types_1.ContractBulls.CONTRACT_OFFER_QUEUE)),
    __metadata("design:paramtypes", [Object])
], ContractOfferQueue);
exports.ContractOfferQueue = ContractOfferQueue;
//# sourceMappingURL=contract-offer.queue.js.map