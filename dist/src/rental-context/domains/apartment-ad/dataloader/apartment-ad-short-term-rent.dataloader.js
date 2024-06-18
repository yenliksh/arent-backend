"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdShortTermRentOrmEntityLoader = void 0;
const apartment_ad_orm_entity_1 = require("../../../../infrastructure/database/entities/apartment-ad.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let ApartmentAdShortTermRentOrmEntityLoader = class ApartmentAdShortTermRentOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (apartmentAdIds) => {
            const shortTermRents = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.relatedQuery('shortTermRent').for(apartmentAdIds);
            return apartmentAdIds.map((id) => shortTermRents.find((shortTermRent) => shortTermRent.apartmentAdId === id));
        });
    }
};
ApartmentAdShortTermRentOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], ApartmentAdShortTermRentOrmEntityLoader);
exports.ApartmentAdShortTermRentOrmEntityLoader = ApartmentAdShortTermRentOrmEntityLoader;
//# sourceMappingURL=apartment-ad-short-term-rent.dataloader.js.map