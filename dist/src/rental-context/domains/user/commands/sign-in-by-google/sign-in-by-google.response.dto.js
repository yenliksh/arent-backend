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
var SignInByGoogleResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInByGoogleResponse = void 0;
const openapi = require("@nestjs/swagger");
const undefined_return_google_oauth_problem_1 = require("../../problems/undefined-return-google-oauth.problem");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../../models/user.model");
let SignInByGoogleResponse = SignInByGoogleResponse_1 = class SignInByGoogleResponse {
    static create(props) {
        const payload = new SignInByGoogleResponse_1();
        payload.user = props.user ? user_model_1.UserMeModel.create(props.user) : undefined;
        payload.refreshToken = props.refreshToken;
        payload.token = props.token;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: false, type: () => require("../../models/user.model").UserMeModel }, refreshToken: { required: false, type: () => String }, token: { required: false, type: () => String }, problem: { required: false, type: () => require("../../problems/undefined-return-google-oauth.problem").UndefinedReturnGoogleOauthProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => user_model_1.UserMeModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserMeModel)
], SignInByGoogleResponse.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignInByGoogleResponse.prototype, "refreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignInByGoogleResponse.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)(() => undefined_return_google_oauth_problem_1.UndefinedReturnGoogleOauthProblem, { nullable: true }),
    __metadata("design:type", undefined_return_google_oauth_problem_1.UndefinedReturnGoogleOauthProblem)
], SignInByGoogleResponse.prototype, "problem", void 0);
SignInByGoogleResponse = SignInByGoogleResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], SignInByGoogleResponse);
exports.SignInByGoogleResponse = SignInByGoogleResponse;
//# sourceMappingURL=sign-in-by-google.response.dto.js.map