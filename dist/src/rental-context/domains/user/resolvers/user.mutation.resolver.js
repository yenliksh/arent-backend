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
exports.UserMutationGraphqlResolver = void 0;
const sign_in_by_google_request_dto_1 = require("../commands/sign-in-by-google/sign-in-by-google.request.dto");
const sign_in_by_google_response_dto_1 = require("../commands/sign-in-by-google/sign-in-by-google.response.dto");
const sign_in_by_google_service_1 = require("../commands/sign-in-by-google/sign-in-by-google.service");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const sign_up_phone_decorator_1 = require("../../../../infrastructure/decorators/sign-up-phone.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const jwt_sign_up_auth_guard_1 = require("../../../../infrastructure/guards/jwt-sign-up-auth.guard");
const problem_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const profile_add_identity_documents_request_dto_1 = require("../commands/profile-add-identity-documents/profile-add-identity-documents.request.dto");
const profile_add_identity_documents_service_1 = require("../commands/profile-add-identity-documents/profile-add-identity-documents.service");
const profile_confirm_verification_email_request_dto_1 = require("../commands/profile-confirm-verification-email/profile-confirm-verification-email.request.dto");
const profile_confirm_verification_email_response_dto_1 = require("../commands/profile-confirm-verification-email/profile-confirm-verification-email.response.dto");
const profile_confirm_verification_email_service_1 = require("../commands/profile-confirm-verification-email/profile-confirm-verification-email.service");
const profile_delete_avatar_service_1 = require("../commands/profile-delete-avatar/profile-delete-avatar.service");
const profile_delete_guarantor_service_1 = require("../commands/profile-delete-guarantor/profile-delete-guarantor.service");
const profile_edit_avatar_request_dto_1 = require("../commands/profile-edit-avatar/profile-edit-avatar.request.dto");
const profile_edit_avatar_service_1 = require("../commands/profile-edit-avatar/profile-edit-avatar.service");
const profile_edit_email_request_dto_1 = require("../commands/profile-edit-email/profile-edit-email.request.dto");
const profile_edit_email_response_dto_1 = require("../commands/profile-edit-email/profile-edit-email.response.dto");
const profile_edit_email_service_1 = require("../commands/profile-edit-email/profile-edit-email.service");
const profile_edit_guarantor_request_dto_1 = require("../commands/profile-edit-guarantor/profile-edit-guarantor.request.dto");
const profile_edit_guarantor_service_1 = require("../commands/profile-edit-guarantor/profile-edit-guarantor.service");
const profile_edit_personal_info_request_dto_1 = require("../commands/profile-edit-personal-info/profile-edit-personal-info.request.dto");
const profile_edit_personal_info_service_1 = require("../commands/profile-edit-personal-info/profile-edit-personal-info.service");
const profile_send_verification_email_service_1 = require("../commands/profile-verification-email-send-token/profile-send-verification-email.service");
const sign_in_by_phone_confirm_code_request_dto_1 = require("../commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.request.dto");
const sign_in_by_phone_confirm_code_response_dto_1 = require("../commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.response.dto");
const sign_in_by_phone_confirm_code_service_1 = require("../commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.service");
const sign_in_by_phone_send_code_request_dto_1 = require("../commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.request.dto");
const sign_in_by_phone_send_code_response_dto_1 = require("../commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.response.dto");
const sign_in_by_phone_send_code_service_1 = require("../commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.service");
const sign_up_by_phone_create_create_user_request_dto_1 = require("../commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.request.dto");
const sign_up_by_phone_create_create_user_response_dto_1 = require("../commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.response.dto");
const sign_up_by_phone_create_create_user_service_1 = require("../commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.service");
const profile_response_dto_1 = require("../dtos/profile.response.dto");
const find_user_service_1 = require("../queries/find-user.service");
let UserMutationGraphqlResolver = class UserMutationGraphqlResolver {
    constructor(signInByPhoneSendCodeService, signInByPhoneConfirmCodeService, signInByGoogleService, signUpByPhoneCreateUserService, profileEditAvatarService, profileEditEmailService, profileEditGuarantorService, profileDeleteGuarantorSrvice, profileEditPersonalInfoService, findUserService, profileAddIdentityDocumentsService, profileDeleteAvatarService, profileSendVerificationEmailService, profileConfirmVerificationEmailService) {
        this.signInByPhoneSendCodeService = signInByPhoneSendCodeService;
        this.signInByPhoneConfirmCodeService = signInByPhoneConfirmCodeService;
        this.signInByGoogleService = signInByGoogleService;
        this.signUpByPhoneCreateUserService = signUpByPhoneCreateUserService;
        this.profileEditAvatarService = profileEditAvatarService;
        this.profileEditEmailService = profileEditEmailService;
        this.profileEditGuarantorService = profileEditGuarantorService;
        this.profileDeleteGuarantorSrvice = profileDeleteGuarantorSrvice;
        this.profileEditPersonalInfoService = profileEditPersonalInfoService;
        this.findUserService = findUserService;
        this.profileAddIdentityDocumentsService = profileAddIdentityDocumentsService;
        this.profileDeleteAvatarService = profileDeleteAvatarService;
        this.profileSendVerificationEmailService = profileSendVerificationEmailService;
        this.profileConfirmVerificationEmailService = profileConfirmVerificationEmailService;
    }
    async sendCode(input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(sign_in_by_phone_send_code_response_dto_1.SignInByPhoneSendCodeResponse, async () => {
            const result = await this.signInByPhoneSendCodeService.handle(input);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            return sign_in_by_phone_send_code_response_dto_1.SignInByPhoneSendCodeResponse.create({ ok: result.isOk(), smscode: result.unwrap() });
        });
    }
    async create(input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(sign_in_by_phone_confirm_code_response_dto_1.SignInByPhoneConfirmCodeResponse, async () => {
            const result = await this.signInByPhoneConfirmCodeService.handle(input);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const { userId, token, refreshToken } = result.unwrap();
            const user = userId ? await this.findUserService.handle(userId === null || userId === void 0 ? void 0 : userId.value) : null;
            return sign_in_by_phone_confirm_code_response_dto_1.SignInByPhoneConfirmCodeResponse.create({
                user: (user === null || user === void 0 ? void 0 : user.isOk()) ? user.unwrap() : undefined,
                token,
                refreshToken,
            });
        });
    }
    async googleSignIn(input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(sign_in_by_google_response_dto_1.SignInByGoogleResponse, async () => {
            const result = await this.signInByGoogleService.handle(input);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const { userId, token, refreshToken } = result.unwrap();
            const user = userId ? await this.findUserService.handle(userId === null || userId === void 0 ? void 0 : userId.value) : null;
            return sign_in_by_google_response_dto_1.SignInByGoogleResponse.create({
                user: (user === null || user === void 0 ? void 0 : user.isOk()) ? user.unwrap() : undefined,
                token,
                refreshToken,
            });
        });
    }
    async createUser(input, phone) {
        return problem_response_dto_1.ProblemResponse.catchProblems(sign_up_by_phone_create_create_user_response_dto_1.SignUpByPhoneCreateUserResponse, async () => {
            const result = await this.signUpByPhoneCreateUserService.handle(input, phone);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const { userId, token, refreshToken } = result.unwrap();
            this.profileSendVerificationEmailService.handle(userId.value);
            const user = userId ? await this.findUserService.handle(userId === null || userId === void 0 ? void 0 : userId.value) : null;
            return sign_up_by_phone_create_create_user_response_dto_1.SignUpByPhoneCreateUserResponse.create({
                user: (user === null || user === void 0 ? void 0 : user.isOk()) ? user.unwrap() : undefined,
                token,
                refreshToken,
            });
        });
    }
    async editAvatar(userId, input) {
        const result = await this.profileEditAvatarService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findUserService.handle(result.unwrap().value);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
    }
    async deleteAvatar(userId) {
        const result = await this.profileDeleteAvatarService.handle(userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findUserService.handle(result.unwrap().value);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
    }
    async editEmail(userId, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(profile_edit_email_response_dto_1.ProfileEditEmailResponse, async () => {
            const editEmailResult = await this.profileEditEmailService.handle(input, userId);
            if (editEmailResult.isErr()) {
                throw editEmailResult.unwrapErr();
            }
            const queryResult = await this.findUserService.handle(editEmailResult.unwrap().value);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
        });
    }
    async editGuarantor(userId, input) {
        const editGuarantorResult = await this.profileEditGuarantorService.handle(input, userId);
        if (editGuarantorResult.isErr()) {
            throw editGuarantorResult.unwrapErr();
        }
        const queryResult = await this.findUserService.handle(editGuarantorResult.unwrap().value);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
    }
    async deleteGuarantor(userId) {
        const editGuarantorResult = await this.profileDeleteGuarantorSrvice.handle(userId);
        if (editGuarantorResult.isErr()) {
            throw editGuarantorResult.unwrapErr();
        }
        const queryResult = await this.findUserService.handle(editGuarantorResult.unwrap().value);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
    }
    async editPersonalInfo(userId, input) {
        const editNameResult = await this.profileEditPersonalInfoService.handle(input, userId);
        if (editNameResult.isErr()) {
            throw editNameResult.unwrapErr();
        }
        const queryResult = await this.findUserService.handle(editNameResult.unwrap().value);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
    }
    async addIdentityDocuments(userId, input) {
        const result = await this.profileAddIdentityDocumentsService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findUserService.handle(result.unwrap().value);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
    }
    async sendVerificationEmail(userId) {
        const result = await this.profileSendVerificationEmailService.handle(userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return profile_confirm_verification_email_response_dto_1.ProfileConfirmVerificationEmailResponse.create(result.unwrap());
    }
    async confirmVerificationEmail(userId, input) {
        const result = await this.profileConfirmVerificationEmailService.handle(userId, input.token);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findUserService.handle(result.unwrap().value);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return profile_response_dto_1.ProfileResponse.create(queryResult.unwrap());
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => sign_in_by_phone_send_code_response_dto_1.SignInByPhoneSendCodeResponse, {
        name: 'user__signInByPhone_sendCode',
        description: 'send code to mobile phone, in development mode code will returns in response',
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_by_phone_send_code_request_dto_1.SignInByPhoneSendCodeRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "sendCode", null);
__decorate([
    (0, graphql_1.Mutation)(() => sign_in_by_phone_confirm_code_response_dto_1.SignInByPhoneConfirmCodeResponse, {
        name: 'user__signInByPhone_confirmCode',
        description: 'if token returns without user that mean that user is not exist, therefore user must be created through createUser',
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_by_phone_confirm_code_request_dto_1.SignInByPhoneConfirmCodeRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Mutation)(() => sign_in_by_google_response_dto_1.SignInByGoogleResponse, {
        name: 'user__signInByGoogle_verifyToken',
        description: 'Auth user by google, if user not registered yet, it does it',
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_by_google_request_dto_1.SignInByGoogleRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "googleSignIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_sign_up_auth_guard_1.JwtSignUpAuthGuard),
    (0, graphql_1.Mutation)(() => sign_up_by_phone_create_create_user_response_dto_1.SignUpByPhoneCreateUserResponse, { name: 'user__signUpByPhone_createUser' }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, sign_up_phone_decorator_1.SignUpPhoneDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_by_phone_create_create_user_request_dto_1.SignUpByPhoneCreateUserRequest, String]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_response_dto_1.ProfileResponse, {
        name: 'user__profile_editAvatar',
    }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_edit_avatar_request_dto_1.ProfileEditAvatarRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "editAvatar", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_response_dto_1.ProfileResponse, {
        name: 'user__profile_deleteAvatar',
    }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "deleteAvatar", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_edit_email_response_dto_1.ProfileEditEmailResponse, {
        name: 'user__profile_editEmail',
    }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_edit_email_request_dto_1.ProfileEditEmailRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "editEmail", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_response_dto_1.ProfileResponse, {
        name: 'user__profile_editGuarantor',
    }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_edit_guarantor_request_dto_1.ProfileEditGuarantorRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "editGuarantor", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_response_dto_1.ProfileResponse, {
        name: 'user__profile_deleteGuarantor',
    }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "deleteGuarantor", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_response_dto_1.ProfileResponse, {
        name: 'user__profile_editPersonalInfo',
    }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_edit_personal_info_request_dto_1.ProfileEditPersonalInfoRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "editPersonalInfo", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_response_dto_1.ProfileResponse, { name: 'user__profile_addIdentityDocuments' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_add_identity_documents_request_dto_1.ProfileAddIdentityDocumentRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "addIdentityDocuments", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_confirm_verification_email_response_dto_1.ProfileConfirmVerificationEmailResponse, { name: 'user__profile_verificationEmailSend' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "sendVerificationEmail", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => profile_response_dto_1.ProfileResponse, { name: 'user__profile_verificationEmailConfirm' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_confirm_verification_email_request_dto_1.ProfileConfirmVerificationEmailRequest]),
    __metadata("design:returntype", Promise)
], UserMutationGraphqlResolver.prototype, "confirmVerificationEmail", null);
UserMutationGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [sign_in_by_phone_send_code_service_1.SignInByPhoneSendCodeService,
        sign_in_by_phone_confirm_code_service_1.SignInByPhoneConfirmCodeService,
        sign_in_by_google_service_1.SignInByGoogleService,
        sign_up_by_phone_create_create_user_service_1.SignUpByPhoneCreateUserService,
        profile_edit_avatar_service_1.ProfileEditAvatarService,
        profile_edit_email_service_1.ProfileEditEmailService,
        profile_edit_guarantor_service_1.ProfileEditGuarantorService,
        profile_delete_guarantor_service_1.ProfileDeleteGuarantorService,
        profile_edit_personal_info_service_1.ProfileEditPersonalInfoService,
        find_user_service_1.FindUserService,
        profile_add_identity_documents_service_1.ProfileAddIdentityDocumentsService,
        profile_delete_avatar_service_1.ProfileDeleteAvatarService,
        profile_send_verification_email_service_1.ProfileSendVerificationEmailService,
        profile_confirm_verification_email_service_1.ProfileConfirmVerificationEmailService])
], UserMutationGraphqlResolver);
exports.UserMutationGraphqlResolver = UserMutationGraphqlResolver;
//# sourceMappingURL=user.mutation.resolver.js.map