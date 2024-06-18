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
var ContractSubscriptionResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractSubscriptionResponse = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../modules/graphql-subscriptions/types");
const graphql_1 = require("@nestjs/graphql");
const contract_model_1 = require("../models/contract.model");
let ContractSubscriptionResponse = ContractSubscriptionResponse_1 = class ContractSubscriptionResponse {
    static create(props, contractPubSubEvent, error) {
        const payload = new ContractSubscriptionResponse_1();
        payload.contract = contract_model_1.ContractChatModel.create(props);
        payload.error = error;
        payload.event = contractPubSubEvent;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { contract: { required: false, type: () => require("../models/contract.model").ContractChatModel }, event: { required: true, enum: require("../../../../modules/graphql-subscriptions/types").ContractPubSubEvent }, error: { required: false, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => contract_model_1.ContractChatModel, { nullable: true }),
    __metadata("design:type", contract_model_1.ContractChatModel)
], ContractSubscriptionResponse.prototype, "contract", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.ContractPubSubEvent),
    __metadata("design:type", String)
], ContractSubscriptionResponse.prototype, "event", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractSubscriptionResponse.prototype, "error", void 0);
ContractSubscriptionResponse = ContractSubscriptionResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ContractSubscriptionResponse);
exports.ContractSubscriptionResponse = ContractSubscriptionResponse;
//# sourceMappingURL=contract.subscription.response.dto.js.map