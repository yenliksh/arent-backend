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
exports.ProfileConfirmVerificationEmailService = void 0;
const utils_1 = require("../../../../../libs/utils");
const common_1 = require("@nestjs/common");
const src_1 = require("../../../../../third-parties/cloud-cache-storage/src");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
let ProfileConfirmVerificationEmailService = class ProfileConfirmVerificationEmailService {
    constructor(cacheStorageService, userRepository) {
        this.cacheStorageService = cacheStorageService;
        this.userRepository = userRepository;
    }
    async handle(userId, inputToken) {
        const tokenRecord = await this.getToken(userId);
        if (!tokenRecord || !tokenRecord.token) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Token not found'));
        }
        const email = (0, utils_1.decodeVerificationToken)(inputToken);
        const decodeEmail = (0, utils_1.decodeVerificationToken)(tokenRecord.token);
        if (email !== decodeEmail) {
            return (0, oxide_ts_1.Err)(new common_1.UnprocessableEntityException('Invalid email'));
        }
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User ad not found'));
        }
        user.approveEmail(email);
        const result = await this.userRepository.save(user);
        await this.deleteToken(userId);
        return (0, oxide_ts_1.Ok)(result);
    }
    getToken(userId) {
        return this.cacheStorageService.getValue(userId);
    }
    deleteToken(userId) {
        return this.cacheStorageService.deleteValue(userId);
    }
};
ProfileConfirmVerificationEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [src_1.CloudCacheStorageService,
        user_repository_1.UserRepository])
], ProfileConfirmVerificationEmailService);
exports.ProfileConfirmVerificationEmailService = ProfileConfirmVerificationEmailService;
//# sourceMappingURL=profile-confirm-verification-email.service.js.map