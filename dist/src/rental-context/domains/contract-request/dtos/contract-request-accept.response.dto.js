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
var ContractRequestAcceptResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestAcceptResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const contract_request_model_1 = require("../models/contract-request.model");
const contract_request_already_exists_problem_1 = require("../problems/contract-request-already-exists.problem");
let ContractRequestAcceptResponse = ContractRequestAcceptResponse_1 = class ContractRequestAcceptResponse {
    static create(prop, chatId) {
        const payload = new ContractRequestAcceptResponse_1();
        payload.contractRequest = contract_request_model_1.ContractRequestModel.create(prop);
        payload.chatId = chatId;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { contractRequest: { required: false, type: () => require("../models/contract-request.model").ContractRequestModel }, chatId: { required: false, type: () => String }, problem: { required: false, type: () => require("../problems/contract-request-already-exists.problem").ContractRequestAlreadyExistsProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => contract_request_model_1.ContractRequestModel, { nullable: true }),
    __metadata("design:type", contract_request_model_1.ContractRequestModel)
], ContractRequestAcceptResponse.prototype, "contractRequest", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractRequestAcceptResponse.prototype, "chatId", void 0);
__decorate([
    (0, graphql_1.Field)(() => contract_request_already_exists_problem_1.ContractRequestAlreadyExistsProblem, { nullable: true }),
    __metadata("design:type", contract_request_already_exists_problem_1.ContractRequestAlreadyExistsProblem)
], ContractRequestAcceptResponse.prototype, "problem", void 0);
ContractRequestAcceptResponse = ContractRequestAcceptResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ContractRequestAcceptResponse);
exports.ContractRequestAcceptResponse = ContractRequestAcceptResponse;
//# sourceMappingURL=contract-request-accept.response.dto.js.map