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
exports.ProfileSendVerificationEmailService = void 0;
const utils_1 = require("../../../../../libs/utils");
const verification_email_event_1 = require("../../../../../modules/notifications/services/verification-email/verification-email.event");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const src_1 = require("../../../../../third-parties/cloud-cache-storage/src");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
let ProfileSendVerificationEmailService = class ProfileSendVerificationEmailService {
    constructor(cacheStorageService, configService, userRepository, eventEmitter) {
        this.cacheStorageService = cacheStorageService;
        this.configService = configService;
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
        this.emailFrom = this.configService.get('ses.emailFrom');
        this.tokenExpiresIn = this.configService.get('ses.tokenExp');
    }
    async handle(userId) {
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User not found'));
        }
        const email = user.email.value;
        const token = this.generateVerificationToken(email);
        this.saveTokenWithExp(userId, token, this.tokenExpiresIn);
        this.eventEmitter.emit(verification_email_event_1.VerificationEmailEvent.eventName, verification_email_event_1.VerificationEmailEvent.create({
            recipientId: user.id,
            token,
        }));
        return (0, oxide_ts_1.Ok)(token);
    }
    generateVerificationToken(email) {
        return (0, utils_1.generateVerificationToken)(email);
    }
    saveTokenWithExp(userId, token, tokenExpiresIn) {
        const { expDate } = this.cacheStorageService.setValueWithExp(userId, { token }, tokenExpiresIn);
        return {
            token,
            expDate,
        };
    }
};
ProfileSendVerificationEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [src_1.CloudCacheStorageService,
        config_1.ConfigService,
        user_repository_1.UserRepository,
        event_emitter_1.EventEmitter2])
], ProfileSendVerificationEmailService);
exports.ProfileSendVerificationEmailService = ProfileSendVerificationEmailService;
//# sourceMappingURL=profile-send-verification-email.service.js.map