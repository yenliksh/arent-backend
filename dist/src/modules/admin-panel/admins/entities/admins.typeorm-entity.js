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
exports.AdminTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const crypto = require("crypto");
const typeorm_1 = require("typeorm");
const tableName = 'admins';
let AdminTypeormEntity = class AdminTypeormEntity {
    updateEmail() {
        this.login = this.login.toLowerCase();
    }
    hashPasswordBeforeInsert() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
    hashPasswordBeforeUpdate() {
        if (this.password) {
            this.password = crypto.createHmac('sha256', this.password).digest('hex');
        }
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, login: { required: true, type: () => String }, password: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
AdminTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AdminTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminTypeormEntity.prototype, "updateEmail", null);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], AdminTypeormEntity.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminTypeormEntity.prototype, "hashPasswordBeforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminTypeormEntity.prototype, "hashPasswordBeforeUpdate", null);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', select: false }),
    __metadata("design:type", String)
], AdminTypeormEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AdminTypeormEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AdminTypeormEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AdminTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AdminTypeormEntity.prototype, "updatedAt", void 0);
AdminTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: tableName,
    })
], AdminTypeormEntity);
exports.AdminTypeormEntity = AdminTypeormEntity;
//# sourceMappingURL=admins.typeorm-entity.js.map