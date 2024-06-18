"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdOrmEntityLoader = void 0;
const apartment_ad_orm_entity_1 = require("../database/entities/apartment-ad.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let ApartmentAdOrmEntityLoader = class ApartmentAdOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (apartmentAdIds) => {
            const apartmentAds = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query()
                .findByIds(apartmentAdIds)
                .withGraphFetched({ contractRequests: true });
            return apartmentAdIds.map((id) => apartmentAds.find((apartmentAd) => apartmentAd.id === id));
        });
    }
};
ApartmentAdOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], ApartmentAdOrmEntityLoader);
exports.ApartmentAdOrmEntityLoader = ApartmentAdOrmEntityLoader;
//# sourceMappingURL=apartment-ad.dataloader.js.map