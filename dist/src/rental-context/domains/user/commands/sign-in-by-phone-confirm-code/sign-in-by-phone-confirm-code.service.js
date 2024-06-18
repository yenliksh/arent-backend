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
exports.SignInByPhoneConfirmCodeService = void 0;
const authn_service_1 = require("../../../../../modules/auth/services/authn.service");
const types_1 = require("../../../../../modules/auth/types");
const common_1 = require("@nestjs/common");
const src_1 = require("../../../../../third-parties/cloud-cache-storage/src");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const invalid_verification_phone_code_problem_1 = require("../../problems/invalid-verification-phone-code.problem");
let SignInByPhoneConfirmCodeService = class SignInByPhoneConfirmCodeService {
    constructor(authService, cacheStorageService, userRepository) {
        this.authService = authService;
        this.cacheStorageService = cacheStorageService;
        this.userRepository = userRepository;
    }
    async handle(dto) {
        const { phone, smscode } = dto;
        const codeRecord = await this.getSMScode(phone);
        if (!codeRecord || codeRecord.smscode !== smscode) {
            return (0, oxide_ts_1.Err)(new invalid_verification_phone_code_problem_1.InvalidVerificationPhoneCodeProblem());
        }
        await this.deleteSMScode(phone);
        const user = await this.userRepository.findOneByPhone(phone);
        if (!user) {
            const signUpToken = await this.authService.createToken(types_1.TokenType.SIGN_UP, { phone });
            return (0, oxide_ts_1.Ok)({
                token: signUpToken,
                userId: undefined,
                refreshToken: undefined,
            });
        }
        const token = await this.authService.createToken(types_1.TokenType.USER, { id: user.id.value, phone });
        const refreshToken = await this.authService.createToken(types_1.TokenType.REFRESH, { id: user.id.value, phone });
        return (0, oxide_ts_1.Ok)({
            userId: user.id,
            token,
            refreshToken,
        });
    }
    getSMScode(phone) {
        return this.cacheStorageService.getValue(phone);
    }
    deleteSMScode(phone) {
        return this.cacheStorageService.deleteValue(phone);
    }
};
SignInByPhoneConfirmCodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authn_service_1.AuthNService,
        src_1.CloudCacheStorageService,
        user_repository_1.UserRepository])
], SignInByPhoneConfirmCodeService);
exports.SignInByPhoneConfirmCodeService = SignInByPhoneConfirmCodeService;
//# sourceMappingURL=sign-in-by-phone-confirm-code.service.js.map