"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindShortTermRentAdService = void 0;
const types_1 = require("../../domain/types");
const types_2 = require("../../../contract-request/domain/types");
const contract_request_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract-request.orm-entity");
const short_term_rent_orm_entity_1 = require("../../../../../infrastructure/database/entities/short-term-rent.orm-entity");
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
let FindShortTermRentAdService = class FindShortTermRentAdService {
    async handle(dto) {
        const { id } = dto;
        const shortTermRent = await short_term_rent_orm_entity_1.ShortTermRentOrmEntity.query()
            .withGraphJoined({
            apartmentAd: true,
        })
            .findById(id)
            .where((builder) => builder
            .where('status', '@>', [types_1.ApartmentAdStatusType.PUBLISHED])
            .orWhere('status', '@>', [types_1.ApartmentAdStatusType.PAUSED]));
        if (!shortTermRent) {
            throw new common_1.NotFoundException('Not found shortTermRent');
        }
        const apartmentAdId = shortTermRent.apartmentAdId;
        if (!apartmentAdId) {
            throw new common_1.NotFoundException('Not found apartmentAdId');
        }
        const [averageResponse] = (await contract_request_orm_entity_1.ContractRequestOrmEntity.query()
            .select((0, objection_1.raw)(`avg( "updatedAt" - "createdAt" ) "average"`))
            .whereIn('status', [types_2.ContractRequestStatus.ACCEPTED, types_2.ContractRequestStatus.REJECTED])
            .andWhere(`apartmentAdId`, apartmentAdId));
        return { shortTermRent, averageResponseOnRequest: averageResponse.average };
    }
    async handleByApId(dto) {
        const { id } = dto;
        const shortTermRent = await short_term_rent_orm_entity_1.ShortTermRentOrmEntity.query()
            .withGraphJoined({
            apartmentAd: true,
        })
            .findOne({ apartmentAdId: id })
            .where((builder) => builder
            .where('status', '@>', [types_1.ApartmentAdStatusType.PUBLISHED])
            .orWhere('status', '@>', [types_1.ApartmentAdStatusType.PAUSED]));
        if (!shortTermRent) {
            throw new common_1.NotFoundException('Not found shortTermRent');
        }
        const apartmentAdId = shortTermRent.apartmentAdId;
        if (!apartmentAdId) {
            throw new common_1.NotFoundException('Not found apartmentAdId');
        }
        const [averageResponse] = (await contract_request_orm_entity_1.ContractRequestOrmEntity.query()
            .select((0, objection_1.raw)(`avg( "updatedAt" - "createdAt" ) "average"`))
            .whereIn('status', [types_2.ContractRequestStatus.ACCEPTED, types_2.ContractRequestStatus.REJECTED])
            .andWhere(`apartmentAdId`, apartmentAdId));
        return { shortTermRent, averageResponseOnRequest: averageResponse.average };
    }
};
FindShortTermRentAdService = __decorate([
    (0, common_1.Injectable)()
], FindShortTermRentAdService);
exports.FindShortTermRentAdService = FindShortTermRentAdService;
//# sourceMappingURL=find-short-term-rent-ad.service.js.map