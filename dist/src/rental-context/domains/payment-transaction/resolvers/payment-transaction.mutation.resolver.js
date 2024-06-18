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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionMutationGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const uuid_value_object_1 = require("../../../../libs/ddd/domain/value-objects/uuid.value-object");
const problem_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const graphql_1 = require("@nestjs/graphql");
const tenant_manually_pay_command_1 = require("../commands/tenant-manually-pay/tenant-manually-pay.command");
const tenant_manually_pay_request_dto_1 = require("../commands/tenant-manually-pay/tenant-manually-pay.request.dto");
const payment_transaction_response_dto_1 = require("../dtos/payment-transaction.response.dto");
const find_payment_transaction_service_1 = require("../queries/find-payment-transaction/find-payment-transaction.service");
let PaymentTransactionMutationGraphqlResolver = class PaymentTransactionMutationGraphqlResolver {
    constructor(commandBus, findByIdService) {
        this.commandBus = commandBus;
        this.findByIdService = findByIdService;
    }
    async withdrawMoneyFromTenant(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(payment_transaction_response_dto_1.PaymentTransactionResponse, async () => {
            const result = await this.commandBus.execute(new tenant_manually_pay_command_1.TenantManuallyPayCommand(new uuid_value_object_1.UUID(input.id), new uuid_value_object_1.UUID(iam.id)));
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle(result.unwrap(), new uuid_value_object_1.UUID(iam.id));
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return payment_transaction_response_dto_1.PaymentTransactionResponse.create(queryResult.unwrap());
        });
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => payment_transaction_response_dto_1.PaymentTransactionResponse, { name: 'paymentTransaction__tenant_manuallyPay' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        tenant_manually_pay_request_dto_1.TenantManuallyPayRequest]),
    __metadata("design:returntype", Promise)
], PaymentTransactionMutationGraphqlResolver.prototype, "withdrawMoneyFromTenant", null);
PaymentTransactionMutationGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus, find_payment_transaction_service_1.FindPaymentTransactionService])
], PaymentTransactionMutationGraphqlResolver);
exports.PaymentTransactionMutationGraphqlResolver = PaymentTransactionMutationGraphqlResolver;
//# sourceMappingURL=payment-transaction.mutation.resolver.js.map