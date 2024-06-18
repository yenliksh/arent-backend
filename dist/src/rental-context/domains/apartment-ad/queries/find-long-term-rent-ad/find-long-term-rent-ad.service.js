"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindLongTermRentAdService = void 0;
const types_1 = require("../../domain/types");
const types_2 = require("../../../contract-request/domain/types");
const contract_request_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract-request.orm-entity");
const long_term_rent_orm_entity_1 = require("../../../../../infrastructure/database/entities/long-term-rent.orm-entity");
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
let FindLongTermRentAdService = class FindLongTermRentAdService {
    async handle(dto, finderUserId) {
        const { id } = dto;
        const longTermRentQueryBuilder = long_term_rent_orm_entity_1.LongTermRentOrmEntity.query();
        if (finderUserId) {
            longTermRentQueryBuilder
                .withGraphFetched('apartmentAd.[contractRequests.[contract]]')
                .modifyGraph('apartmentAd.contractRequests', (builder) => {
                builder.where('tenantId', finderUserId);
                builder.whereNot('status', types_2.ContractRequestStatus.REJECTED);
            })
                .modifyGraph('apartmentAd.contractRequests.contract', (builder) => {
                builder.where('tenantId', finderUserId);
            });
        }
        else {
            longTermRentQueryBuilder.withGraphFetched('apartmentAd');
        }
        const longTermRent = await longTermRentQueryBuilder
            .findById(id)
            .where((builder) => builder
            .where(`${long_term_rent_orm_entity_1.LongTermRentOrmEntity.tableName}.status`, '@>', [types_1.ApartmentAdStatusType.PUBLISHED])
            .orWhere(`${long_term_rent_orm_entity_1.LongTermRentOrmEntity.tableName}.status`, '@>', [types_1.ApartmentAdStatusType.PAUSED]));
        if (!longTermRent) {
            throw new common_1.NotFoundException('Not found longTermRent');
        }
        const apartmentAdId = longTermRent.apartmentAdId;
        if (!apartmentAdId) {
            throw new common_1.NotFoundException('Not found apartmentAdId');
        }
        const [averageResponse] = (await contract_request_orm_entity_1.ContractRequestOrmEntity.query()
            .select((0, objection_1.raw)(`avg( "updatedAt" - "createdAt" ) "average"`))
            .whereIn('status', [types_2.ContractRequestStatus.ACCEPTED, types_2.ContractRequestStatus.REJECTED])
            .andWhere(`apartmentAdId`, apartmentAdId));
        return { longTermRent, averageResponseOnRequest: averageResponse.average };
    }
    async handleByApId(dto, finderUserId) {
        const { id } = dto;
        const longTermRentQueryBuilder = long_term_rent_orm_entity_1.LongTermRentOrmEntity.query();
        if (finderUserId) {
            longTermRentQueryBuilder
                .withGraphFetched('apartmentAd.[contractRequests.[contract]]')
                .modifyGraph('apartmentAd.contractRequests', (builder) => {
                builder.where('tenantId', finderUserId);
                builder.whereNot('status', types_2.ContractRequestStatus.REJECTED);
            })
                .modifyGraph('apartmentAd.contractRequests.contract', (builder) => {
                builder.where('tenantId', finderUserId);
            });
        }
        else {
            longTermRentQueryBuilder.withGraphFetched('apartmentAd');
        }
        const longTermRent = await longTermRentQueryBuilder
            .findOne({ apartmentAdId: id })
            .where((builder) => builder
            .where(`${long_term_rent_orm_entity_1.LongTermRentOrmEntity.tableName}.status`, '@>', [types_1.ApartmentAdStatusType.PUBLISHED])
            .orWhere(`${long_term_rent_orm_entity_1.LongTermRentOrmEntity.tableName}.status`, '@>', [types_1.ApartmentAdStatusType.PAUSED]));
        if (!longTermRent) {
            throw new common_1.NotFoundException('Not found longTermRent');
        }
        const apartmentAdId = longTermRent.apartmentAdId;
        if (!apartmentAdId) {
            throw new common_1.NotFoundException('Not found apartmentAdId');
        }
        const [averageResponse] = (await contract_request_orm_entity_1.ContractRequestOrmEntity.query()
            .select((0, objection_1.raw)(`avg( "updatedAt" - "createdAt" ) "average"`))
            .whereIn('status', [types_2.ContractRequestStatus.ACCEPTED, types_2.ContractRequestStatus.REJECTED])
            .andWhere(`apartmentAdId`, apartmentAdId));
        return { longTermRent, averageResponseOnRequest: averageResponse.average };
    }
};
FindLongTermRentAdService = __decorate([
    (0, common_1.Injectable)()
], FindLongTermRentAdService);
exports.FindLongTermRentAdService = FindLongTermRentAdService;
//# sourceMappingURL=find-long-term-rent-ad.service.js.map