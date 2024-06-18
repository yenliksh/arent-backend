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
exports.ApartmentAdComplaintTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../rental-context/domains/apartment-ad-complaint/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'apartment_ad_complaints';
let ApartmentAdComplaintTypeormEntity = class ApartmentAdComplaintTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, userId: { required: true, type: () => String }, apartmentAdId: { required: true, type: () => String }, type: { required: true, enum: require("../../../../rental-context/domains/apartment-ad-complaint/domain/types").AdComplaintType }, reason: { required: true, type: () => String }, isViewed: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
ApartmentAdComplaintTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApartmentAdComplaintTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ApartmentAdComplaintTypeormEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ApartmentAdComplaintTypeormEntity.prototype, "apartmentAdId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.AdComplaintType }),
    __metadata("design:type", String)
], ApartmentAdComplaintTypeormEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApartmentAdComplaintTypeormEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ApartmentAdComplaintTypeormEntity.prototype, "isViewed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ApartmentAdComplaintTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ApartmentAdComplaintTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ApartmentAdComplaintTypeormEntity.prototype, "deletedAt", void 0);
ApartmentAdComplaintTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: tableName,
    })
], ApartmentAdComplaintTypeormEntity);
exports.ApartmentAdComplaintTypeormEntity = ApartmentAdComplaintTypeormEntity;
//# sourceMappingURL=apartment-ad-complaint.typeorm-entity.js.map