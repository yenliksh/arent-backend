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
var SaveCardStartResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCardStartResponse = void 0;
const openapi = require("@nestjs/swagger");
const innopay_service_bad_request_problem_1 = require("../../../../infrastructure/problems/innopay-service-bad-request.problem");
const ok_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/ok.response.dto");
const graphql_1 = require("@nestjs/graphql");
let SaveCardStartResponse = SaveCardStartResponse_1 = class SaveCardStartResponse extends ok_response_dto_1.OkResponse {
    constructor(props) {
        super(props);
    }
    static create(prop) {
        const payload = new SaveCardStartResponse_1(prop);
        payload.url = prop.url;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { problem: { required: false, type: () => require("../../../../infrastructure/problems/innopay-service-bad-request.problem").InnopayServiceBadRequestProblem }, url: { required: false, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem, { nullable: true }),
    __metadata("design:type", innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem)
], SaveCardStartResponse.prototype, "problem", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SaveCardStartResponse.prototype, "url", void 0);
SaveCardStartResponse = SaveCardStartResponse_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], SaveCardStartResponse);
exports.SaveCardStartResponse = SaveCardStartResponse;
//# sourceMappingURL=save-card-start.response.dto.js.map