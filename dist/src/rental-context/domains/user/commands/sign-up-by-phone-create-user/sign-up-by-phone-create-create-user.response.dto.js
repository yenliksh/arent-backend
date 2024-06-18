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
var SignUpByPhoneCreateUserResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpByPhoneCreateUserResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../../models/user.model");
const email_already_used_problem_1 = require("../../problems/email-already-used.problem");
let SignUpByPhoneCreateUserResponse = SignUpByPhoneCreateUserResponse_1 = class SignUpByPhoneCreateUserResponse {
    static create(props) {
        const payload = new SignUpByPhoneCreateUserResponse_1();
        payload.user = props.user ? user_model_1.UserMeModel.create(props.user) : undefined;
        payload.refreshToken = props.refreshToken;
        payload.token = props.token;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: false, type: () => require("../../models/user.model").UserMeModel }, token: { required: false, type: () => String }, refreshToken: { required: false, type: () => String }, problem: { required: false, type: () => require("../../problems/email-already-used.problem").EmailAlreadyUsedProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => user_model_1.UserMeModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserMeModel)
], SignUpByPhoneCreateUserResponse.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignUpByPhoneCreateUserResponse.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignUpByPhoneCreateUserResponse.prototype, "refreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => email_already_used_problem_1.EmailAlreadyUsedProblem, { nullable: true }),
    __metadata("design:type", email_already_used_problem_1.EmailAlreadyUsedProblem)
], SignUpByPhoneCreateUserResponse.prototype, "problem", void 0);
SignUpByPhoneCreateUserResponse = SignUpByPhoneCreateUserResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], SignUpByPhoneCreateUserResponse);
exports.SignUpByPhoneCreateUserResponse = SignUpByPhoneCreateUserResponse;
//# sourceMappingURL=sign-up-by-phone-create-create-user.response.dto.js.map