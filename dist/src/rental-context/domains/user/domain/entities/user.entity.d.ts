import { DocumentsVO } from '@domain-value-objects/documents.value-object';
import { RejectReasonVO } from '@domain-value-objects/reject-reason.value-object';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
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
export declare type UserProps = CreateUserProps & {
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
export declare class UserEntity extends AggregateRoot<UserProps> {
    protected readonly _id: UUID;
    static create(create: CreateUserProps): UserEntity;
    get id(): UUID;
    get phone(): PhoneVO | undefined;
    get email(): EmailVO;
    get numberFines(): number;
    private get isIdentityApproved();
    private baseEditGuarantor;
    private baseDeleteGuarantor;
    editGuarantor({ phone, firstName, lastName }: CreateGuarantorProps): this;
    deleteGuarantor(): this;
    adminEditGuarantor({ phone, firstName, lastName }: CreateGuarantorProps): this;
    private baseEditPersonalName;
    editPersonalName(firstName: string, lastName: string, middleName?: string | null): UserEntity;
    adminEditPersonalName(firstName: string, lastName: string, middleName?: string | null): UserEntity;
    editAvatar(avatarKey: string | null): UserEntity;
    deleteAvatar(): void;
    private baseEditBirthDate;
    editBirthDate(birthDate: string): UserEntity;
    adminEditBirthDate(birthDate: string): UserEntity;
    editEmail(email: string): UserEntity;
    approveEmail(email: string): UserEntity;
    private baseEditGender;
    editGender(gender: GenderType): UserEntity;
    adminEditGender(gender: GenderType): UserEntity;
    addIdentityDocuments(documents: string[]): UserEntity;
    approveIdentity(): this;
    rejectIdentity(reason?: string): this;
    fining(): void;
    resetFine(): void;
    validate(): void;
}
export {};
