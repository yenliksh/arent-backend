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
exports.ContractsAdminController = void 0;
const openapi = require("@nestjs/swagger");
const cancel_contract_by_admin_command_1 = require("../../../rental-context/domains/contract/commands/cancel-contract-by-admin/cancel-contract-by-admin.command");
const contract_orm_entity_1 = require("../../../infrastructure/database/entities/contract.orm-entity");
const guards_1 = require("../../../infrastructure/guards");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const minimal_unit_helper_1 = require("../../../libs/utils/minimal-unit.helper");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const contracts_admin_service_1 = require("./contracts-admin.service");
const contract_cancellation_request_dto_1 = require("./dtos/contract-cancellation.request.dto");
const contract_typeorm_entity_1 = require("./entities/contract.typeorm-entity");
let ContractsAdminController = class ContractsAdminController {
    constructor(service, commandBus) {
        this.service = service;
        this.commandBus = commandBus;
    }
    get base() {
        return this;
    }
    async getOne(req) {
        var _a, _b;
        const data = await ((_b = (_a = this.base).getOneBase) === null || _b === void 0 ? void 0 : _b.call(_a, req));
        if (!data) {
            return data;
        }
        return {
            ...data,
            cost: (0, minimal_unit_helper_1.toMinorUnit)(data.cost),
        };
    }
    async getMany(req) {
        var _a, _b;
        const data = await ((_b = (_a = this.base).getManyBase) === null || _b === void 0 ? void 0 : _b.call(_a, req));
        if (!data) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((i) => ({
                ...i,
                cost: (0, minimal_unit_helper_1.toMinorUnit)(i.cost),
            }));
        }
        return {
            ...data,
            data: data.data.map((i) => ({
                ...i,
                cost: (0, minimal_unit_helper_1.toMinorUnit)(i.cost),
            })),
        };
    }
    async cancel(input, contractId) {
        const result = await this.commandBus.execute(new cancel_contract_by_admin_command_1.CancelContractByAdminCommand({
            contractId: new uuid_value_object_1.UUID(contractId),
            trigger: input.requestingUserRole,
            adminCancelMeta: input.cancellationMeta,
        }));
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await contract_orm_entity_1.ContractOrmEntity.query().findById(result.unwrap().value);
        return queryResult;
    }
};
__decorate([
    (0, crud_1.Override)('getOneBase'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsAdminController.prototype, "getOne", null);
__decorate([
    (0, crud_1.Override)('getManyBase'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsAdminController.prototype, "getMany", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancel active contract',
    }),
    (0, swagger_1.ApiOkResponse)({ type: String }),
    (0, swagger_1.ApiBody)({ type: contract_cancellation_request_dto_1.ContractCancellationRequest }),
    (0, common_1.Post)(':id/cancel'),
    openapi.ApiResponse({ status: 201, type: require("../../../infrastructure/database/entities/contract.orm-entity").ContractOrmEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_cancellation_request_dto_1.ContractCancellationRequest, String]),
    __metadata("design:returntype", Promise)
], ContractsAdminController.prototype, "cancel", null);
ContractsAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.Contracts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: contract_typeorm_entity_1.ContractTypeormEntity,
        },
        query: {
            alwaysPaginate: true,
        },
        routes: {
            only: ['getManyBase', 'getOneBase'],
        },
        params: {
            id: {
                type: 'uuid',
                primary: true,
                field: 'id',
            },
        },
    }),
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)(types_1.TokenType.ADMIN)),
    (0, common_1.Controller)('admin-panel/contracts'),
    __metadata("design:paramtypes", [contracts_admin_service_1.ContractsAdminService, cqrs_1.CommandBus])
], ContractsAdminController);
exports.ContractsAdminController = ContractsAdminController;
//# sourceMappingURL=contracts-admin.controller.js.map