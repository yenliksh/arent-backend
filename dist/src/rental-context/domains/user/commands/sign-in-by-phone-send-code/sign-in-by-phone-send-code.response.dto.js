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
var SignInByPhoneSendCodeResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInByPhoneSendCodeResponse = void 0;
const openapi = require("@nestjs/swagger");
const ok_response_dto_1 = require("../../../../../libs/ddd/interface-adapters/dtos/ok.response.dto");
const graphql_1 = require("@nestjs/graphql");
const send_sms_code_rescriction_problem_1 = require("../../problems/send-sms-code-rescriction.problem");
let SignInByPhoneSendCodeResponse = SignInByPhoneSendCodeResponse_1 = class SignInByPhoneSendCodeResponse extends ok_response_dto_1.OkResponse {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const payload = new SignInByPhoneSendCodeResponse_1(props);
        payload.smscode = (props === null || props === void 0 ? void 0 : props.smscode) || null;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { smscode: { required: true, type: () => String, nullable: true }, problem: { required: false, type: () => require("../../problems/send-sms-code-rescriction.problem").SendSmsCodeRestrictionProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], SignInByPhoneSendCodeResponse.prototype, "smscode", void 0);
__decorate([
    (0, graphql_1.Field)(() => send_sms_code_rescriction_problem_1.SendSmsCodeRestrictionProblem, { nullable: true }),
    __metadata("design:type", send_sms_code_rescriction_problem_1.SendSmsCodeRestrictionProblem)
], SignInByPhoneSendCodeResponse.prototype, "problem", void 0);
SignInByPhoneSendCodeResponse = SignInByPhoneSendCodeResponse_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], SignInByPhoneSendCodeResponse);
exports.SignInByPhoneSendCodeResponse = SignInByPhoneSendCodeResponse;
//# sourceMappingURL=sign-in-by-phone-send-code.response.dto.js.map