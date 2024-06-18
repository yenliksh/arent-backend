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
var ContractRequestResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestResponse = exports.ContractRequestProblems = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const contract_request_model_1 = require("../models/contract-request.model");
const chosen_dates_is_not_available_problem_1 = require("../problems/chosen-dates-is-not-available.problem");
const contract_request_already_exists_problem_1 = require("../problems/contract-request-already-exists.problem");
const reduce_the_number_of_guests_problem_1 = require("../problems/reduce-the-number-of-guests.problem");
const specify_payment_method_problem_1 = require("../problems/specify-payment-method.problem");
exports.ContractRequestProblems = (0, graphql_1.createUnionType)({
    name: 'ContractRequestProblems',
    types: () => [
        chosen_dates_is_not_available_problem_1.ChosenDatesIsNotAvailableProblem,
        reduce_the_number_of_guests_problem_1.ReduceTheNumberOfGuestsProblem,
        specify_payment_method_problem_1.SpecifyPaymentMethodProblem,
        contract_request_already_exists_problem_1.ContractRequestAlreadyExistsProblem,
    ],
});
let ContractRequestResponse = ContractRequestResponse_1 = class ContractRequestResponse {
    static create(prop) {
        const payload = new ContractRequestResponse_1();
        payload.contractRequest = contract_request_model_1.ContractRequestModel.create(prop);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { contractRequest: { required: false, type: () => require("../models/contract-request.model").ContractRequestModel }, problem: { required: false, type: () => Object } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => contract_request_model_1.ContractRequestModel, { nullable: true }),
    __metadata("design:type", contract_request_model_1.ContractRequestModel)
], ContractRequestResponse.prototype, "contractRequest", void 0);
__decorate([
    (0, graphql_1.Field)(() => exports.ContractRequestProblems, { nullable: true }),
    __metadata("design:type", Object)
], ContractRequestResponse.prototype, "problem", void 0);
ContractRequestResponse = ContractRequestResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ContractRequestResponse);
exports.ContractRequestResponse = ContractRequestResponse;
//# sourceMappingURL=contract-request.response.dto.js.map