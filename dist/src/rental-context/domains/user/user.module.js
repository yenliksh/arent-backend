"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const sign_in_by_google_service_1 = require("./commands/sign-in-by-google/sign-in-by-google.service");
const redis_factory_1 = require("../../../infrastructure/configs/redis.factory");
const smsKz_factory_1 = require("../../../infrastructure/configs/smsKz.factory");
const sns_factory_1 = require("../../../infrastructure/configs/sns.factory");
const elasticsearch_core_module_1 = require("../../../infrastructure/elastic-search/elasticsearch-core.module");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const src_1 = require("../../../third-parties/cloud-cache-storage/src");
const src_2 = require("../../../third-parties/simple-notification/src");
const src_3 = require("../../../third-parties/sms-center-kz/src");
const admin_profile_delete_handler_1 = require("./commands/admins/admin-profile-delete/admin-profile-delete.handler");
const admin_profile_edit_birthdate_handler_1 = require("./commands/admins/admin-profile-edit-birthdate/admin-profile-edit-birthdate.handler");
const admin_profile_edit_gender_handler_1 = require("./commands/admins/admin-profile-edit-gender/admin-profile-edit-gender.handler");
const admin_profile_edit_guarantor_handler_1 = require("./commands/admins/admin-profile-edit-guarantor/admin-profile-edit-guarantor.handler");
const admin_profile_edit_name_handler_1 = require("./commands/admins/admin-profile-edit-name/admin-profile-edit-name.handler");
const profile_add_identity_documents_service_1 = require("./commands/profile-add-identity-documents/profile-add-identity-documents.service");
const profile_confirm_verification_email_service_1 = require("./commands/profile-confirm-verification-email/profile-confirm-verification-email.service");
const profile_delete_avatar_service_1 = require("./commands/profile-delete-avatar/profile-delete-avatar.service");
const profile_delete_guarantor_service_1 = require("./commands/profile-delete-guarantor/profile-delete-guarantor.service");
const profile_edit_avatar_service_1 = require("./commands/profile-edit-avatar/profile-edit-avatar.service");
const profile_edit_email_service_1 = require("./commands/profile-edit-email/profile-edit-email.service");
const profile_edit_guarantor_service_1 = require("./commands/profile-edit-guarantor/profile-edit-guarantor.service");
const profile_edit_personal_info_service_1 = require("./commands/profile-edit-personal-info/profile-edit-personal-info.service");
const profile_identity_approve_handler_1 = require("./commands/profile-identity-approve/profile-identity-approve.handler");
const profile_identity_reject_handler_1 = require("./commands/profile-identity-reject/profile-identity-reject.handler");
const profile_send_verification_email_service_1 = require("./commands/profile-verification-email-send-token/profile-send-verification-email.service");
const refresh_token_service_1 = require("./commands/refresh-token/refresh-token.service");
const sign_in_by_phone_confirm_code_service_1 = require("./commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.service");
const sign_in_by_phone_send_code_service_1 = require("./commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.service");
const sign_up_by_phone_create_create_user_service_1 = require("./commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.service");
const user_controller_1 = require("./controllers/user.controller");
const find_user_service_1 = require("./queries/find-user.service");
const user_graphql_resolver_1 = require("./resolvers/user.graphql-resolver");
const user_mutation_resolver_1 = require("./resolvers/user.mutation.resolver");
const user_query_resolver_1 = require("./resolvers/user.query.resolver");
const thirdPartyServices = [
    src_1.CloudCacheStorageModule.forRootAsync(redis_factory_1.redisConfigFactory),
    src_2.SimpleNotificationModule.forRootAsync(sns_factory_1.snsFactory),
    src_3.SmsCenterKzModule.forRootAsync(smsKz_factory_1.smsKzFactory),
];
const graphqlResolvers = [user_mutation_resolver_1.UserMutationGraphqlResolver, user_graphql_resolver_1.UserGraphqlResolver, user_query_resolver_1.UserQueryGraphqlResolver];
const commands = [
    sign_in_by_phone_send_code_service_1.SignInByPhoneSendCodeService,
    sign_in_by_google_service_1.SignInByGoogleService,
    sign_in_by_phone_confirm_code_service_1.SignInByPhoneConfirmCodeService,
    sign_up_by_phone_create_create_user_service_1.SignUpByPhoneCreateUserService,
    profile_edit_avatar_service_1.ProfileEditAvatarService,
    profile_edit_email_service_1.ProfileEditEmailService,
    profile_edit_guarantor_service_1.ProfileEditGuarantorService,
    profile_delete_guarantor_service_1.ProfileDeleteGuarantorService,
    profile_edit_personal_info_service_1.ProfileEditPersonalInfoService,
    profile_add_identity_documents_service_1.ProfileAddIdentityDocumentsService,
    profile_identity_approve_handler_1.ProfileIdentityApproveHandler,
    profile_identity_reject_handler_1.ProfileIdentityRejectHandler,
    profile_delete_avatar_service_1.ProfileDeleteAvatarService,
    profile_send_verification_email_service_1.ProfileSendVerificationEmailService,
    profile_confirm_verification_email_service_1.ProfileConfirmVerificationEmailService,
    admin_profile_edit_birthdate_handler_1.AdminProfileEditBirthdateHandler,
    admin_profile_edit_gender_handler_1.AdminProfileEditGenderHandler,
    admin_profile_edit_guarantor_handler_1.AdminProfileEditGuarantorHandler,
    admin_profile_edit_name_handler_1.AdminProfileEditNameHandler,
    refresh_token_service_1.RefreshTokenService,
    admin_profile_delete_handler_1.AdminProfileDeleteHandler,
];
const queries = [find_user_service_1.FindUserService];
const controllers = [user_controller_1.UserController];
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [elasticsearch_core_module_1.ElasticsearchCoreModule, ...thirdPartyServices, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule, axios_1.HttpModule],
        providers: [...graphqlResolvers, ...commands, ...queries],
        controllers: [...controllers],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map