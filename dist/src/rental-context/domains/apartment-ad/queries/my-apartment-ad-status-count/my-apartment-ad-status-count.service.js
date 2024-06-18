"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApartmentAdStatusCountService = void 0;
const apartment_ad_orm_entity_1 = require("../../../../../infrastructure/database/entities/apartment-ad.orm-entity");
const contract_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract.orm-entity");
const enums_1 = require("../../../../../infrastructure/enums");
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
const oxide_ts_1 = require("oxide.ts");
const types_1 = require("../../domain/types");
let MyApartmentAdStatusCountService = class MyApartmentAdStatusCountService {
    async handle(userId) {
        const apartmentAdSubQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query().where('landlordId', userId);
        const longTermCountsQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.relatedQuery('longTermRent')
            .for(apartmentAdSubQuery)
            .select((0, objection_1.raw)('count(id), UNNEST(status) as type'))
            .groupBy('type');
        const shortTermCountsQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.relatedQuery('shortTermRent')
            .for(apartmentAdSubQuery)
            .select((0, objection_1.raw)('count(id), UNNEST(status) as type'))
            .groupBy('type');
        const activeRentContractsCountQuery = contract_orm_entity_1.ContractOrmEntity.query()
            .where(`${contract_orm_entity_1.ContractOrmEntity.tableName}.status`, enums_1.ContractStatus.CONCLUDED)
            .where(`${contract_orm_entity_1.ContractOrmEntity.tableName}.isTemporary`, false)
            .where('landlordId', userId)
            .count();
        const [longTermCounts, shortTermCounts, activeContractsCount] = await Promise.all([
            longTermCountsQuery,
            shortTermCountsQuery,
            activeRentContractsCountQuery,
        ]);
        const isNotActive = (props) => props.type !== types_1.ApartmentAdStatusType.ACTIVE;
        const aggregatedCountsWithoutActive = [
            ...[...longTermCounts, ...shortTermCounts].filter(isNotActive),
            ...activeContractsCount.map((i) => ({ ...i, type: types_1.ApartmentAdStatusType.ACTIVE })),
        ];
        const result = aggregatedCountsWithoutActive.reduce((acc, curr) => {
            acc[curr.type] = Number(curr.count) + acc[curr.type];
            return acc;
        }, {
            [types_1.ApartmentAdStatusType.ACTIVE]: 0,
            [types_1.ApartmentAdStatusType.DRAFT]: 0,
            [types_1.ApartmentAdStatusType.PAUSED]: 0,
            [types_1.ApartmentAdStatusType.PROCESSING]: 0,
            [types_1.ApartmentAdStatusType.PUBLISHED]: 0,
        });
        return (0, oxide_ts_1.Ok)(result);
    }
};
MyApartmentAdStatusCountService = __decorate([
    (0, common_1.Injectable)()
], MyApartmentAdStatusCountService);
exports.MyApartmentAdStatusCountService = MyApartmentAdStatusCountService;
//# sourceMappingURL=my-apartment-ad-status-count.service.js.map