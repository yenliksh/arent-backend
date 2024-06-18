"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApartmentAdService = void 0;
const apartment_ad_orm_entity_1 = require("../../../../../infrastructure/database/entities/apartment-ad.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let MyApartmentAdService = class MyApartmentAdService {
    async handle(dto, userId) {
        const { id: apartmentId } = dto;
        const apartmentAd = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query()
            .findById(apartmentId)
            .where('landlordId', userId)
            .joinRaw('LEFT JOIN short_term_rents ON apartment_ads.id = short_term_rents."apartmentAdId"')
            .joinRaw('LEFT JOIN long_term_rents ON apartment_ads.id = long_term_rents."apartmentAdId"');
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        return (0, oxide_ts_1.Ok)(apartmentAd);
    }
    async handleById(apartmentId) {
        const apartmentAd = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query()
            .findById(apartmentId)
            .joinRaw('LEFT JOIN short_term_rents ON apartment_ads.id = short_term_rents."apartmentAdId"')
            .joinRaw('LEFT JOIN long_term_rents ON apartment_ads.id = long_term_rents."apartmentAdId"');
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        return (0, oxide_ts_1.Ok)(apartmentAd);
    }
    async handleAll() {
        const apartmentAd = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query()
            .joinRaw('LEFT JOIN short_term_rents ON apartment_ads.id = short_term_rents."apartmentAdId"')
            .joinRaw('LEFT JOIN long_term_rents ON apartment_ads.id = long_term_rents."apartmentAdId"');
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        return (0, oxide_ts_1.Ok)(apartmentAd);
    }
};
MyApartmentAdService = __decorate([
    (0, common_1.Injectable)()
], MyApartmentAdService);
exports.MyApartmentAdService = MyApartmentAdService;
//# sourceMappingURL=my-apartment-ad.service.js.map