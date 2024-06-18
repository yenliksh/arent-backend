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
exports.InnopayServiceBadRequestProblem = void 0;
const localized_problem_base_1 = require("../../libs/ddd/interface-adapters/base-classes/localized-problem.base");
const types_1 = require("../../libs/problems/types");
const graphql_1 = require("@nestjs/graphql");
let InnopayServiceBadRequestProblem = class InnopayServiceBadRequestProblem extends localized_problem_base_1.LocalizedProblem {
    constructor(errorDescription) {
        super(types_1.ProblemTypes.INNOPAY_SERVICE_BAD_REQUEST, { errorDescription });
    }
};
InnopayServiceBadRequestProblem = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String])
], InnopayServiceBadRequestProblem);
exports.InnopayServiceBadRequestProblem = InnopayServiceBadRequestProblem;
//# sourceMappingURL=innopay-service-bad-request.problem.js.map