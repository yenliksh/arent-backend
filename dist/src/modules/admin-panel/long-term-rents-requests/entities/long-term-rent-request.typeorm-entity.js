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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentRequestTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const enums_1 = require("../../../../infrastructure/enums");
const apartment_ad_typeorm_entity_1 = require("../../apartment-ads/entities/apartment-ad.typeorm-entity");
const long_term_rent_typeorm_entity_1 = require("../../long-term-rents/entities/long-term-rent.typeorm-entity");
const user_typeorm_entity_1 = require("../../users/entities/user.typeorm-entity");
const types_1 = require("../../../../rental-context/domains/apartment-ad/domain/types");
const types_2 = require("../../../../rental-context/domains/user/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'long_term_rent_requests';
let LongTermRentRequestTypeormEntity = class LongTermRentRequestTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, landlordId: { required: true, type: () => String }, longTermRentId: { required: true, type: () => String }, apartmentCategory: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").ApartmentCategory }, apartmentType: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").ApartmentType }, numberOfGuests: { required: false, type: () => Number }, numberOfRooms: { required: false, type: () => Number }, country: { required: false, type: () => String }, city: { required: false, type: () => String }, street: { required: false, type: () => String }, region: { required: false, type: () => String }, houseNumber: { required: false, type: () => String }, lat: { required: false, type: () => Number }, lng: { required: false, type: () => Number }, media: { required: false, type: () => Object }, description: { required: false, type: () => Object }, rules: { required: false, type: () => Object }, characteristics: { required: false, type: () => Object }, cancellationPolicy: { required: false, type: () => String, enum: require("../../../../infrastructure/enums").LongTermRentCancellationPolicyType }, legalCapacityType: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").LegalCapacityType }, legalCapacityTinBin: { required: false, type: () => String }, legalCapacityCompanyName: { required: false, type: () => String }, legalCapacityAddress: { required: false, type: () => String }, cost: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").CurrencyType }, status: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").ApartmentAdStatusType, isArray: true }, isApproved: { required: true, type: () => Boolean }, declineReason: { required: false, type: () => String }, ownershipDocuments: { required: false, type: () => [String] }, innopayCardId: { required: false, type: () => String }, defaultPaymentMethod: { required: false, type: () => String, enum: require("../../../../infrastructure/enums").PaymentMethod }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
LongTermRentRequestTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "landlordId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "longTermRentId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "apartmentCategory", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "apartmentType", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], LongTermRentRequestTypeormEntity.prototype, "numberOfGuests", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], LongTermRentRequestTypeormEntity.prototype, "numberOfRooms", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "houseNumber", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], LongTermRentRequestTypeormEntity.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], LongTermRentRequestTypeormEntity.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], LongTermRentRequestTypeormEntity.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], LongTermRentRequestTypeormEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], LongTermRentRequestTypeormEntity.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], LongTermRentRequestTypeormEntity.prototype, "characteristics", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "legalCapacityType", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "legalCapacityTinBin", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "legalCapacityCompanyName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "legalCapacityAddress", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], LongTermRentRequestTypeormEntity.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], LongTermRentRequestTypeormEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], LongTermRentRequestTypeormEntity.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "declineReason", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], LongTermRentRequestTypeormEntity.prototype, "ownershipDocuments", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "innopayCardId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], LongTermRentRequestTypeormEntity.prototype, "defaultPaymentMethod", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], LongTermRentRequestTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], LongTermRentRequestTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], LongTermRentRequestTypeormEntity.prototype, "deletedAt", void 0);
LongTermRentRequestTypeormEntity = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: tableName,
        expression: (connection) => connection
            .createQueryBuilder()
            .select('apartment_ads.id', 'id')
            .addSelect('apartment_ads.apartmentType', 'apartmentType')
            .addSelect('apartment_ads.apartmentCategory', 'apartmentCategory')
            .addSelect('apartment_ads.numberOfGuests', 'numberOfGuests')
            .addSelect('apartment_ads.numberOfRooms', 'numberOfRooms')
            .addSelect('apartment_ads.country', 'country')
            .addSelect('apartment_ads.city', 'city')
            .addSelect('apartment_ads.street', 'street')
            .addSelect('apartment_ads.region', 'region')
            .addSelect('apartment_ads.houseNumber', 'houseNumber')
            .addSelect('apartment_ads.lat', 'lat')
            .addSelect('apartment_ads.lng', 'lng')
            .addSelect('apartment_ads.media', 'media')
            .addSelect('apartment_ads.description', 'description')
            .addSelect('apartment_ads.rules', 'rules')
            .addSelect('apartment_ads.characteristics', 'characteristics')
            .addSelect('apartment_ads.legalCapacityType', 'legalCapacityType')
            .addSelect('apartment_ads.legalCapacityTinBin', 'legalCapacityTinBin')
            .addSelect('apartment_ads.legalCapacityCompanyName', 'legalCapacityCompanyName')
            .addSelect('apartment_ads.legalCapacityAddress', 'legalCapacityAddress')
            .addSelect('apartment_ads.landlordId', 'landlordId')
            .addSelect('apartment_ads.innopayCardId', 'innopayCardId')
            .addSelect('apartment_ads.defaultPaymentMethod', 'defaultPaymentMethod')
            .addSelect('long_term_rents.cost', 'cost')
            .addSelect('long_term_rents.currency', 'currency')
            .addSelect('long_term_rents.status', 'status')
            .addSelect('long_term_rents.cancellationPolicy', 'cancellationPolicy')
            .addSelect('long_term_rents.isApproved', 'isApproved')
            .addSelect('long_term_rents.declineReason', 'declineReason')
            .addSelect('long_term_rents.ownershipDocuments', 'ownershipDocuments')
            .addSelect('long_term_rents.id', 'longTermRentId')
            .addSelect('apartment_ads.createdAt', 'createdAt')
            .addSelect('apartment_ads.updatedAt', 'updatedAt')
            .addSelect('apartment_ads.deletedAt', 'deletedAt')
            .from(apartment_ad_typeorm_entity_1.ApartmentAdTypeormEntity.tableName, 'apartment_ads')
            .innerJoin(long_term_rent_typeorm_entity_1.LongTermRentTypeormEntity.tableName, 'long_term_rents', 'long_term_rents."apartmentAdId" = apartment_ads.id')
            .innerJoin(user_typeorm_entity_1.UserTypeormEntity.tableName, 'landlords', 'landlords."id" = apartment_ads.landlordId')
            .where(`'${types_1.ApartmentAdStatusType.PROCESSING}' = ANY(${long_term_rent_typeorm_entity_1.LongTermRentTypeormEntity.tableName}.status)`)
            .andWhere(`"apartment_ads"."innopayCardId" IS NOT NULL`)
            .andWhere(`"long_term_rents"."ownershipDocuments" IS NOT NULL`)
            .andWhere(`"landlords"."identityStatus" = '${types_2.IdentityStatusType.APPROVED}'`)
            .andWhere(`"landlords"."isPhoneApproved" = true`),
    })
], LongTermRentRequestTypeormEntity);
exports.LongTermRentRequestTypeormEntity = LongTermRentRequestTypeormEntity;
//# sourceMappingURL=long-term-rent-request.typeorm-entity.js.map