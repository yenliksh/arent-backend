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
exports.ApartmentAdIdentificatorTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const tableName = 'apartment_adentificator';
let ApartmentAdIdentificatorTypeormEntity = class ApartmentAdIdentificatorTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, apartmentId: { required: true, type: () => String }, keywordsSeo: { required: false, type: () => String }, titleSeo: { required: false, type: () => String }, descriptionSeo: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
ApartmentAdIdentificatorTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApartmentAdIdentificatorTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ApartmentAdIdentificatorTypeormEntity.prototype, "apartmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ApartmentAdIdentificatorTypeormEntity.prototype, "keywordsSeo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ApartmentAdIdentificatorTypeormEntity.prototype, "titleSeo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ApartmentAdIdentificatorTypeormEntity.prototype, "descriptionSeo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ApartmentAdIdentificatorTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ApartmentAdIdentificatorTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ApartmentAdIdentificatorTypeormEntity.prototype, "deletedAt", void 0);
ApartmentAdIdentificatorTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: tableName,
    })
], ApartmentAdIdentificatorTypeormEntity);
exports.ApartmentAdIdentificatorTypeormEntity = ApartmentAdIdentificatorTypeormEntity;
//# sourceMappingURL=apartment-ad-identificator.typeorm-entity.js.map