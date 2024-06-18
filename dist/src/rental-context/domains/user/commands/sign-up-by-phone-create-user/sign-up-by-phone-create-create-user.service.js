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
exports.SignUpByPhoneCreateUserService = void 0;
const iso_date_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/iso-date.value-object");
const authn_service_1 = require("../../../../../modules/auth/services/authn.service");
const types_1 = require("../../../../../modules/auth/types");
const require_identity_document_event_1 = require("../../../../../modules/notifications/services/require-identity-document/require-identity-document.event");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const user_entity_1 = require("../../domain/entities/user.entity");
const value_objects_1 = require("../../domain/value-objects");
const name_value_object_1 = require("../../domain/value-objects/name.value-object");
const email_already_used_problem_1 = require("../../problems/email-already-used.problem");
let SignUpByPhoneCreateUserService = class SignUpByPhoneCreateUserService {
    constructor(authService, userRepository, eventEmitter) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
    }
    async handle(dto, phone) {
        const { email, firstName, lastName, birthDate } = dto;
        const existUserWithPhone = await this.userRepository.existsByPhone(phone);
        if (existUserWithPhone) {
            return (0, oxide_ts_1.Err)(new common_1.UnprocessableEntityException('User already registered'));
        }
        const existUserWithEmail = await this.userRepository.existsByEmail(email);
        if (existUserWithEmail) {
            return (0, oxide_ts_1.Err)(new email_already_used_problem_1.EmailAlreadyUsedProblem());
        }
        const user = user_entity_1.UserEntity.create({
            email: new value_objects_1.EmailVO(email),
            isEmailVerified: false,
            phone: new value_objects_1.PhoneVO(phone),
            firstName: new name_value_object_1.NameVO(firstName),
            lastName: new name_value_object_1.NameVO(lastName),
            birthDate: new iso_date_value_object_1.DateISOVO(birthDate),
            isPhoneApproved: true,
        });
        await this.userRepository.save(user);
        const token = await this.authService.createToken(types_1.TokenType.USER, { id: user.id.value, phone });
        const refreshToken = await this.authService.createToken(types_1.TokenType.REFRESH, { id: user.id.value, phone });
        this.eventEmitter.emit(require_identity_document_event_1.RequireIdentityDocumentEvent.eventName, require_identity_document_event_1.RequireIdentityDocumentEvent.create({ recipientId: user.id }));
        return (0, oxide_ts_1.Ok)({ userId: user.id, token, refreshToken });
    }
};
SignUpByPhoneCreateUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authn_service_1.AuthNService,
        user_repository_1.UserRepository,
        event_emitter_1.EventEmitter2])
], SignUpByPhoneCreateUserService);
exports.SignUpByPhoneCreateUserService = SignUpByPhoneCreateUserService;
//# sourceMappingURL=sign-up-by-phone-create-create-user.service.js.map