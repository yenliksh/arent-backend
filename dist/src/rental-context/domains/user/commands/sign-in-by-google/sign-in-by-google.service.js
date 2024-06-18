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
exports.SignInByGoogleService = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
const value_objects_1 = require("../../domain/value-objects");
const name_value_object_1 = require("../../domain/value-objects/name.value-object");
const undefined_return_google_oauth_problem_1 = require("../../problems/undefined-return-google-oauth.problem");
const authn_service_1 = require("../../../../../modules/auth/services/authn.service");
const types_1 = require("../../../../../modules/auth/types");
const require_identity_document_event_1 = require("../../../../../modules/notifications/services/require-identity-document/require-identity-document.event");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const googleapis_1 = require("googleapis");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
let SignInByGoogleService = class SignInByGoogleService {
    constructor(authService, configService, userRepository, eventEmitter) {
        this.authService = authService;
        this.configService = configService;
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
        const clientID = this.configService.get('googleAuth.clientId');
        const clientSecret = this.configService.get('googleAuth.secret');
        this.oauthClient = new googleapis_1.google.auth.OAuth2(clientID, clientSecret);
    }
    async handle(dto) {
        const { accessToken } = dto;
        const tokenInfo = await this.oauthClient.getTokenInfo(accessToken);
        if (!tokenInfo || !tokenInfo.email) {
            return (0, oxide_ts_1.Err)(new undefined_return_google_oauth_problem_1.UndefinedReturnGoogleOauthProblem());
        }
        const user = await this.userRepository.findOneByEmail(tokenInfo.email);
        const userData = await this.getUserData(accessToken);
        if (!userData || !userData.email || !userData.given_name) {
            return (0, oxide_ts_1.Err)(new undefined_return_google_oauth_problem_1.UndefinedReturnGoogleOauthProblem());
        }
        if (!user) {
            const user = user_entity_1.UserEntity.create({
                birthDate: undefined,
                email: new value_objects_1.EmailVO(userData.email),
                isEmailVerified: true,
                isPhoneApproved: false,
                firstName: new name_value_object_1.NameVO(userData.given_name),
                lastName: new name_value_object_1.NameVO(userData.family_name ? userData.family_name : ''),
            });
            await this.userRepository.save(user);
            this.eventEmitter.emit(require_identity_document_event_1.RequireIdentityDocumentEvent.eventName, require_identity_document_event_1.RequireIdentityDocumentEvent.create({ recipientId: user.id }));
            const token = await this.authService.createToken(types_1.TokenType.USER, { id: user.id.value, email: tokenInfo.email });
            const refreshToken = await this.authService.createToken(types_1.TokenType.REFRESH, {
                id: user.id.value,
                email: tokenInfo.email,
            });
            return (0, oxide_ts_1.Ok)({ userId: user.id, token, refreshToken });
        }
        const token = await this.authService.createToken(types_1.TokenType.USER, { id: user.id.value, email: tokenInfo.email });
        const refreshToken = await this.authService.createToken(types_1.TokenType.REFRESH, {
            id: user.id.value,
            email: tokenInfo.email,
        });
        return (0, oxide_ts_1.Ok)({
            userId: user.id,
            token,
            refreshToken,
        });
    }
    async getUserData(token) {
        const userInfoClient = googleapis_1.google.oauth2('v2').userinfo;
        this.oauthClient.setCredentials({
            access_token: token,
        });
        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient,
        });
        return userInfoResponse.data;
    }
};
SignInByGoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authn_service_1.AuthNService,
        config_1.ConfigService,
        user_repository_1.UserRepository,
        event_emitter_1.EventEmitter2])
], SignInByGoogleService);
exports.SignInByGoogleService = SignInByGoogleService;
//# sourceMappingURL=sign-in-by-google.service.js.map