"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtSignUpAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
const rxjs_1 = require("rxjs");
let JwtSignUpAuthGuard = class JwtSignUpAuthGuard extends (0, passport_1.AuthGuard)('jwt-sign-up') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req || context.switchToHttp().getRequest();
        return request;
    }
    async canActivate(context) {
        let result = super.canActivate(context);
        if (result instanceof rxjs_1.Observable) {
            result = (0, rxjs_1.lastValueFrom)(result);
        }
        else {
            result = Promise.resolve(result);
        }
        await result;
        return result;
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('Invalid token');
        }
        return user;
    }
};
JwtSignUpAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtSignUpAuthGuard);
exports.JwtSignUpAuthGuard = JwtSignUpAuthGuard;
//# sourceMappingURL=jwt-sign-up-auth.guard.js.map