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
exports.JwtAuthGuard = exports.AllowUnauthorized = void 0;
const authn_service_1 = require("../../modules/auth/services/authn.service");
const types_1 = require("../../modules/auth/types");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
const rxjs_1 = require("rxjs");
const AllowUnauthorized = () => (0, common_1.SetMetadata)('isAllowUnauthorized', true);
exports.AllowUnauthorized = AllowUnauthorized;
function JwtAuthGuard(...tokenTypes) {
    let Guard = class Guard extends (0, passport_1.AuthGuard)('jwt') {
        constructor(authService, reflector) {
            super();
            this.authService = authService;
            this.reflector = reflector;
            tokenTypes = tokenTypes.length ? tokenTypes : [types_1.TokenType.USER];
        }
        getRequest(context) {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const request = ctx.getContext().req || context.switchToHttp().getRequest();
            return request;
        }
        async canActivate(context) {
            var _a, _b;
            let result = super.canActivate(context);
            if (result instanceof rxjs_1.Observable) {
                result = (0, rxjs_1.lastValueFrom)(result);
            }
            else {
                result = Promise.resolve(result);
            }
            try {
                await result;
            }
            catch (error) {
                const isAllowWithoutToken = this.reflector.get('isAllowUnauthorized', context.getHandler());
                if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) === 401 && isAllowWithoutToken) {
                    return true;
                }
                throw error;
            }
            const token = (_b = this.getRequest(context).headers.authorization.split(' ')) === null || _b === void 0 ? void 0 : _b[1];
            const { tokenType } = (await this.authService.verifyTokenAsync(token));
            if (!tokenTypes.includes(tokenType)) {
                return false;
            }
            return result;
        }
        handleRequest(err, user) {
            if (err || !user) {
                throw err || new common_1.UnauthorizedException('Invalid token');
            }
            return user;
        }
    };
    Guard = __decorate([
        __param(0, (0, common_1.Inject)(authn_service_1.AuthNService)),
        __metadata("design:paramtypes", [authn_service_1.AuthNService, core_1.Reflector])
    ], Guard);
    return (0, common_1.mixin)(Guard);
}
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map