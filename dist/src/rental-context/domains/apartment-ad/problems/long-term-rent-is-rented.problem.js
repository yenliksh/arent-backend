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
exports.LongTermRentIsRentedProblem = void 0;
const localized_problem_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/localized-problem.base");
const types_1 = require("../../../../libs/problems/types");
const graphql_1 = require("@nestjs/graphql");
let LongTermRentIsRentedProblem = class LongTermRentIsRentedProblem extends localized_problem_base_1.LocalizedProblem {
    constructor() {
        super(types_1.ProblemTypes.LONG_TERM_RENT_IS_RENTED_PROBLEM);
    }
};
LongTermRentIsRentedProblem = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [])
], LongTermRentIsRentedProblem);
exports.LongTermRentIsRentedProblem = LongTermRentIsRentedProblem;
//# sourceMappingURL=long-term-rent-is-rented.problem.js.map