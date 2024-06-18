import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { SignInByGoogleService } from '@domains/user/commands/sign-in-by-google/sign-in-by-google.service';
import { redisConfigFactory } from '@infrastructure/configs/redis.factory';
import { smsKzFactory } from '@infrastructure/configs/smsKz.factory';
import { snsFactory } from '@infrastructure/configs/sns.factory';
import { ElasticsearchCoreModule } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CloudCacheStorageModule } from '@third-parties/cloud-cache-storage/src';
import { SimpleNotificationModule } from '@third-parties/simple-notification/src';
import { SmsCenterKzModule } from '@third-parties/sms-center-kz/src';

import { AdminProfileDeleteHandler } from './commands/admins/admin-profile-delete/admin-profile-delete.handler';
import { AdminProfileEditBirthdateHandler } from './commands/admins/admin-profile-edit-birthdate/admin-profile-edit-birthdate.handler';
import { AdminProfileEditGenderHandler } from './commands/admins/admin-profile-edit-gender/admin-profile-edit-gender.handler';
import { AdminProfileEditGuarantorHandler } from './commands/admins/admin-profile-edit-guarantor/admin-profile-edit-guarantor.handler';
import { AdminProfileEditNameHandler } from './commands/admins/admin-profile-edit-name/admin-profile-edit-name.handler';
import { ProfileAddIdentityDocumentsService } from './commands/profile-add-identity-documents/profile-add-identity-documents.service';
import { ProfileConfirmVerificationEmailService } from './commands/profile-confirm-verification-email/profile-confirm-verification-email.service';
import { ProfileDeleteAvatarService } from './commands/profile-delete-avatar/profile-delete-avatar.service';
import { ProfileDeleteGuarantorService } from './commands/profile-delete-guarantor/profile-delete-guarantor.service';
import { ProfileEditAvatarService } from './commands/profile-edit-avatar/profile-edit-avatar.service';
import { ProfileEditEmailService } from './commands/profile-edit-email/profile-edit-email.service';
import { ProfileEditGuarantorService } from './commands/profile-edit-guarantor/profile-edit-guarantor.service';
import { ProfileEditPersonalInfoService } from './commands/profile-edit-personal-info/profile-edit-personal-info.service';
import { ProfileIdentityApproveHandler } from './commands/profile-identity-approve/profile-identity-approve.handler';
import { ProfileIdentityRejectHandler } from './commands/profile-identity-reject/profile-identity-reject.handler';
import { ProfileSendVerificationEmailService } from './commands/profile-verification-email-send-token/profile-send-verification-email.service';
import { RefreshTokenService } from './commands/refresh-token/refresh-token.service';
import { SignInByPhoneConfirmCodeService } from './commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.service';
import { SignInByPhoneSendCodeService } from './commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.service';
import { SignUpByPhoneCreateUserService } from './commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.service';
import { UserController } from './controllers/user.controller';
import { FindUserService } from './queries/find-user.service';
import { UserGraphqlResolver } from './resolvers/user.graphql-resolver';
import { UserMutationGraphqlResolver } from './resolvers/user.mutation.resolver';
import { UserQueryGraphqlResolver } from './resolvers/user.query.resolver';

const thirdPartyServices = [
  CloudCacheStorageModule.forRootAsync(redisConfigFactory),
  SimpleNotificationModule.forRootAsync(snsFactory),
  SmsCenterKzModule.forRootAsync(smsKzFactory),
];

const graphqlResolvers = [UserMutationGraphqlResolver, UserGraphqlResolver, UserQueryGraphqlResolver];

const commands = [
  SignInByPhoneSendCodeService,
  SignInByGoogleService,
  SignInByPhoneConfirmCodeService,
  SignUpByPhoneCreateUserService,
  ProfileEditAvatarService,
  ProfileEditEmailService,
  ProfileEditGuarantorService,
  ProfileDeleteGuarantorService,
  ProfileEditPersonalInfoService,
  ProfileAddIdentityDocumentsService,
  ProfileIdentityApproveHandler,
  ProfileIdentityRejectHandler,
  ProfileDeleteAvatarService,
  ProfileSendVerificationEmailService,
  ProfileConfirmVerificationEmailService,
  AdminProfileEditBirthdateHandler,
  AdminProfileEditGenderHandler,
  AdminProfileEditGuarantorHandler,
  AdminProfileEditNameHandler,
  RefreshTokenService,
  AdminProfileDeleteHandler,
];

const queries = [FindUserService];

const controllers = [UserController];

@Module({
  imports: [ElasticsearchCoreModule, ...thirdPartyServices, RentalContextDomainRepositoriesModule, HttpModule],
  providers: [...graphqlResolvers, ...commands, ...queries],
  controllers: [...controllers],
})
export class UserModule {}
