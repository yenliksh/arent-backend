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
exports.ShortTermRentTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const enums_1 = require("../../../../infrastructure/enums");
const apartment_ad_typeorm_entity_1 = require("../../apartment-ads/entities/apartment-ad.typeorm-entity");
const types_1 = require("../../../../rental-context/domains/apartment-ad/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'short_term_rents';
let ShortTermRentTypeormEntity = class ShortTermRentTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, cost: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").CurrencyType }, status: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").ApartmentAdStatusType, isArray: true }, isApproved: { required: true, type: () => Boolean }, declineReason: { required: false, type: () => String }, apartmentAdId: { required: true, type: () => String }, rentBookingType: { required: true, enum: require("../../../../infrastructure/enums").ShortTermRentBookingType }, cancellationPolicy: { required: false, enum: require("../../../../infrastructure/enums").ShortTermRentCancellationPolicyType }, arrivalTime: { required: false, type: () => String }, departureTime: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, apartmentAd: { required: false, type: () => require("../../apartment-ads/entities/apartment-ad.typeorm-entity").ApartmentAdTypeormEntity } };
    }
};
ShortTermRentTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', unique: true }),
    __metadata("design:type", Number)
], ShortTermRentTypeormEntity.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.CurrencyType, default: types_1.CurrencyType.KZT }),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true, default: JSON.stringify([types_1.ApartmentAdStatusType.DRAFT]) }),
    __metadata("design:type", Array)
], ShortTermRentTypeormEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], ShortTermRentTypeormEntity.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "declineReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "apartmentAdId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ShortTermRentBookingType, default: types_1.CurrencyType.KZT }),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "rentBookingType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ShortTermRentCancellationPolicyType, nullable: true }),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "arrivalTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ShortTermRentTypeormEntity.prototype, "departureTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShortTermRentTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShortTermRentTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ShortTermRentTypeormEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => apartment_ad_typeorm_entity_1.ApartmentAdTypeormEntity, (apartmentAdTypeormEntity) => apartmentAdTypeormEntity.shortTermRent, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'apartmentAdId' }),
    __metadata("design:type", apartment_ad_typeorm_entity_1.ApartmentAdTypeormEntity)
], ShortTermRentTypeormEntity.prototype, "apartmentAd", void 0);
ShortTermRentTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: tableName,
    })
], ShortTermRentTypeormEntity);
exports.ShortTermRentTypeormEntity = ShortTermRentTypeormEntity;
//# sourceMappingURL=short-term-rent.typeorm-entity.js.map