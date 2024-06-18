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
var UserComplaintResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintResponse = void 0;
const openapi = require("@nestjs/swagger");
const ok_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/ok.response.dto");
const graphql_1 = require("@nestjs/graphql");
let UserComplaintResponse = UserComplaintResponse_1 = class UserComplaintResponse extends ok_response_dto_1.OkResponse {
    constructor(result) {
        super({ ok: result });
    }
    static create(result) {
        const payload = new UserComplaintResponse_1(result);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
};
UserComplaintResponse = UserComplaintResponse_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Boolean])
], UserComplaintResponse);
exports.UserComplaintResponse = UserComplaintResponse;
//# sourceMappingURL=user-complaint.response.dto.js.map