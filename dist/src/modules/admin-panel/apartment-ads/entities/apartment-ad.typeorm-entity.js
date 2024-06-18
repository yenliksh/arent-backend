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
exports.ApartmentAdTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const long_term_rent_typeorm_entity_1 = require("../../long-term-rents/entities/long-term-rent.typeorm-entity");
const short_term_rent_typeorm_entity_1 = require("../../short-term-rents/entities/short-term-rent.typeorm-entity");
const user_typeorm_entity_1 = require("../../users/entities/user.typeorm-entity");
const types_1 = require("../../../../rental-context/domains/apartment-ad/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'apartment_ads';
let ApartmentAdTypeormEntity = class ApartmentAdTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, landlordId: { required: true, type: () => String }, landlord: { required: true, type: () => require("../../users/entities/user.typeorm-entity").UserTypeormEntity }, rentPeriodType: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").RentPeriodType }, apartmentType: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").ApartmentType }, apartmentCategory: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").ApartmentCategory }, numberOfGuests: { required: false, type: () => Number }, numberOfRooms: { required: false, type: () => Number }, country: { required: false, type: () => String }, city: { required: false, type: () => String }, street: { required: false, type: () => String }, region: { required: false, type: () => String }, houseNumber: { required: false, type: () => String }, lat: { required: false, type: () => Number }, lng: { required: false, type: () => Number }, media: { required: false, type: () => Object }, description: { required: false, type: () => Object }, rules: { required: false, type: () => Object }, characteristics: { required: false, type: () => Object }, legalCapacityType: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").LegalCapacityType }, legalCapacityTinBin: { required: false, type: () => String }, legalCapacityCompanyName: { required: false, type: () => String }, legalCapacityAddress: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, longTermRent: { required: false, type: () => require("../../long-term-rents/entities/long-term-rent.typeorm-entity").LongTermRentTypeormEntity }, shortTermRent: { required: false, type: () => require("../../short-term-rents/entities/short-term-rent.typeorm-entity").ShortTermRentTypeormEntity } };
    }
};
ApartmentAdTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "landlordId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_typeorm_entity_1.UserTypeormEntity),
    __metadata("design:type", user_typeorm_entity_1.UserTypeormEntity)
], ApartmentAdTypeormEntity.prototype, "landlord", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.RentPeriodType }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "rentPeriodType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.ApartmentType, default: types_1.ApartmentType.FLAT }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "apartmentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.ApartmentCategory, default: types_1.ApartmentCategory.FLAT }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "apartmentCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTypeormEntity.prototype, "numberOfGuests", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTypeormEntity.prototype, "numberOfRooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "houseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', precision: 14, scale: 10, nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTypeormEntity.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', precision: 14, scale: 10, nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTypeormEntity.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdTypeormEntity.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdTypeormEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdTypeormEntity.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdTypeormEntity.prototype, "characteristics", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.LegalCapacityType, default: types_1.LegalCapacityType.INDIVIDUAL }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "legalCapacityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "legalCapacityTinBin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "legalCapacityCompanyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], ApartmentAdTypeormEntity.prototype, "legalCapacityAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ApartmentAdTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ApartmentAdTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ApartmentAdTypeormEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => long_term_rent_typeorm_entity_1.LongTermRentTypeormEntity, (longTermRentTypeormEntity) => longTermRentTypeormEntity.apartmentAd, {
        nullable: true,
    }),
    __metadata("design:type", long_term_rent_typeorm_entity_1.LongTermRentTypeormEntity)
], ApartmentAdTypeormEntity.prototype, "longTermRent", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => short_term_rent_typeorm_entity_1.ShortTermRentTypeormEntity, (shortTermRentTypeormEntity) => shortTermRentTypeormEntity.apartmentAd, {
        nullable: true,
    }),
    __metadata("design:type", short_term_rent_typeorm_entity_1.ShortTermRentTypeormEntity)
], ApartmentAdTypeormEntity.prototype, "shortTermRent", void 0);
ApartmentAdTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: tableName,
    })
], ApartmentAdTypeormEntity);
exports.ApartmentAdTypeormEntity = ApartmentAdTypeormEntity;
//# sourceMappingURL=apartment-ad.typeorm-entity.js.map