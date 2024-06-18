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
exports.ContractRequestQueryGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const contract_request_pagination_response_1 = require("../dtos/contract-request-pagination.response");
const find_contract_request_for_landlord_request_dto_1 = require("../queries/find-contract-request-for-landlord/find-contract-request-for-landlord.request.dto");
const find_contract_request_for_landlord_service_1 = require("../queries/find-contract-request-for-landlord/find-contract-request-for-landlord.service");
let ContractRequestQueryGraphqlResolver = class ContractRequestQueryGraphqlResolver {
    constructor(findForLandlordService) {
        this.findForLandlordService = findForLandlordService;
    }
    async findForLandlord(iam, input) {
        const result = await this.findForLandlordService.handle(iam.id, input);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return contract_request_pagination_response_1.ContractRequestPaginationResponse.create(result.unwrap());
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => contract_request_pagination_response_1.ContractRequestPaginationResponse, { name: 'contractRequest__forLandlord' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        find_contract_request_for_landlord_request_dto_1.FindContractRequestForLandlordRequest]),
    __metadata("design:returntype", Promise)
], ContractRequestQueryGraphqlResolver.prototype, "findForLandlord", null);
ContractRequestQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [find_contract_request_for_landlord_service_1.FindContractRequestForLandlordService])
], ContractRequestQueryGraphqlResolver);
exports.ContractRequestQueryGraphqlResolver = ContractRequestQueryGraphqlResolver;
//# sourceMappingURL=contract-request.query.resolver.js.map