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
exports.AuthNService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const types_1 = require("../types");
let AuthNService = class AuthNService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.jwtSecret = this.configService.get('jwt.secret');
        this.jwtExpiresIn = this.configService.get('jwt.expiresIn');
        this.jwtRefreshSecret = this.configService.get('jwt.refreshSecret');
        this.jwtRefreshExpiresIn = this.configService.get('jwt.refreshExpiresIn');
        this.jwtSignUpSecret = this.configService.get('jwt.signUpSecret');
        this.jwtSignUpExpiresIn = this.configService.get('jwt.signUpExpiresIn');
    }
    getExpirationTime(jwtType) {
        const expiration = new Date();
        const jwtExpiresInMap = {
            [types_1.TokenType.USER]: this.jwtExpiresIn,
            [types_1.TokenType.ADMIN]: this.jwtExpiresIn,
            [types_1.TokenType.REFRESH]: this.jwtRefreshExpiresIn,
            [types_1.TokenType.SIGN_UP]: this.jwtSignUpExpiresIn,
        };
        const expiresIn = jwtExpiresInMap[jwtType];
        expiration.setTime(expiresIn * 1000 + expiration.getTime());
        return expiration;
    }
    getJwtOptions(jwtType) {
        const jwtSecretInMap = {
            [types_1.TokenType.USER]: { secret: this.jwtSecret, expiresIn: this.jwtExpiresIn },
            [types_1.TokenType.ADMIN]: { secret: this.jwtSecret, expiresIn: this.jwtExpiresIn },
            [types_1.TokenType.REFRESH]: { secret: this.jwtRefreshSecret, expiresIn: this.jwtRefreshExpiresIn },
            [types_1.TokenType.SIGN_UP]: { secret: this.jwtSignUpSecret, expiresIn: this.jwtSignUpExpiresIn },
        };
        const secret = jwtSecretInMap[jwtType];
        return secret;
    }
    async createToken(type, payload) {
        const expiration = this.getExpirationTime(type);
        const jwtOptions = this.getJwtOptions(type);
        return this.jwtService.sign({ ...payload, tokenType: type, expiration }, jwtOptions);
    }
    async verifyTokenAsync(token) {
        return this.jwtService.verifyAsync(token);
    }
};
AuthNService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, config_1.ConfigService])
], AuthNService);
exports.AuthNService = AuthNService;
//# sourceMappingURL=authn.service.js.map