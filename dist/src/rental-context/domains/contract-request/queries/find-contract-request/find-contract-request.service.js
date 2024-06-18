"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindContractRequestService = void 0;
const contract_request_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract-request.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let FindContractRequestService = class FindContractRequestService {
    async handle(userId, dto) {
        const { id } = dto;
        const contractRequest = await contract_request_orm_entity_1.ContractRequestOrmEntity.query()
            .rightJoinRelated({ apartmentAd: true })
            .whereRaw(`(contract_requests."tenantId" = '${userId}' OR "apartmentAd"."landlordId" = '${userId}')`)
            .findById(id);
        if (!contractRequest) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract request not found'));
        }
        return (0, oxide_ts_1.Ok)(contractRequest);
    }
};
FindContractRequestService = __decorate([
    (0, common_1.Injectable)()
], FindContractRequestService);
exports.FindContractRequestService = FindContractRequestService;
//# sourceMappingURL=find-contract-request.service.js.map