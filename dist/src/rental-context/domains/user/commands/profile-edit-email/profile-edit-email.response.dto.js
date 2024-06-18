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
var ProfileEditEmailResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileEditEmailResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../../models/user.model");
const email_already_used_problem_1 = require("../../problems/email-already-used.problem");
let ProfileEditEmailResponse = ProfileEditEmailResponse_1 = class ProfileEditEmailResponse {
    static create(props) {
        const payload = new ProfileEditEmailResponse_1();
        payload.user = user_model_1.UserMeModel.create(props);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: false, type: () => require("../../models/user.model").UserMeModel }, problem: { required: false, type: () => require("../../problems/email-already-used.problem").EmailAlreadyUsedProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => user_model_1.UserMeModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserMeModel)
], ProfileEditEmailResponse.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => email_already_used_problem_1.EmailAlreadyUsedProblem, { nullable: true }),
    __metadata("design:type", email_already_used_problem_1.EmailAlreadyUsedProblem)
], ProfileEditEmailResponse.prototype, "problem", void 0);
ProfileEditEmailResponse = ProfileEditEmailResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ProfileEditEmailResponse);
exports.ProfileEditEmailResponse = ProfileEditEmailResponse;
//# sourceMappingURL=profile-edit-email.response.dto.js.map