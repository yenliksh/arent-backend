import { SignInByGoogleRequest } from '@domains/user/commands/sign-in-by-google/sign-in-by-google.request.dto';
import { SignInByGoogleResponse } from '@domains/user/commands/sign-in-by-google/sign-in-by-google.response.dto';
import { SignInByGoogleService } from '@domains/user/commands/sign-in-by-google/sign-in-by-google.service';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
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
export declare class UserMutationGraphqlResolver {
    private readonly signInByPhoneSendCodeService;
    private readonly signInByPhoneConfirmCodeService;
    private readonly signInByGoogleService;
    private readonly signUpByPhoneCreateUserService;
    private readonly profileEditAvatarService;
    private readonly profileEditEmailService;
    private readonly profileEditGuarantorService;
    private readonly profileDeleteGuarantorSrvice;
    private readonly profileEditPersonalInfoService;
    private readonly findUserService;
    private readonly profileAddIdentityDocumentsService;
    private readonly profileDeleteAvatarService;
    private readonly profileSendVerificationEmailService;
    private readonly profileConfirmVerificationEmailService;
    constructor(signInByPhoneSendCodeService: SignInByPhoneSendCodeService, signInByPhoneConfirmCodeService: SignInByPhoneConfirmCodeService, signInByGoogleService: SignInByGoogleService, signUpByPhoneCreateUserService: SignUpByPhoneCreateUserService, profileEditAvatarService: ProfileEditAvatarService, profileEditEmailService: ProfileEditEmailService, profileEditGuarantorService: ProfileEditGuarantorService, profileDeleteGuarantorSrvice: ProfileDeleteGuarantorService, profileEditPersonalInfoService: ProfileEditPersonalInfoService, findUserService: FindUserService, profileAddIdentityDocumentsService: ProfileAddIdentityDocumentsService, profileDeleteAvatarService: ProfileDeleteAvatarService, profileSendVerificationEmailService: ProfileSendVerificationEmailService, profileConfirmVerificationEmailService: ProfileConfirmVerificationEmailService);
    sendCode(input: SignInByPhoneSendCodeRequest): Promise<SignInByPhoneSendCodeResponse>;
    create(input: SignInByPhoneConfirmCodeRequest): Promise<SignInByPhoneConfirmCodeResponse>;
    googleSignIn(input: SignInByGoogleRequest): Promise<SignInByGoogleResponse>;
    createUser(input: SignUpByPhoneCreateUserRequest, phone: string): Promise<SignUpByPhoneCreateUserResponse>;
    editAvatar(userId: UserOrmEntity['id'], input: ProfileEditAvatarRequest): Promise<ProfileResponse>;
    deleteAvatar(userId: UserOrmEntity['id']): Promise<ProfileResponse>;
    editEmail(userId: UserOrmEntity['id'], input: ProfileEditEmailRequest): Promise<ProfileEditEmailResponse>;
    editGuarantor(userId: UserOrmEntity['id'], input: ProfileEditGuarantorRequest): Promise<ProfileResponse>;
    deleteGuarantor(userId: UserOrmEntity['id']): Promise<ProfileResponse>;
    editPersonalInfo(userId: UserOrmEntity['id'], input: ProfileEditPersonalInfoRequest): Promise<ProfileResponse>;
    addIdentityDocuments(userId: UserOrmEntity['id'], input: ProfileAddIdentityDocumentRequest): Promise<ProfileResponse>;
    sendVerificationEmail(userId: UserOrmEntity['id']): Promise<ProfileConfirmVerificationEmailResponse>;
    confirmVerificationEmail(userId: UserOrmEntity['id'], input: ProfileConfirmVerificationEmailRequest): Promise<ProfileResponse>;
}
