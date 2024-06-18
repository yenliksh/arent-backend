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
var SignInByPhoneConfirmCodeResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInByPhoneConfirmCodeResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../../models/user.model");
const invalid_verification_phone_code_problem_1 = require("../../problems/invalid-verification-phone-code.problem");
let SignInByPhoneConfirmCodeResponse = SignInByPhoneConfirmCodeResponse_1 = class SignInByPhoneConfirmCodeResponse {
    static create(props) {
        const payload = new SignInByPhoneConfirmCodeResponse_1();
        payload.user = props.user ? user_model_1.UserMeModel.create(props.user) : undefined;
        payload.refreshToken = props.refreshToken;
        payload.token = props.token;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: false, type: () => require("../../models/user.model").UserMeModel }, refreshToken: { required: false, type: () => String }, token: { required: false, type: () => String }, problem: { required: false, type: () => require("../../problems/invalid-verification-phone-code.problem").InvalidVerificationPhoneCodeProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => user_model_1.UserMeModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserMeModel)
], SignInByPhoneConfirmCodeResponse.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignInByPhoneConfirmCodeResponse.prototype, "refreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignInByPhoneConfirmCodeResponse.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)(() => invalid_verification_phone_code_problem_1.InvalidVerificationPhoneCodeProblem, { nullable: true }),
    __metadata("design:type", invalid_verification_phone_code_problem_1.InvalidVerificationPhoneCodeProblem)
], SignInByPhoneConfirmCodeResponse.prototype, "problem", void 0);
SignInByPhoneConfirmCodeResponse = SignInByPhoneConfirmCodeResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], SignInByPhoneConfirmCodeResponse);
exports.SignInByPhoneConfirmCodeResponse = SignInByPhoneConfirmCodeResponse;
//# sourceMappingURL=sign-in-by-phone-confirm-code.response.dto.js.map