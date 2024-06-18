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
var ContractResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const contract_model_1 = require("../models/contract.model");
const contract_offer_already_exists_problem_1 = require("../problems/contract-offer-already-exists.problem");
let ContractResponse = ContractResponse_1 = class ContractResponse {
    static create(props) {
        const payload = new ContractResponse_1();
        payload.contract = contract_model_1.ContractChatModel.create(props);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { contract: { required: false, type: () => require("../models/contract.model").ContractChatModel }, problem: { required: false, type: () => require("../problems/contract-offer-already-exists.problem").ContractOfferAlreadyExistsProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => contract_model_1.ContractChatModel, { nullable: true }),
    __metadata("design:type", contract_model_1.ContractChatModel)
], ContractResponse.prototype, "contract", void 0);
__decorate([
    (0, graphql_1.Field)(() => contract_offer_already_exists_problem_1.ContractOfferAlreadyExistsProblem, { nullable: true }),
    __metadata("design:type", contract_offer_already_exists_problem_1.ContractOfferAlreadyExistsProblem)
], ContractResponse.prototype, "problem", void 0);
ContractResponse = ContractResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ContractResponse);
exports.ContractResponse = ContractResponse;
//# sourceMappingURL=contract.response.dto.js.map