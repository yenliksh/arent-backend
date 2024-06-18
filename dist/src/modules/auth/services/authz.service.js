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
exports.AuthZService = void 0;
const user_orm_entity_1 = require("../../../infrastructure/database/entities/user.orm-entity");
const repositories_1 = require("../../admin-panel/admins/repositories");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const types_1 = require("../types");
let AuthZService = class AuthZService {
    constructor(adminsTypeormRepository) {
        this.adminsTypeormRepository = adminsTypeormRepository;
    }
    async validateUser(payload) {
        const { id } = payload;
        const user = await user_orm_entity_1.UserOrmEntity.query().findById(id);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
    async validateAdmin(payload) {
        const { id } = payload;
        const admin = await this.adminsTypeormRepository.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.UnauthorizedException();
        }
        return admin;
    }
    async validate(payload) {
        const tokePayloadMap = {
            [types_1.TokenType.USER]: this.validateUser.bind(this),
            [types_1.TokenType.ADMIN]: this.validateAdmin.bind(this),
            [types_1.TokenType.REFRESH]: this.validateUser.bind(this),
        };
        return tokePayloadMap[payload.tokenType](payload);
    }
};
AuthZService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(repositories_1.AdminsTypeormRepository)),
    __metadata("design:paramtypes", [repositories_1.AdminsTypeormRepository])
], AuthZService);
exports.AuthZService = AuthZService;
//# sourceMappingURL=authz.service.js.map