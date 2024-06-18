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
var SendContractOfferStatusEmailResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendContractOfferStatusEmailResponse = void 0;
const ok_response_dto_1 = require("../../../../../libs/ddd/interface-adapters/dtos/ok.response.dto");
const graphql_1 = require("@nestjs/graphql");
let SendContractOfferStatusEmailResponse = SendContractOfferStatusEmailResponse_1 = class SendContractOfferStatusEmailResponse extends ok_response_dto_1.OkResponse {
    constructor(response) {
        super({ ok: !!response });
    }
    static create(response) {
        const payload = new SendContractOfferStatusEmailResponse_1(response);
        return payload;
    }
};
SendContractOfferStatusEmailResponse = SendContractOfferStatusEmailResponse_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String])
], SendContractOfferStatusEmailResponse);
exports.SendContractOfferStatusEmailResponse = SendContractOfferStatusEmailResponse;
//# sourceMappingURL=send-contract-offer-status-email.response.js.map