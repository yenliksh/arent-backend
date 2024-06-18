"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdShortTermRentViewResolver = void 0;
const apartment_ad_locked_dates_model_1 = require("../../models/sub-models/apartment-ad-locked-dates.model");
const short_term_rent_locked_date_dataloader_1 = require("../../../../../infrastructure/dataloader/short-term-rent-locked-date.dataloader");
const dataloader_1 = require("../../../../../libs/dataloader");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
const apartment_ad_dataloader_1 = require("../../../../../infrastructure/dataloader/apartment-ad.dataloader");
const apartment_ad_short_term_rent_model_1 = require("../../models/apartment-ad-short-term-rent.model");
const apartment_ad_model_1 = require("../../models/apartment-ad.model");
let ApartmentAdShortTermRentViewResolver = class ApartmentAdShortTermRentViewResolver {
    async apartmentAd(shortTermRent, apartmentAdOrmEntityLoader) {
        const { apartmentAdId, apartmentAd } = shortTermRent;
        if (apartmentAd) {
            return apartmentAd;
        }
        const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);
        return apartment_ad_model_1.ApartmentAdViewModel.create(result);
    }
    async lockedDates(shortTermRent, lockedDateOrmEntityLoader) {
        const { id } = shortTermRent;
        const result = await lockedDateOrmEntityLoader.load(id);
        return (result === null || result === void 0 ? void 0 : result.map((i) => apartment_ad_locked_dates_model_1.ApartmentAdLockedDatesModel.create(i))) || [];
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => apartment_ad_model_1.ApartmentAdViewModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_dataloader_1.ApartmentAdOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ApartmentAdShortTermRentViewResolver.prototype, "apartmentAd", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [apartment_ad_locked_dates_model_1.ApartmentAdLockedDatesModel]),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(short_term_rent_locked_date_dataloader_1.ShortTermRentLockedDateOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ApartmentAdShortTermRentViewResolver.prototype, "lockedDates", null);
ApartmentAdShortTermRentViewResolver = __decorate([
    (0, graphql_1.Resolver)(() => apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel)
], ApartmentAdShortTermRentViewResolver);
exports.ApartmentAdShortTermRentViewResolver = ApartmentAdShortTermRentViewResolver;
//# sourceMappingURL=apartment-ad-short-term-rent-view.resolver.js.map