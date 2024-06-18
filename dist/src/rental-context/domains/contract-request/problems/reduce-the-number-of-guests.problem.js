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
exports.ReduceTheNumberOfGuestsProblem = void 0;
const localized_problem_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/localized-problem.base");
const types_1 = require("../../../../libs/problems/types");
const graphql_1 = require("@nestjs/graphql");
let ReduceTheNumberOfGuestsProblem = class ReduceTheNumberOfGuestsProblem extends localized_problem_base_1.LocalizedProblem {
    constructor(numberOfGuests) {
        super(types_1.ProblemTypes.REDUCE_THE_NUMBER_OF_GUESTS_PROBLEM, { numberOfGuests });
    }
};
ReduceTheNumberOfGuestsProblem = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Number])
], ReduceTheNumberOfGuestsProblem);
exports.ReduceTheNumberOfGuestsProblem = ReduceTheNumberOfGuestsProblem;
//# sourceMappingURL=reduce-the-number-of-guests.problem.js.map