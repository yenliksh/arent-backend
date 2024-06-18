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
exports.ApartmentAdResolver = void 0;
const user_dataloader_1 = require("../../../../../infrastructure/dataloader/user.dataloader");
const dataloader_1 = require("../../../../../libs/dataloader");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
const user_model_1 = require("../../../user/models/user.model");
const apartment_ad_long_term_rent_dataloader_1 = require("../../dataloader/apartment-ad-long-term-rent.dataloader");
const apartment_ad_short_term_rent_dataloader_1 = require("../../dataloader/apartment-ad-short-term-rent.dataloader");
const types_1 = require("../../domain/types");
const apartment_ad_long_term_rent_model_1 = require("../../models/apartment-ad-long-term-rent.model");
const apartment_ad_short_term_rent_model_1 = require("../../models/apartment-ad-short-term-rent.model");
const apartment_ad_model_1 = require("../../models/apartment-ad.model");
let ApartmentAdResolver = class ApartmentAdResolver {
    async landlord(apartmentAd, userOrmEntityLoader) {
        const { landlordId } = apartmentAd;
        const result = await userOrmEntityLoader.load(landlordId);
        return user_model_1.UserMeModel.create(result);
    }
    async shortTermRent(apartmentAd, apartmentAdShortTermRentOrmEntityLoader) {
        const { id, shortTermRent, rentPeriodType } = apartmentAd;
        if (shortTermRent) {
            return shortTermRent;
        }
        if (rentPeriodType === types_1.RentPeriodType.LONG_TERM) {
            return shortTermRent;
        }
        const result = await apartmentAdShortTermRentOrmEntityLoader.load(id);
        return apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentModel.create(result);
    }
    async longTermRent(apartmentAd, apartmentAdLongTermRentOrmEntityLoader) {
        const { id, longTermRent, rentPeriodType } = apartmentAd;
        if (longTermRent) {
            return longTermRent;
        }
        if (rentPeriodType === types_1.RentPeriodType.SHORT_TERM) {
            return longTermRent;
        }
        const result = await apartmentAdLongTermRentOrmEntityLoader.load(id);
        return apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentModel.create(result);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.UserMeModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(user_dataloader_1.UserOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_ad_model_1.ApartmentAdModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ApartmentAdResolver.prototype, "landlord", null);
__decorate([
    (0, graphql_1.ResolveField)(() => apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_short_term_rent_dataloader_1.ApartmentAdShortTermRentOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_ad_model_1.ApartmentAdModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ApartmentAdResolver.prototype, "shortTermRent", null);
__decorate([
    (0, graphql_1.ResolveField)(() => apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_long_term_rent_dataloader_1.ApartmentAdLongTermRentOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_ad_model_1.ApartmentAdModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ApartmentAdResolver.prototype, "longTermRent", null);
ApartmentAdResolver = __decorate([
    (0, graphql_1.Resolver)(() => apartment_ad_model_1.ApartmentAdModel)
], ApartmentAdResolver);
exports.ApartmentAdResolver = ApartmentAdResolver;
//# sourceMappingURL=apartment-ad.resolver.js.map