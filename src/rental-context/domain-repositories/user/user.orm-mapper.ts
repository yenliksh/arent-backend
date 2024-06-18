import { DocumentsVO } from '@domain-value-objects/documents.value-object';
import { RejectReasonVO } from '@domain-value-objects/reject-reason.value-object';
import { UserEntity, UserProps } from '@domains/user/domain/entities/user.entity';
import { GenderType } from '@domains/user/domain/types';
import { EmailVO, PhoneVO } from '@domains/user/domain/value-objects';
import { AvatarKeyVO } from '@domains/user/domain/value-objects/avatar-key.value-object';
import { GuarantorVO } from '@domains/user/domain/value-objects/guarantor.value-object';
import { NameVO } from '@domains/user/domain/value-objects/name.value-object';
import { UserEmailNotificationVO } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationVO } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationVO } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';

export class UserOrmMapper extends OrmMapper<UserEntity, UserOrmEntity> {
  protected async toOrmProps(entity: UserEntity): Promise<OrmEntityProps<UserOrmEntity>> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<UserOrmEntity> = {
      email: props.email.value,
      firstName: props.firstName.value,
      lastName: props.lastName.value,
      middleName: props.middleName ? props.middleName.value : props.middleName,
      phone: props.phone?.value,
      birthDate: props.birthDate?.value,
      avatarKey: props.avatarKey ? props.avatarKey.value : props.avatarKey,
      gender: props.gender,
      identityStatus: props.identityStatus,
      isPhoneApproved: props.isPhoneApproved,
      identityDocuments: props.identityDocuments?.fileKeys,
      identityRejectReason: props.identityRejectReason?.value,
      identityUpdatedAt: props.identityUpdatedAt.value,
      guarantors: props.guarantors ? props.guarantors.map((g) => g.unpack()) : undefined,
      isEmailVerified: props.isEmailVerified,
      emailNotification: props.emailNotification.unpack(),
      pushNotification: props.pushNotification.unpack(),
      smsNotification: props.smsNotification.unpack(),
      numberFines: props.numberFines,
    };

    return ormProps;
  }

  protected async toDomainProps(ormEntity: UserOrmEntity): Promise<EntityProps<UserProps>> {
    const id = new UUID(ormEntity.id);

    const props: UserProps = {
      email: new EmailVO(ormEntity.email),
      isEmailVerified: ormEntity.isEmailVerified,
      phone: ormEntity.phone ? new PhoneVO(ormEntity.phone) : undefined,
      firstName: new NameVO(ormEntity.firstName),
      lastName: new NameVO(ormEntity.lastName),
      middleName: ormEntity.middleName ? new NameVO(ormEntity.middleName) : undefined,
      birthDate: ormEntity.birthDate ? new DateISOVO(ormEntity.birthDate) : undefined,
      avatarKey: ormEntity.avatarKey ? new AvatarKeyVO(ormEntity.avatarKey) : undefined,
      gender: ormEntity.gender ? GenderType[ormEntity.gender] : undefined,
      identityStatus: ormEntity.identityStatus,
      identityDocuments: ormEntity.identityDocuments
        ? new DocumentsVO({ fileKeys: ormEntity.identityDocuments })
        : undefined,
      identityUpdatedAt: new DateVO(ormEntity.identityUpdatedAt),
      identityRejectReason: ormEntity.identityRejectReason
        ? new RejectReasonVO(ormEntity.identityRejectReason)
        : undefined,
      isPhoneApproved: ormEntity.isPhoneApproved,
      guarantors: ormEntity.guarantors
        ? ormEntity.guarantors.map(
            (guarantor) =>
              new GuarantorVO({
                phone: guarantor.phone,
                firstName: guarantor.firstName,
                lastName: guarantor.lastName,
              }),
          )
        : undefined,
      emailNotification: new UserEmailNotificationVO(ormEntity.emailNotification),
      smsNotification: new UserSmsNotificationVO(ormEntity.smsNotification),
      pushNotification: new UserPushNotificationVO(ormEntity.pushNotification),
      numberFines: ormEntity.numberFines,
    };

    return { id, props };
  }
}
