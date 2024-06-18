import { GenderType, IdentityStatusType } from '@domains/user/domain/types';
import { GuarantorProps } from '@domains/user/domain/value-objects/guarantor.value-object';
import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ApartmentAdComplaintOrmEntity } from './apartment-ad-complaint.orm-entity';
import { ChatMemberOrmEntity } from './chat-member.orm-entity';
import { UserComplaintOrmEntity } from './user-complaint.orm-entity';
export declare class UserOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<UserOrmEntity, keyof Model>): UserOrmEntity;
    static tableName: string;
    phone?: string | null;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    middleName?: string | null;
    email: string;
    birthDate?: string | null;
    avatarKey?: string | null;
    gender?: GenderType;
    identityStatus: IdentityStatusType;
    identityDocuments?: string[];
    identityRejectReason?: string;
    identityUpdatedAt: Date;
    numberFines: number;
    isPhoneApproved: boolean;
    guarantors?: GuarantorProps[];
    chatMembers?: ChatMemberOrmEntity[];
    apartmentAdComplaints?: ApartmentAdComplaintOrmEntity[];
    sentComplaints?: UserComplaintOrmEntity[];
    receivedComplaints?: UserComplaintOrmEntity[];
    emailNotification: UserEmailNotificationProps;
    pushNotification: UserPushNotificationProps;
    smsNotification: UserSmsNotificationProps;
    static relationMappings: RelationMappingsThunk;
    static get jsonSchema(): {
        type: string;
        properties: {
            guarantors: {
                type: string;
            };
        };
    };
}
