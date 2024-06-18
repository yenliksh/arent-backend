import { DocumentsVO } from '@domain-value-objects/documents.value-object';
import { RejectReasonVO } from '@domain-value-objects/reject-reason.value-object';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { Guard } from '@libs/ddd/domain/guard';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

import { UserIdentityApprovedError } from '../errors/user-identity-approved.errors';
import { UserHasEmptyFieldsError } from '../errors/user.errors';
import { GenderType, IdentityStatusType } from '../types';
import { EmailVO, PhoneVO } from '../value-objects';
import { AvatarKeyVO } from '../value-objects/avatar-key.value-object';
import { GuarantorVO } from '../value-objects/guarantor.value-object';
import { NameVO } from '../value-objects/name.value-object';
import { UserEmailNotificationVO } from '../value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationVO } from '../value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationVO } from '../value-objects/notifications/user-sms-notification.value-object';

export interface CreateUserProps {
  phone?: PhoneVO;
  email: EmailVO;
  firstName: NameVO;
  lastName: NameVO;
  birthDate?: DateISOVO;
  isPhoneApproved: boolean;
  isEmailVerified: boolean;
}

interface CreateGuarantorProps {
  phone: string;
  firstName: string;
  lastName: string;
}

// All properties that a User has
export type UserProps = CreateUserProps & {
  middleName?: NameVO | null;
  avatarKey?: AvatarKeyVO | null;
  gender?: GenderType;
  isEmailVerified: boolean;
  identityStatus: IdentityStatusType;
  identityDocuments?: DocumentsVO;
  identityRejectReason?: RejectReasonVO;
  identityUpdatedAt: DateVO;
  guarantors?: GuarantorVO[];
  emailNotification: UserEmailNotificationVO;
  pushNotification: UserPushNotificationVO;
  smsNotification: UserSmsNotificationVO;
  numberFines: number;
};

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: UUID;

  static create(create: CreateUserProps): UserEntity {
    const id = UUID.generate();

    const props: UserProps = {
      ...create,
      identityStatus: IdentityStatusType.NOT_CONFIRMED,
      identityUpdatedAt: DateVO.now(),
      emailNotification: UserEmailNotificationVO.create(),
      pushNotification: UserPushNotificationVO.create(),
      smsNotification: UserSmsNotificationVO.create(),
      numberFines: 0,
    };

    const user = new UserEntity({ id, props });

    return user;
  }

  get id() {
    return this._id;
  }

  get phone() {
    return this.props.phone;
  }

  get email() {
    return this.props.email;
  }

  get numberFines() {
    return this.props.numberFines;
  }

  private get isIdentityApproved() {
    return this.props.identityStatus === IdentityStatusType.APPROVED;
  }

  private baseEditGuarantor({ phone, firstName, lastName }: CreateGuarantorProps) {
    this.props.guarantors = [new GuarantorVO({ phone, firstName, lastName })];
    return this;
  }

  private baseDeleteGuarantor() {
    this.props.guarantors = [];
    return this;
  }

  editGuarantor({ phone, firstName, lastName }: CreateGuarantorProps) {
    return this.baseEditGuarantor({ phone, firstName, lastName });
  }

  deleteGuarantor() {
    return this.baseDeleteGuarantor();
  }

  adminEditGuarantor({ phone, firstName, lastName }: CreateGuarantorProps) {
    return this.baseEditGuarantor({ phone, firstName, lastName });
  }

  private baseEditPersonalName(firstName: string, lastName: string, middleName?: string | null): UserEntity {
    this.props.firstName = new NameVO(firstName);
    this.props.lastName = new NameVO(lastName);

    if (middleName) {
      this.props.middleName = new NameVO(middleName);
    }
    if (middleName === null) {
      this.props.middleName = null;
    }

    return this;
  }

  editPersonalName(firstName: string, lastName: string, middleName?: string | null): UserEntity {
    if (this.isIdentityApproved) {
      throw new UserIdentityApprovedError();
    }

    return this.baseEditPersonalName(firstName, lastName, middleName);
  }

  adminEditPersonalName(firstName: string, lastName: string, middleName?: string | null): UserEntity {
    return this.baseEditPersonalName(firstName, lastName, middleName);
  }

  editAvatar(avatarKey: string | null): UserEntity {
    this.props.avatarKey = typeof avatarKey === 'string' ? new AvatarKeyVO(avatarKey) : null;
    return this;
  }

  deleteAvatar() {
    this.props.avatarKey = null;
  }

  private baseEditBirthDate(birthDate: string): UserEntity {
    this.props.birthDate = new DateISOVO(birthDate);
    return this;
  }

  editBirthDate(birthDate: string): UserEntity {
    if (this.isIdentityApproved) {
      throw new UserIdentityApprovedError();
    }

    return this.baseEditBirthDate(birthDate);
  }

  adminEditBirthDate(birthDate: string): UserEntity {
    return this.baseEditBirthDate(birthDate);
  }

  editEmail(email: string): UserEntity {
    this.props.email = new EmailVO(email);
    this.props.isEmailVerified = false;

    return this;
  }

  approveEmail(email: string): UserEntity {
    if (this.email.value !== email) {
      throw new ArgumentInvalidException('Invalid email');
    }
    this.props.isEmailVerified = true;

    return this;
  }

  private baseEditGender(gender: GenderType): UserEntity {
    this.props.gender = gender;
    return this;
  }

  editGender(gender: GenderType): UserEntity {
    if (this.isIdentityApproved) {
      throw new UserIdentityApprovedError();
    }
    // TODO: create GenderVO for check allowed genders
    return this.baseEditGender(gender);
  }

  adminEditGender(gender: GenderType): UserEntity {
    return this.baseEditGender(gender);
  }

  addIdentityDocuments(documents: string[]): UserEntity {
    if (this.isIdentityApproved) {
      throw new UserIdentityApprovedError();
    }
    this.props.identityStatus = IdentityStatusType.PROCESSING;
    this.props.identityDocuments = new DocumentsVO({ fileKeys: documents });
    this.props.identityUpdatedAt = DateVO.now();
    return this;
  }

  approveIdentity() {
    if (this.isIdentityApproved) {
      throw new UserIdentityApprovedError();
    }

    this.props.identityStatus = IdentityStatusType.APPROVED;

    return this;
  }

  rejectIdentity(reason?: string) {
    if (this.isIdentityApproved) {
      throw new UserIdentityApprovedError();
    }

    this.props.identityStatus = IdentityStatusType.REJECTED;

    if (reason) {
      this.props.identityRejectReason = new RejectReasonVO(reason);
    }

    return this;
  }

  fining() {
    this.props.numberFines = 1;
  }

  resetFine() {
    this.props.numberFines = 0;
  }

  validate(): void {
    const { firstName, lastName, identityStatus, numberFines } = this.props;

    const fields = [firstName, lastName, identityStatus, numberFines];

    if (fields.some((f) => f == null)) {
      throw new UserHasEmptyFieldsError('User must to complete all required fields');
    }

    if (!Guard.isValidEnum(identityStatus, IdentityStatusType)) {
      throw new ArgumentInvalidException('Identity status type is not valid');
    }

    if (Guard.isNegative(numberFines)) {
      throw new ArgumentInvalidException('Number of fines cannot be negative');
    }
  }
}
