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
exports.ContractMutationGraphqlResolver = void 0;
const innopay_card_model_1 = require("../../innopay-card/models/innopay-card.model");
const find_my_card_service_1 = require("../../innopay-card/queries/find-my-card/find-my-card.service");
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const uuid_value_object_1 = require("../../../../libs/ddd/domain/value-objects/uuid.value-object");
const problem_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const accept_contract_offer_request_dto_1 = require("../commands/accept-contract-offer/accept-contract-offer.request.dto");
const accept_contract_offer_service_1 = require("../commands/accept-contract-offer/accept-contract-offer.service");
const cancel_contract_by_tenant_request_dto_1 = require("../commands/cancel-contract-by-tenant/cancel-contract-by-tenant.request.dto");
const cancel_contract_by_tenant_service_1 = require("../commands/cancel-contract-by-tenant/cancel-contract-by-tenant.service");
const change_tenant_payment_method_request_dto_1 = require("../commands/change-tenant-payment-method/change-tenant-payment-method.request.dto");
const change_tenant_payment_method_service_1 = require("../commands/change-tenant-payment-method/change-tenant-payment-method.service");
const contract_temporary_conclude_request_1 = require("../commands/contract-temporary-conclude/contract-temporary-conclude.request");
const contract_temporary_conclude_service_1 = require("../commands/contract-temporary-conclude/contract-temporary-conclude.service");
const contract_temporary_instant_conclude_request_1 = require("../commands/contract-temporary-instant-conclude/contract-temporary-instant-conclude.request");
const contract_temporary_instant_conclude_service_1 = require("../commands/contract-temporary-instant-conclude/contract-temporary-instant-conclude.service");
const reject_contract_offer_request_dto_1 = require("../commands/reject-contract-offer/reject-contract-offer.request.dto");
const reject_contract_offer_service_1 = require("../commands/reject-contract-offer/reject-contract-offer.service");
const send_contract_offer_email_response_dto_1 = require("../commands/send-contract-offer-email/send-contract-offer-email-response.dto");
const send_contract_offer_email_dto_1 = require("../commands/send-contract-offer-email/send-contract-offer-email.dto");
const send_contract_offer_email_service_1 = require("../commands/send-contract-offer-email/send-contract-offer-email.service");
const send_contract_offer_status_email_1 = require("../commands/send-contract-offer-status-email/send-contract-offer-status-email");
const send_contract_offer_status_email_response_1 = require("../commands/send-contract-offer-status-email/send-contract-offer-status-email.response");
const send_contract_offer_status_email_service_1 = require("../commands/send-contract-offer-status-email/send-contract-offer-status-email.service");
const send_contract_offer_request_dto_1 = require("../commands/send-contract-offer/send-contract-offer.request.dto");
const send_contract_offer_service_1 = require("../commands/send-contract-offer/send-contract-offer.service");
const contract_response_dto_1 = require("../dtos/contract.response.dto");
const find_contract_service_1 = require("../queries/find-contract/find-contract.service");
let ContractMutationGraphqlResolver = class ContractMutationGraphqlResolver {
    constructor(sendOfferService, acceptOfferService, rejectOfferService, changeTenantPaymentMethodService, cancelContractByTenantService, contractTemporaryConcludeService, contractTemporaryInstantConcludeService, findByIdService, findMyCardByIdService, sendContractOfferStatusEmailService, sendContractOfferEmailService) {
        this.sendOfferService = sendOfferService;
        this.acceptOfferService = acceptOfferService;
        this.rejectOfferService = rejectOfferService;
        this.changeTenantPaymentMethodService = changeTenantPaymentMethodService;
        this.cancelContractByTenantService = cancelContractByTenantService;
        this.contractTemporaryConcludeService = contractTemporaryConcludeService;
        this.contractTemporaryInstantConcludeService = contractTemporaryInstantConcludeService;
        this.findByIdService = findByIdService;
        this.findMyCardByIdService = findMyCardByIdService;
        this.sendContractOfferStatusEmailService = sendContractOfferStatusEmailService;
        this.sendContractOfferEmailService = sendContractOfferEmailService;
    }
    async temporaryConclude(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_response_dto_1.ContractResponse, async () => {
            const result = await this.contractTemporaryConcludeService.handle(input, iam.id);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_response_dto_1.ContractResponse.create(queryResult.unwrap());
        });
    }
    async temporaryInstantBooking(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_response_dto_1.ContractResponse, async () => {
            const result = await this.contractTemporaryInstantConcludeService.handle(input, iam.id);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_response_dto_1.ContractResponse.create(queryResult.unwrap());
        });
    }
    async sendOffer(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_response_dto_1.ContractResponse, async () => {
            const result = await this.sendOfferService.handle(input, new uuid_value_object_1.UUID(iam.id));
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_response_dto_1.ContractResponse.create(queryResult.unwrap());
        });
    }
    async acceptOffer(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_response_dto_1.ContractResponse, async () => {
            const result = await this.acceptOfferService.handle(input, iam.id);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_response_dto_1.ContractResponse.create(queryResult.unwrap());
        });
    }
    async rejectOffer(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_response_dto_1.ContractResponse, async () => {
            const result = await this.rejectOfferService.handle(input, iam.id);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_response_dto_1.ContractResponse.create(queryResult.unwrap());
        });
    }
    async changeTenantPaymentMethod(iam, input) {
        const result = await this.changeTenantPaymentMethodService.handle(input, iam.id);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyCardByIdService.handle({ id: result.unwrap().value }, iam.id);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return innopay_card_model_1.InnopayCardModel.create(queryResult.unwrap());
    }
    async cancelByTenant(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_response_dto_1.ContractResponse, async () => {
            const result = await this.cancelContractByTenantService.handle(input, iam.id);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_response_dto_1.ContractResponse.create(queryResult.unwrap());
        });
    }
    async sendContractStatusEmail(input) {
        const result = await this.sendContractOfferStatusEmailService.handle(input.recipientId, input.isLandLord);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return send_contract_offer_status_email_response_1.SendContractOfferStatusEmailResponse.create(result.unwrap());
    }
    async sendRequestEmail(iam, input) {
        const result = await this.sendContractOfferEmailService.handle(input.recipientId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return send_contract_offer_email_response_dto_1.SendContractOfferEmailResponse.create(result.unwrap());
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_response_dto_1.ContractResponse, { name: 'contractOffer__acceptByNewCard' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        contract_temporary_conclude_request_1.ContractTemporaryConcludeRequest]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "temporaryConclude", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_response_dto_1.ContractResponse, { name: 'contractInstantBooking__byNewCard' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        contract_temporary_instant_conclude_request_1.ContractTemporaryInstantConcludeRequest]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "temporaryInstantBooking", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_response_dto_1.ContractResponse, { name: 'contractOffer__send' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        send_contract_offer_request_dto_1.SendContractOfferRequest]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "sendOffer", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_response_dto_1.ContractResponse, { name: 'contractOffer__accept' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        accept_contract_offer_request_dto_1.AcceptContractOfferRequest]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "acceptOffer", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_response_dto_1.ContractResponse, { name: 'contractOffer__reject' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        reject_contract_offer_request_dto_1.RejectContractOfferRequest]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "rejectOffer", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => innopay_card_model_1.InnopayCardModel, { name: 'contractTenantPaymentMethod__change' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        change_tenant_payment_method_request_dto_1.ChangeTenantPaymentMethodRequest]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "changeTenantPaymentMethod", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_response_dto_1.ContractResponse, { name: 'contractTenant__cancel' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        cancel_contract_by_tenant_request_dto_1.CancelContractByTenantRequest]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "cancelByTenant", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => send_contract_offer_status_email_response_1.SendContractOfferStatusEmailResponse, {
        name: 'contractOfferStatus__sendEmail',
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_contract_offer_status_email_1.SendOfferStatusEmail]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "sendContractStatusEmail", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => send_contract_offer_email_response_dto_1.SendContractOfferEmailResponse, {
        name: 'contractOffer__sendEmail',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, send_contract_offer_email_dto_1.SendOfferEmail]),
    __metadata("design:returntype", Promise)
], ContractMutationGraphqlResolver.prototype, "sendRequestEmail", null);
ContractMutationGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [send_contract_offer_service_1.SendContractOfferService,
        accept_contract_offer_service_1.AcceptContractOfferService,
        reject_contract_offer_service_1.RejectContractOfferService,
        change_tenant_payment_method_service_1.ChangeTenantPaymentMethodService,
        cancel_contract_by_tenant_service_1.CancelContractByTenantService,
        contract_temporary_conclude_service_1.ContractTemporaryConcludeService,
        contract_temporary_instant_conclude_service_1.ContractTemporaryInstantConcludeService,
        find_contract_service_1.FindContractService,
        find_my_card_service_1.FindMyCardService,
        send_contract_offer_status_email_service_1.SendContractOfferStatusEmailService,
        send_contract_offer_email_service_1.SendContractOfferEmailService])
], ContractMutationGraphqlResolver);
exports.ContractMutationGraphqlResolver = ContractMutationGraphqlResolver;
//# sourceMappingURL=contract.mutation.resolver.js.map