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
var InnopayCardResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardResponse = exports.InnopayBadRequestAndDeletingCardIsActiveProblem = void 0;
const openapi = require("@nestjs/swagger");
const innopay_service_bad_request_problem_1 = require("../../../../infrastructure/problems/innopay-service-bad-request.problem");
const ok_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/ok.response.dto");
const graphql_1 = require("@nestjs/graphql");
const innopay_card_entity_1 = require("../domain/entities/innopay-card.entity");
const deleting_card_is_active_problem_1 = require("../problems/deleting-card-is-active.problem");
exports.InnopayBadRequestAndDeletingCardIsActiveProblem = (0, graphql_1.createUnionType)({
    name: 'InnopayBadRequestAndDeletingCardIsActiveProblem',
    types: () => [innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem, deleting_card_is_active_problem_1.DeletingCardIsActiveProblem],
});
let InnopayCardResponse = InnopayCardResponse_1 = class InnopayCardResponse extends ok_response_dto_1.OkResponse {
    constructor(innopay) {
        super({ ok: !!(innopay === null || innopay === void 0 ? void 0 : innopay.id.value) });
    }
    static create(prop) {
        const payload = new InnopayCardResponse_1(prop);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { problem: { required: false, type: () => Object } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => exports.InnopayBadRequestAndDeletingCardIsActiveProblem, { nullable: true }),
    __metadata("design:type", Object)
], InnopayCardResponse.prototype, "problem", void 0);
InnopayCardResponse = InnopayCardResponse_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [innopay_card_entity_1.InnopayCardEntity])
], InnopayCardResponse);
exports.InnopayCardResponse = InnopayCardResponse;
//# sourceMappingURL=innopay-card.response.dto.js.map