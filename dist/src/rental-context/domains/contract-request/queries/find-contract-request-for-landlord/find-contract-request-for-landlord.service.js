"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindContractRequestForLandlordService = void 0;
const apartment_ad_orm_entity_1 = require("../../../../../infrastructure/database/entities/apartment-ad.orm-entity");
const contract_request_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract-request.orm-entity");
const cursor_paginator_1 = require("../../../../../libs/utils/cursor-paginator");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const types_1 = require("../../domain/types");
let FindContractRequestForLandlordService = class FindContractRequestForLandlordService {
    async handle(userId, input) {
        const { type, afterCursor, limit = 3 } = input;
        const cursorAfter = afterCursor
            ? (0, cursor_paginator_1.decodeCursor)(afterCursor)
            : undefined;
        const apartmentLandlordSubQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query().where('landlordId', userId);
        const contractRequestsQb = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.relatedQuery('contractRequests')
            .for(apartmentLandlordSubQuery)
            .where({ apartmentRentPeriodType: type })
            .where({ status: types_1.ContractRequestStatus.CREATED })
            .limit(limit + 1)
            .orderBy([
            { column: 'createdAt', order: 'DESC' },
            { column: 'id', order: 'DESC' },
        ]);
        if (cursorAfter) {
            contractRequestsQb.where((builder) => {
                builder.whereRaw(`${contract_request_orm_entity_1.ContractRequestOrmEntity.tableName}."createdAt"::timestamptz < '${cursorAfter.createdAt}'::timestamptz`);
                builder.orWhereRaw(`(${contract_request_orm_entity_1.ContractRequestOrmEntity.tableName}."createdAt"::timestamptz = '${cursorAfter.createdAt}'::timestamptz)
          AND (${contract_request_orm_entity_1.ContractRequestOrmEntity.tableName}."id" < '${cursorAfter.id}')`);
            });
        }
        const contractRequests = await contractRequestsQb;
        const returningData = (0, cursor_paginator_1.getDataWithAfterCursor)(contractRequests, limit, (i) => i, null, ['id', 'createdAt']);
        return (0, oxide_ts_1.Ok)(returningData);
    }
};
FindContractRequestForLandlordService = __decorate([
    (0, common_1.Injectable)()
], FindContractRequestForLandlordService);
exports.FindContractRequestForLandlordService = FindContractRequestForLandlordService;
//# sourceMappingURL=find-contract-request-for-landlord.service.js.map