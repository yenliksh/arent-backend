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
exports.ContractTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../rental-context/domains/apartment-ad/domain/types");
const enums_1 = require("../../../../infrastructure/enums");
const typeorm_1 = require("typeorm");
const tableName = 'contracts';
let ContractTypeormEntity = class ContractTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, contractRequestId: { required: true, type: () => String }, rentPeriodVersionId: { required: true, type: () => String }, tenantId: { required: false, type: () => String }, landlordId: { required: false, type: () => String }, apartmentAdId: { required: false, type: () => String }, apartmentRentPeriodType: { required: true, enum: require("../../../../infrastructure/enums").ApartmentRentPeriodType }, cost: { required: true, type: () => Number }, currency: { required: true, enum: require("../../../../rental-context/domains/apartment-ad/domain/types").CurrencyType }, status: { required: true, enum: require("../../../../infrastructure/enums").ContractStatus }, arrivalDate: { required: false, type: () => Date }, departureDate: { required: false, type: () => Date }, rules: { required: false, type: () => Object }, isPending: { required: true, type: () => Boolean }, isFined: { required: true, type: () => Boolean }, isTemporary: { required: true, type: () => Boolean }, shortTermCancellationPolicy: { required: false, enum: require("../../../../infrastructure/enums").ShortTermRentCancellationPolicyType }, longTermCancellationPolicy: { required: false, type: () => String, enum: require("../../../../infrastructure/enums").LongTermRentCancellationPolicyType }, baseApartmentAdData: { required: true, type: () => Object }, guests: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "contractRequestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "rentPeriodVersionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "landlordId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "apartmentAdId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ApartmentRentPeriodType }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "apartmentRentPeriodType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], ContractTypeormEntity.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.CurrencyType }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ContractStatus }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ContractTypeormEntity.prototype, "arrivalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ContractTypeormEntity.prototype, "departureDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ContractTypeormEntity.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], ContractTypeormEntity.prototype, "isPending", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], ContractTypeormEntity.prototype, "isFined", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], ContractTypeormEntity.prototype, "isTemporary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ShortTermRentCancellationPolicyType, nullable: true }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "shortTermCancellationPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.LongTermRentCancellationPolicyType, nullable: true }),
    __metadata("design:type", String)
], ContractTypeormEntity.prototype, "longTermCancellationPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], ContractTypeormEntity.prototype, "baseApartmentAdData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], ContractTypeormEntity.prototype, "guests", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ContractTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ContractTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ContractTypeormEntity.prototype, "deletedAt", void 0);
ContractTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({ name: tableName })
], ContractTypeormEntity);
exports.ContractTypeormEntity = ContractTypeormEntity;
//# sourceMappingURL=contract.typeorm-entity.js.map