import { SignInByGoogleRequest } from '@domains/user/commands/sign-in-by-google/sign-in-by-google.request.dto';
import { SignInByGoogleResponse } from '@domains/user/commands/sign-in-by-google/sign-in-by-google.response.dto';
import { SignInByGoogleService } from '@domains/user/commands/sign-in-by-google/sign-in-by-google.service';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { SignUpPhoneDecorator } from '@infrastructure/decorators/sign-up-phone.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { JwtSignUpAuthGuard } from '@infrastructure/guards/jwt-sign-up-auth.guard';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ProfileAddIdentityDocumentRequest } from '../commands/profile-add-identity-documents/profile-add-identity-documents.request.dto';
import { ProfileAddIdentityDocumentsService } from '../commands/profile-add-identity-documents/profile-add-identity-documents.service';
import { ProfileConfirmVerificationEmailRequest } from '../commands/profile-confirm-verification-email/profile-confirm-verification-email.request.dto';
import { ProfileConfirmVerificationEmailResponse } from '../commands/profile-confirm-verification-email/profile-confirm-verification-email.response.dto';
import { ProfileConfirmVerificationEmailService } from '../commands/profile-confirm-verification-email/profile-confirm-verification-email.service';
import { ProfileDeleteAvatarService } from '../commands/profile-delete-avatar/profile-delete-avatar.service';
import { ProfileDeleteGuarantorService } from '../commands/profile-delete-guarantor/profile-delete-guarantor.service';
import { ProfileEditAvatarRequest } from '../commands/profile-edit-avatar/profile-edit-avatar.request.dto';
import { ProfileEditAvatarService } from '../commands/profile-edit-avatar/profile-edit-avatar.service';
import { ProfileEditEmailRequest } from '../commands/profile-edit-email/profile-edit-email.request.dto';
import { ProfileEditEmailResponse } from '../commands/profile-edit-email/profile-edit-email.response.dto';
import { ProfileEditEmailService } from '../commands/profile-edit-email/profile-edit-email.service';
import { ProfileEditGuarantorRequest } from '../commands/profile-edit-guarantor/profile-edit-guarantor.request.dto';
import { ProfileEditGuarantorService } from '../commands/profile-edit-guarantor/profile-edit-guarantor.service';
import { ProfileEditPersonalInfoRequest } from '../commands/profile-edit-personal-info/profile-edit-personal-info.request.dto';
import { ProfileEditPersonalInfoService } from '../commands/profile-edit-personal-info/profile-edit-personal-info.service';
import { ProfileSendVerificationEmailService } from '../commands/profile-verification-email-send-token/profile-send-verification-email.service';
import { SignInByPhoneConfirmCodeRequest } from '../commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.request.dto';
import { SignInByPhoneConfirmCodeResponse } from '../commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.response.dto';
import { SignInByPhoneConfirmCodeService } from '../commands/sign-in-by-phone-confirm-code/sign-in-by-phone-confirm-code.service';
import { SignInByPhoneSendCodeRequest } from '../commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.request.dto';
import { SignInByPhoneSendCodeResponse } from '../commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.response.dto';
import { SignInByPhoneSendCodeService } from '../commands/sign-in-by-phone-send-code/sign-in-by-phone-send-code.service';
import { SignUpByPhoneCreateUserRequest } from '../commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.request.dto';
import { SignUpByPhoneCreateUserResponse } from '../commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.response.dto';
import { SignUpByPhoneCreateUserService } from '../commands/sign-up-by-phone-create-user/sign-up-by-phone-create-create-user.service';
import { ProfileResponse } from '../dtos/profile.response.dto';
import { FindUserService } from '../queries/find-user.service';

@Resolver()
export class UserMutationGraphqlResolver {
  constructor(
    private readonly signInByPhoneSendCodeService: SignInByPhoneSendCodeService,
    private readonly signInByPhoneConfirmCodeService: SignInByPhoneConfirmCodeService,
    private readonly signInByGoogleService: SignInByGoogleService,
    private readonly signUpByPhoneCreateUserService: SignUpByPhoneCreateUserService,
    private readonly profileEditAvatarService: ProfileEditAvatarService,
    private readonly profileEditEmailService: ProfileEditEmailService,
    private readonly profileEditGuarantorService: ProfileEditGuarantorService,
    private readonly profileDeleteGuarantorSrvice: ProfileDeleteGuarantorService,
    private readonly profileEditPersonalInfoService: ProfileEditPersonalInfoService,
    private readonly findUserService: FindUserService,
    private readonly profileAddIdentityDocumentsService: ProfileAddIdentityDocumentsService,
    private readonly profileDeleteAvatarService: ProfileDeleteAvatarService,
    private readonly profileSendVerificationEmailService: ProfileSendVerificationEmailService,
    private readonly profileConfirmVerificationEmailService: ProfileConfirmVerificationEmailService,
  ) {}

  @Mutation(() => SignInByPhoneSendCodeResponse, {
    name: 'user__signInByPhone_sendCode',
    description: 'send code to mobile phone, in development mode code will returns in response',
  })
  async sendCode(@Args('input') input: SignInByPhoneSendCodeRequest): Promise<SignInByPhoneSendCodeResponse> {
    return ProblemResponse.catchProblems(SignInByPhoneSendCodeResponse, async () => {
      const result = await this.signInByPhoneSendCodeService.handle(input);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      return SignInByPhoneSendCodeResponse.create({ ok: result.isOk(), smscode: result.unwrap() });
    });
  }

  @Mutation(() => SignInByPhoneConfirmCodeResponse, {
    name: 'user__signInByPhone_confirmCode',
    description:
      'if token returns without user that mean that user is not exist, therefore user must be created through createUser',
  })
  async create(@Args('input') input: SignInByPhoneConfirmCodeRequest): Promise<SignInByPhoneConfirmCodeResponse> {
    return ProblemResponse.catchProblems(SignInByPhoneConfirmCodeResponse, async () => {
      const result = await this.signInByPhoneConfirmCodeService.handle(input);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const { userId, token, refreshToken } = result.unwrap();

      const user = userId ? await this.findUserService.handle(userId?.value) : null;

      return SignInByPhoneConfirmCodeResponse.create({
        user: user?.isOk() ? user.unwrap() : undefined,
        token,
        refreshToken,
      });
    });
  }

  @Mutation(() => SignInByGoogleResponse, {
    name: 'user__signInByGoogle_verifyToken',
    description: 'Auth user by google, if user not registered yet, it does it',
  })
  async googleSignIn(@Args('input') input: SignInByGoogleRequest): Promise<SignInByGoogleResponse> {
    return ProblemResponse.catchProblems(SignInByGoogleResponse, async () => {
      const result = await this.signInByGoogleService.handle(input);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const { userId, token, refreshToken } = result.unwrap();

      const user = userId ? await this.findUserService.handle(userId?.value) : null;

      return SignInByGoogleResponse.create({
        user: user?.isOk() ? user.unwrap() : undefined,
        token,
        refreshToken,
      });
    });
  }

  @UseGuards(JwtSignUpAuthGuard)
  @Mutation(() => SignUpByPhoneCreateUserResponse, { name: 'user__signUpByPhone_createUser' })
  async createUser(
    @Args('input') input: SignUpByPhoneCreateUserRequest,
    @SignUpPhoneDecorator() phone: string,
  ): Promise<SignUpByPhoneCreateUserResponse> {
    return ProblemResponse.catchProblems(SignUpByPhoneCreateUserResponse, async () => {
      const result = await this.signUpByPhoneCreateUserService.handle(input, phone);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const { userId, token, refreshToken } = result.unwrap();

      this.profileSendVerificationEmailService.handle(userId.value);

      const user = userId ? await this.findUserService.handle(userId?.value) : null;

      return SignUpByPhoneCreateUserResponse.create({
        user: user?.isOk() ? user.unwrap() : undefined,
        token,
        refreshToken,
      });
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileResponse, {
    name: 'user__profile_editAvatar',
  })
  async editAvatar(@IAM('id') userId: UserOrmEntity['id'], @Args('input') input: ProfileEditAvatarRequest) {
    const result = await this.profileEditAvatarService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findUserService.handle(result.unwrap().value);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ProfileResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileResponse, {
    name: 'user__profile_deleteAvatar',
  })
  async deleteAvatar(@IAM('id') userId: UserOrmEntity['id']) {
    const result = await this.profileDeleteAvatarService.handle(userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findUserService.handle(result.unwrap().value);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ProfileResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileEditEmailResponse, {
    name: 'user__profile_editEmail',
  })
  async editEmail(@IAM('id') userId: UserOrmEntity['id'], @Args('input') input: ProfileEditEmailRequest) {
    return ProblemResponse.catchProblems(ProfileEditEmailResponse, async () => {
      const editEmailResult = await this.profileEditEmailService.handle(input, userId);

      if (editEmailResult.isErr()) {
        throw editEmailResult.unwrapErr();
      }

      const queryResult = await this.findUserService.handle(editEmailResult.unwrap().value);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ProfileResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileResponse, {
    name: 'user__profile_editGuarantor',
  })
  async editGuarantor(@IAM('id') userId: UserOrmEntity['id'], @Args('input') input: ProfileEditGuarantorRequest) {
    const editGuarantorResult = await this.profileEditGuarantorService.handle(input, userId);

    if (editGuarantorResult.isErr()) {
      throw editGuarantorResult.unwrapErr();
    }

    const queryResult = await this.findUserService.handle(editGuarantorResult.unwrap().value);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ProfileResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileResponse, {
    name: 'user__profile_deleteGuarantor',
  })
  async deleteGuarantor(@IAM('id') userId: UserOrmEntity['id']) {
    const editGuarantorResult = await this.profileDeleteGuarantorSrvice.handle(userId);

    if (editGuarantorResult.isErr()) {
      throw editGuarantorResult.unwrapErr();
    }

    const queryResult = await this.findUserService.handle(editGuarantorResult.unwrap().value);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ProfileResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileResponse, {
    name: 'user__profile_editPersonalInfo',
  })
  async editPersonalInfo(@IAM('id') userId: UserOrmEntity['id'], @Args('input') input: ProfileEditPersonalInfoRequest) {
    const editNameResult = await this.profileEditPersonalInfoService.handle(input, userId);

    if (editNameResult.isErr()) {
      throw editNameResult.unwrapErr();
    }

    const queryResult = await this.findUserService.handle(editNameResult.unwrap().value);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ProfileResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileResponse, { name: 'user__profile_addIdentityDocuments' })
  async addIdentityDocuments(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: ProfileAddIdentityDocumentRequest,
  ) {
    const result = await this.profileAddIdentityDocumentsService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findUserService.handle(result.unwrap().value);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ProfileResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileConfirmVerificationEmailResponse, { name: 'user__profile_verificationEmailSend' })
  async sendVerificationEmail(@IAM('id') userId: UserOrmEntity['id']) {
    const result = await this.profileSendVerificationEmailService.handle(userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ProfileConfirmVerificationEmailResponse.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ProfileResponse, { name: 'user__profile_verificationEmailConfirm' })
  async confirmVerificationEmail(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: ProfileConfirmVerificationEmailRequest,
  ) {
    const result = await this.profileConfirmVerificationEmailService.handle(userId, input.token);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findUserService.handle(result.unwrap().value);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ProfileResponse.create(queryResult.unwrap());
  }
}
