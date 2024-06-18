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
var SaveCardEndResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCardEndResponse = exports.InnopayBadRequestAndUserHasCardProblem = void 0;
const openapi = require("@nestjs/swagger");
const innopay_service_bad_request_problem_1 = require("../../../../infrastructure/problems/innopay-service-bad-request.problem");
const graphql_1 = require("@nestjs/graphql");
const innopay_card_model_1 = require("../models/innopay-card.model");
const user_already_has_this_card_problem_1 = require("../problems/user-already-has-this-card.problem");
exports.InnopayBadRequestAndUserHasCardProblem = (0, graphql_1.createUnionType)({
    name: 'InnopayBadRequestAndUserHasCardProblem',
    types: () => [innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem, user_already_has_this_card_problem_1.UserAlreadyHasThisCardProblem],
});
let SaveCardEndResponse = SaveCardEndResponse_1 = class SaveCardEndResponse {
    static create(prop) {
        const payload = new SaveCardEndResponse_1();
        payload.card = innopay_card_model_1.InnopayCardModel.create(prop);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { card: { required: false, type: () => require("../models/innopay-card.model").InnopayCardModel }, problem: { required: false, type: () => Object } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => innopay_card_model_1.InnopayCardModel, { nullable: true }),
    __metadata("design:type", innopay_card_model_1.InnopayCardModel)
], SaveCardEndResponse.prototype, "card", void 0);
__decorate([
    (0, graphql_1.Field)(() => exports.InnopayBadRequestAndUserHasCardProblem, { nullable: true }),
    __metadata("design:type", Object)
], SaveCardEndResponse.prototype, "problem", void 0);
SaveCardEndResponse = SaveCardEndResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], SaveCardEndResponse);
exports.SaveCardEndResponse = SaveCardEndResponse;
//# sourceMappingURL=save-card-end.response.dto.js.map