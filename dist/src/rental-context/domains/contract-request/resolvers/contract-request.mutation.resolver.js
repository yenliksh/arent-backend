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
exports.ContractRequestMutationGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const uuid_value_object_1 = require("../../../../libs/ddd/domain/value-objects/uuid.value-object");
const problem_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const accept_request_request_dto_1 = require("../commands/accept-request/accept-request.request.dto");
const accept_request_service_1 = require("../commands/accept-request/accept-request.service");
const reject_request_request_dto_1 = require("../commands/reject-request/reject-request.request.dto");
const reject_request_service_1 = require("../commands/reject-request/reject-request.service");
const send_request_email_response_dto_1 = require("../commands/send-request-email/send-request-email-response.dto");
const send_request_email_dto_1 = require("../commands/send-request-email/send-request-email.dto");
const send_request_email_service_1 = require("../commands/send-request-email/send-request-email.service");
const send_request_status_email_response_dto_1 = require("../commands/send-request-status-email/send-request-status-email-response.dto");
const send_request_status_email_dto_1 = require("../commands/send-request-status-email/send-request-status-email.dto");
const send_request_status_email_service_1 = require("../commands/send-request-status-email/send-request-status-email.service");
const send_request_request_dto_1 = require("../commands/send-request/send-request.request.dto");
const send_request_service_1 = require("../commands/send-request/send-request.service");
const contract_request_accept_response_dto_1 = require("../dtos/contract-request-accept.response.dto");
const contract_request_response_dto_1 = require("../dtos/contract-request.response.dto");
const find_contract_request_service_1 = require("../queries/find-contract-request/find-contract-request.service");
let ContractRequestMutationGraphqlResolver = class ContractRequestMutationGraphqlResolver {
    constructor(sendRequestService, acceptRequestService, rejectRequestService, findById, bookingRequestSent, bookingRequestStatusSent) {
        this.sendRequestService = sendRequestService;
        this.acceptRequestService = acceptRequestService;
        this.rejectRequestService = rejectRequestService;
        this.findById = findById;
        this.bookingRequestSent = bookingRequestSent;
        this.bookingRequestStatusSent = bookingRequestStatusSent;
    }
    async sendRequest(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_request_response_dto_1.ContractRequestResponse, async () => {
            const result = await this.sendRequestService.handle(new uuid_value_object_1.UUID(iam.id), input);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findById.handle(iam.id, { id: result.unwrap().value });
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_request_response_dto_1.ContractRequestResponse.create(queryResult.unwrap());
        });
    }
    async acceptRequest(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_request_accept_response_dto_1.ContractRequestAcceptResponse, async () => {
            const result = await this.acceptRequestService.handle(new uuid_value_object_1.UUID(iam.id), input);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const [contractRequestId, chatId] = result.unwrap();
            const queryResult = await this.findById.handle(iam.id, { id: contractRequestId.value });
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_request_accept_response_dto_1.ContractRequestAcceptResponse.create(queryResult.unwrap(), chatId.value);
        });
    }
    async rejectRequest(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(contract_request_response_dto_1.ContractRequestResponse, async () => {
            const result = await this.rejectRequestService.handle(new uuid_value_object_1.UUID(iam.id), input);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findById.handle(iam.id, { id: result.unwrap().value });
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return contract_request_response_dto_1.ContractRequestResponse.create(queryResult.unwrap());
        });
    }
    async sendRequestEmail(iam, input) {
        const result = await this.bookingRequestSent.handle(input.recipientId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return send_request_email_response_dto_1.SendRequestEmailResponse.create(result.unwrap());
    }
    async sendRequestStatusEmail(iam, input) {
        const result = await this.bookingRequestStatusSent.handle(input.recipientId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return send_request_status_email_response_dto_1.SendBookingRequestStatusEmailResponse.create(result.unwrap());
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_request_response_dto_1.ContractRequestResponse, {
        name: 'contract_request__send',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, send_request_request_dto_1.SendRequest]),
    __metadata("design:returntype", Promise)
], ContractRequestMutationGraphqlResolver.prototype, "sendRequest", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_request_accept_response_dto_1.ContractRequestAcceptResponse, {
        name: 'contract_request__accept',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, accept_request_request_dto_1.AcceptRequest]),
    __metadata("design:returntype", Promise)
], ContractRequestMutationGraphqlResolver.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => contract_request_response_dto_1.ContractRequestResponse, {
        name: 'contract_request__reject',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, reject_request_request_dto_1.RejectRequest]),
    __metadata("design:returntype", Promise)
], ContractRequestMutationGraphqlResolver.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => send_request_email_response_dto_1.SendRequestEmailResponse, {
        name: 'contract_request__sendEmail',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, send_request_email_dto_1.SendRequestEmail]),
    __metadata("design:returntype", Promise)
], ContractRequestMutationGraphqlResolver.prototype, "sendRequestEmail", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => send_request_status_email_response_dto_1.SendBookingRequestStatusEmailResponse, {
        name: 'contract_requestStatus__sendEmail',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, send_request_status_email_dto_1.SendRequestStatusEmail]),
    __metadata("design:returntype", Promise)
], ContractRequestMutationGraphqlResolver.prototype, "sendRequestStatusEmail", null);
ContractRequestMutationGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [send_request_service_1.SendRequestService,
        accept_request_service_1.AcceptRequestService,
        reject_request_service_1.RejectRequestService,
        find_contract_request_service_1.FindContractRequestService,
        send_request_email_service_1.SendRequestEmailService,
        send_request_status_email_service_1.SendBookingRequestStatusEmailService])
], ContractRequestMutationGraphqlResolver);
exports.ContractRequestMutationGraphqlResolver = ContractRequestMutationGraphqlResolver;
//# sourceMappingURL=contract-request.mutation.resolver.js.map