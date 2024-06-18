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
exports.RefreshTokenService = void 0;
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const authn_service_1 = require("../../../../../modules/auth/services/authn.service");
const types_1 = require("../../../../../modules/auth/types");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let RefreshTokenService = class RefreshTokenService {
    constructor(authService, userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }
    async handle(userId) {
        var _a, _b, _c, _d;
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const token = await this.authService.createToken(types_1.TokenType.USER, {
            id: user.id.value,
            phone: (_a = user.phone) === null || _a === void 0 ? void 0 : _a.value,
            email: (_b = user.email) === null || _b === void 0 ? void 0 : _b.value,
        });
        const refreshToken = await this.authService.createToken(types_1.TokenType.REFRESH, {
            id: user.id.value,
            phone: (_c = user.phone) === null || _c === void 0 ? void 0 : _c.value,
            email: (_d = user.email) === null || _d === void 0 ? void 0 : _d.value,
        });
        return (0, oxide_ts_1.Ok)({
            userId: user.id,
            token,
            refreshToken,
        });
    }
};
RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authn_service_1.AuthNService, user_repository_1.UserRepository])
], RefreshTokenService);
exports.RefreshTokenService = RefreshTokenService;
//# sourceMappingURL=refresh-token.service.js.map