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
exports.LongTermRentTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const apartment_ad_typeorm_entity_1 = require("../../apartment-ads/entities/apartment-ad.typeorm-entity");
const types_1 = require("../../../../rental-context/domains/apartment-ad/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'long_term_rents';
let LongTermRentTypeormEntity = class LongTermRentTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, cost: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").CurrencyType }, status: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").ApartmentAdStatusType, isArray: true }, isApproved: { required: true, type: () => Boolean }, declineReason: { required: false, type: () => String }, ownershipDocuments: { required: false, type: () => [String] }, apartmentAdId: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, apartmentAd: { required: false, type: () => require("../../apartment-ads/entities/apartment-ad.typeorm-entity").ApartmentAdTypeormEntity } };
    }
};
LongTermRentTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LongTermRentTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', unique: true }),
    __metadata("design:type", Number)
], LongTermRentTypeormEntity.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.CurrencyType, default: types_1.CurrencyType.KZT }),
    __metadata("design:type", String)
], LongTermRentTypeormEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true, default: JSON.stringify([types_1.ApartmentAdStatusType.DRAFT]) }),
    __metadata("design:type", Array)
], LongTermRentTypeormEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], LongTermRentTypeormEntity.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LongTermRentTypeormEntity.prototype, "declineReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true, nullable: true }),
    __metadata("design:type", Array)
], LongTermRentTypeormEntity.prototype, "ownershipDocuments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], LongTermRentTypeormEntity.prototype, "apartmentAdId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], LongTermRentTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], LongTermRentTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LongTermRentTypeormEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => apartment_ad_typeorm_entity_1.ApartmentAdTypeormEntity, (apartmentAdTypeormEntity) => apartmentAdTypeormEntity.longTermRent, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'apartmentAdId' }),
    __metadata("design:type", apartment_ad_typeorm_entity_1.ApartmentAdTypeormEntity)
], LongTermRentTypeormEntity.prototype, "apartmentAd", void 0);
LongTermRentTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: tableName,
    })
], LongTermRentTypeormEntity);
exports.LongTermRentTypeormEntity = LongTermRentTypeormEntity;
//# sourceMappingURL=long-term-rent.typeorm-entity.js.map