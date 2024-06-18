"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const repositories_1 = require("../admin-panel/admins/repositories");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_config_service_1 = require("./configs/jwt-config.service");
const authn_service_1 = require("./services/authn.service");
const authz_service_1 = require("./services/authz.service");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh.strategy");
const jwt_sign_up_strategy_1 = require("./strategies/jwt-sign-up.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([repositories_1.AdminsTypeormRepository]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                useClass: jwt_config_service_1.JwtConfigService,
            }),
        ],
        providers: [jwt_strategy_1.JwtStrategy, jwt_refresh_strategy_1.JwtRefreshStrategy, jwt_sign_up_strategy_1.JwtSignUpStrategy, authn_service_1.AuthNService, authz_service_1.AuthZService],
        exports: [authn_service_1.AuthNService, authz_service_1.AuthZService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map