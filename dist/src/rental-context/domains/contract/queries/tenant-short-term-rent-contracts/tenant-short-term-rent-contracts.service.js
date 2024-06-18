"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantShortTermRentContractsService = void 0;
const contract_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract.orm-entity");
const enums_1 = require("../../../../../infrastructure/enums");
const cursor_paginator_1 = require("../../../../../libs/utils/cursor-paginator");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let TenantShortTermRentContractsService = class TenantShortTermRentContractsService {
    async handle(userId, input) {
        const { type, afterCursor, limit = 20 } = input;
        const contractStatusMapper = {
            [enums_1.ContractRentStatus.CONCLUDED]: [enums_1.ContractStatus.CONCLUDED],
            [enums_1.ContractRentStatus.COMPLETED]: [enums_1.ContractStatus.COMPLETED, enums_1.ContractStatus.REJECTED],
        };
        const cursorAfter = afterCursor
            ? (0, cursor_paginator_1.decodeCursor)(afterCursor)
            : undefined;
        const contractsQueryBuilder = contract_orm_entity_1.ContractOrmEntity.query()
            .where('tenantId', userId)
            .whereIn('status', contractStatusMapper[type])
            .where('apartmentRentPeriodType', enums_1.ApartmentRentPeriodType.SHORT_TERM)
            .limit(limit + 1)
            .orderBy('createdAt', 'DESC');
        if (cursorAfter) {
            contractsQueryBuilder.whereRaw(`${contract_orm_entity_1.ContractOrmEntity.tableName}."createdAt"::timestamptz < '${cursorAfter.createdAt}'::timestamptz`);
        }
        const chats = await contractsQueryBuilder;
        const returningData = (0, cursor_paginator_1.getDataWithAfterCursor)(chats, limit, (i) => i, null, [
            'createdAt',
        ]);
        return (0, oxide_ts_1.Ok)(returningData);
    }
};
TenantShortTermRentContractsService = __decorate([
    (0, common_1.Injectable)()
], TenantShortTermRentContractsService);
exports.TenantShortTermRentContractsService = TenantShortTermRentContractsService;
//# sourceMappingURL=tenant-short-term-rent-contracts.service.js.map