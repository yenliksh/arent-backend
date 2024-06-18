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
var PaymentTransactionResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionResponse = void 0;
const openapi = require("@nestjs/swagger");
const innopay_service_bad_request_problem_1 = require("../../../../infrastructure/problems/innopay-service-bad-request.problem");
const graphql_1 = require("@nestjs/graphql");
const payment_transaction_model_1 = require("../models/payment-transaction.model");
let PaymentTransactionResponse = PaymentTransactionResponse_1 = class PaymentTransactionResponse {
    static create(props) {
        const payload = new PaymentTransactionResponse_1();
        payload.paymentTransaction = payment_transaction_model_1.PaymentTransactionModel.create(props);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { paymentTransaction: { required: false, type: () => require("../models/payment-transaction.model").PaymentTransactionModel }, problem: { required: false, type: () => require("../../../../infrastructure/problems/innopay-service-bad-request.problem").InnopayServiceBadRequestProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => payment_transaction_model_1.PaymentTransactionModel, { nullable: true }),
    __metadata("design:type", payment_transaction_model_1.PaymentTransactionModel)
], PaymentTransactionResponse.prototype, "paymentTransaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem, { nullable: true }),
    __metadata("design:type", innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem)
], PaymentTransactionResponse.prototype, "problem", void 0);
PaymentTransactionResponse = PaymentTransactionResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], PaymentTransactionResponse);
exports.PaymentTransactionResponse = PaymentTransactionResponse;
//# sourceMappingURL=payment-transaction.response.dto.js.map