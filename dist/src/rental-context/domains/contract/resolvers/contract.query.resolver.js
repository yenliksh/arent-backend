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
exports.ContractQueryGraphqlResolver = void 0;
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const tenant_contracts_pagination_response_1 = require("../dtos/tenant-contracts-pagination.response");
const contract_model_1 = require("../models/contract.model");
const find_contract_request_1 = require("../queries/find-contract/find-contract.request");
const landlord_active_rent_contracts_service_1 = require("../queries/landlord-active-rent-contracts/landlord-active-rent-contracts.service");
const landlord_contract_service_1 = require("../queries/landlord-contract/landlord-contract.service");
const tenant_contract_cancelation_info_request_1 = require("../queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.request");
const tenant_contract_cancelation_info_response_1 = require("../queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.response");
const tenant_contract_cancelation_info_service_1 = require("../queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.service");
const tenant_contract_payment_info_request_1 = require("../queries/tenant-contract-payment-info/tenant-contract-payment-info.request");
const tenant_contract_payment_info_response_1 = require("../queries/tenant-contract-payment-info/tenant-contract-payment-info.response");
const tenant_contract_payment_info_service_1 = require("../queries/tenant-contract-payment-info/tenant-contract-payment-info.service");
const tenant_contract_service_1 = require("../queries/tenant-contract/tenant-contract.service");
const tenant_long_term_rent_contracts_request_dto_1 = require("../queries/tenant-long-term-rent-contracts/tenant-long-term-rent-contracts.request.dto");
const tenant_long_term_rent_contracts_service_1 = require("../queries/tenant-long-term-rent-contracts/tenant-long-term-rent-contracts.service");
const tenant_short_term_rent_contracts_request_dto_1 = require("../queries/tenant-short-term-rent-contracts/tenant-short-term-rent-contracts.request.dto");
const tenant_short_term_rent_contracts_service_1 = require("../queries/tenant-short-term-rent-contracts/tenant-short-term-rent-contracts.service");
let ContractQueryGraphqlResolver = class ContractQueryGraphqlResolver {
    constructor(landlordActiveRentContractsService, landlordContractService, tenantContractService, tenantLongTermRentContractsService, tenantShortTermRentContractsService, tenantContractPaymentInfoService, tenantContractCancelationInfoService) {
        this.landlordActiveRentContractsService = landlordActiveRentContractsService;
        this.landlordContractService = landlordContractService;
        this.tenantContractService = tenantContractService;
        this.tenantLongTermRentContractsService = tenantLongTermRentContractsService;
        this.tenantShortTermRentContractsService = tenantShortTermRentContractsService;
        this.tenantContractPaymentInfoService = tenantContractPaymentInfoService;
        this.tenantContractCancelationInfoService = tenantContractCancelationInfoService;
    }
    async landlordActiveRentContract(userId, input) {
        const result = await this.landlordContractService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return contract_model_1.ContractLandlordModel.create(result.unwrap());
    }
    async tenantActiveRentContract(userId, input) {
        const result = await this.tenantContractService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return contract_model_1.ContractTenantModel.create(result.unwrap());
    }
    async landlordActiveRentContracts(userId) {
        const result = await this.landlordActiveRentContractsService.handle(userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return result.unwrap().map((i) => contract_model_1.ContractLandlordModel.create(i));
    }
    async tenantShortTermRentContracts(userId, input) {
        const result = await this.tenantShortTermRentContractsService.handle(userId, input);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return tenant_contracts_pagination_response_1.TenantContractsPaginationResponse.create(result.unwrap());
    }
    async tenantLongTermRentContracts(userId, input) {
        const result = await this.tenantLongTermRentContractsService.handle(userId, input);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return tenant_contracts_pagination_response_1.TenantContractsPaginationResponse.create(result.unwrap());
    }
    async tenantPaymentInfo(userId, input) {
        const result = await this.tenantContractPaymentInfoService.handle(input, userId);
        return tenant_contract_payment_info_response_1.TenantContractPaymentInfoResponse.create(result);
    }
    async tenantCancelationInfo(userId, input) {
        const result = await this.tenantContractCancelationInfoService.handle(input, userId);
        return tenant_contract_cancelation_info_response_1.TenantContractCancelationInfoResponse.create(result);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => contract_model_1.ContractLandlordModel, { name: 'contract__landlord_find' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_contract_request_1.FindContractRequest]),
    __metadata("design:returntype", Promise)
], ContractQueryGraphqlResolver.prototype, "landlordActiveRentContract", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => contract_model_1.ContractTenantModel, { name: 'contract__tenant_find' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_contract_request_1.FindContractRequest]),
    __metadata("design:returntype", Promise)
], ContractQueryGraphqlResolver.prototype, "tenantActiveRentContract", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => [contract_model_1.ContractLandlordModel], { name: 'contract__landlord_activeRents' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractQueryGraphqlResolver.prototype, "landlordActiveRentContracts", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => tenant_contracts_pagination_response_1.TenantContractsPaginationResponse, { name: 'contract__tenant_shortTermRents' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tenant_short_term_rent_contracts_request_dto_1.TenantShortTermRentContractsRequest]),
    __metadata("design:returntype", Promise)
], ContractQueryGraphqlResolver.prototype, "tenantShortTermRentContracts", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => tenant_contracts_pagination_response_1.TenantContractsPaginationResponse, { name: 'contract__tenant_longTermRents' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tenant_long_term_rent_contracts_request_dto_1.TenantLongTermRentContractsRequest]),
    __metadata("design:returntype", Promise)
], ContractQueryGraphqlResolver.prototype, "tenantLongTermRentContracts", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => tenant_contract_payment_info_response_1.TenantContractPaymentInfoResponse, { name: 'contract__tenant_paymentInfo' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tenant_contract_payment_info_request_1.TenantContractPaymentInfoRequest]),
    __metadata("design:returntype", Promise)
], ContractQueryGraphqlResolver.prototype, "tenantPaymentInfo", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => tenant_contract_cancelation_info_response_1.TenantContractCancelationInfoResponse, { name: 'contract__tenant_cancelationInfo' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tenant_contract_cancelation_info_request_1.TenantContractCancelationInfoRequest]),
    __metadata("design:returntype", Promise)
], ContractQueryGraphqlResolver.prototype, "tenantCancelationInfo", null);
ContractQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [landlord_active_rent_contracts_service_1.LandlordActiveRentContractsService,
        landlord_contract_service_1.LandlordContractService,
        tenant_contract_service_1.TenantContractService,
        tenant_long_term_rent_contracts_service_1.TenantLongTermRentContractsService,
        tenant_short_term_rent_contracts_service_1.TenantShortTermRentContractsService,
        tenant_contract_payment_info_service_1.TenantContractPaymentInfoService,
        tenant_contract_cancelation_info_service_1.TenantContractCancelationInfoService])
], ContractQueryGraphqlResolver);
exports.ContractQueryGraphqlResolver = ContractQueryGraphqlResolver;
//# sourceMappingURL=contract.query.resolver.js.map