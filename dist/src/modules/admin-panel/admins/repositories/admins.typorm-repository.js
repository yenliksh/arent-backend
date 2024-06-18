"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsTypeormRepository = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const admins_typeorm_entity_1 = require("../entities/admins.typeorm-entity");
let AdminsTypeormRepository = class AdminsTypeormRepository extends typeorm_1.Repository {
    async findByCredentialsOrFail(login, password) {
        const admin = await this.createQueryBuilder(admins_typeorm_entity_1.AdminTypeormEntity.tableName)
            .where(`${admins_typeorm_entity_1.AdminTypeormEntity.tableName}.login = :login`, {
            login,
        })
            .andWhere(`${admins_typeorm_entity_1.AdminTypeormEntity.tableName}.password = :password`, {
            password: crypto.createHmac('sha256', password).digest('hex'),
        })
            .getOne();
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid login or password');
        }
        return admin;
    }
};
AdminsTypeormRepository = __decorate([
    (0, typeorm_1.EntityRepository)(admins_typeorm_entity_1.AdminTypeormEntity)
], AdminsTypeormRepository);
exports.AdminsTypeormRepository = AdminsTypeormRepository;
//# sourceMappingURL=admins.typorm-repository.js.map