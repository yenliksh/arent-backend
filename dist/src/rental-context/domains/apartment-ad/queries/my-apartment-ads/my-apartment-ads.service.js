"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApartmentAdsService = void 0;
const types_1 = require("../../domain/types");
const apartment_ad_orm_entity_1 = require("../../../../../infrastructure/database/entities/apartment-ad.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let MyApartmentAdsService = class MyApartmentAdsService {
    constructor() {
        this.apartmentAdStatusMap = {
            [types_1.ApartmentAdStatusType.ACTIVE]: (userId) => this.getApartmentAdUnionRentalType(userId, types_1.ApartmentAdStatusType.ACTIVE),
            [types_1.ApartmentAdStatusType.PAUSED]: (userId) => this.getApartmentAdUnionRentalType(userId, types_1.ApartmentAdStatusType.PAUSED),
            [types_1.ApartmentAdStatusType.PROCESSING]: (userId) => this.getApartmentAdUnionRentalType(userId, types_1.ApartmentAdStatusType.PROCESSING),
            [types_1.ApartmentAdStatusType.PUBLISHED]: (userId) => this.getApartmentAdUnionRentalType(userId, types_1.ApartmentAdStatusType.PUBLISHED),
            [types_1.ApartmentAdStatusType.DRAFT]: (userId) => this.getApartmentAdUnionRentalType(userId, types_1.ApartmentAdStatusType.DRAFT),
        };
    }
    async handle(dto, userId) {
        const { status } = dto;
        const [longTermRentAds, shortTermRentAds] = await this.apartmentAdStatusMap[status](userId);
        return (0, oxide_ts_1.Ok)([shortTermRentAds, longTermRentAds]);
    }
    getApartmentAdUnionRentalType(userId, status) {
        const apartmentAdSubQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query().where('landlordId', userId);
        const longTermRentAdsQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.relatedQuery('longTermRent')
            .for(apartmentAdSubQuery)
            .where('status', '@>', [status])
            .orderBy('updatedAt', 'DESC');
        const shortTermRentAdsQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.relatedQuery('shortTermRent')
            .for(apartmentAdSubQuery)
            .where('status', '@>', [status])
            .orderBy('updatedAt', 'DESC');
        return Promise.all([longTermRentAdsQuery, shortTermRentAdsQuery]);
    }
};
MyApartmentAdsService = __decorate([
    (0, common_1.Injectable)()
], MyApartmentAdsService);
exports.MyApartmentAdsService = MyApartmentAdsService;
//# sourceMappingURL=my-apartment-ads.service.js.map