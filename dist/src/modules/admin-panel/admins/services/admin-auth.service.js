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
exports.AdminsAuthService = void 0;
const authn_service_1 = require("../../../auth/services/authn.service");
const types_1 = require("../../../auth/types");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const repositories_1 = require("../repositories");
let AdminsAuthService = class AdminsAuthService {
    constructor(authService, adminsRepository) {
        this.authService = authService;
        this.adminsRepository = adminsRepository;
    }
    async signIn(input) {
        const admin = await this.adminsRepository.findByCredentialsOrFail(input.login, input.password);
        let token;
        try {
            token = await this.authService.createToken(types_1.TokenType.ADMIN, { id: admin.id });
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong, try again later', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            admin,
            token,
        };
    }
};
AdminsAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(repositories_1.AdminsTypeormRepository)),
    __metadata("design:paramtypes", [authn_service_1.AuthNService,
        repositories_1.AdminsTypeormRepository])
], AdminsAuthService);
exports.AdminsAuthService = AdminsAuthService;
//# sourceMappingURL=admin-auth.service.js.map