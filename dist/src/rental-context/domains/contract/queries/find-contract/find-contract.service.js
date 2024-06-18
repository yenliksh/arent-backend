"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindContractService = void 0;
const contract_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let FindContractService = class FindContractService {
    async handle(dto, userId) {
        const { id } = dto;
        const contract = await contract_orm_entity_1.ContractOrmEntity.query()
            .where((builder) => {
            builder.where({ landlordId: userId }).orWhere({ tenantId: userId });
        })
            .findById(id);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        return (0, oxide_ts_1.Ok)(contract);
    }
};
FindContractService = __decorate([
    (0, common_1.Injectable)()
], FindContractService);
exports.FindContractService = FindContractService;
//# sourceMappingURL=find-contract.service.js.map