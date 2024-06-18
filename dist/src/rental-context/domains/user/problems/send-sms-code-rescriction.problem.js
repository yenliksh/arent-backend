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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSmsCodeRestrictionProblem = void 0;
const localized_problem_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/localized-problem.base");
const types_1 = require("../../../../libs/problems/types");
const graphql_1 = require("@nestjs/graphql");
let SendSmsCodeRestrictionProblem = class SendSmsCodeRestrictionProblem extends localized_problem_base_1.LocalizedProblem {
    constructor(secondsLeftToSendAgain) {
        super(types_1.ProblemTypes.SEND_SMS_CODE_RESTRICTION_PROBLEM, {
            secondsLeftToSendAgain,
        });
    }
};
SendSmsCodeRestrictionProblem = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Number])
], SendSmsCodeRestrictionProblem);
exports.SendSmsCodeRestrictionProblem = SendSmsCodeRestrictionProblem;
//# sourceMappingURL=send-sms-code-rescriction.problem.js.map