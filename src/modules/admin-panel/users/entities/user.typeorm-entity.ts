import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Model } from 'objection';
import { GenderType, IdentityStatusType } from 'src/rental-context/domains/user/domain/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Guarantor } from '../types';

const tableName = 'users';

type IUser = Omit<UserOrmEntity, keyof Model>;

@Entity({
  name: tableName,
})
export class UserTypeormEntity implements IUser {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'text', unique: true })
  phone: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  middleName?: string;

  @Column({ type: 'text' })
  birthDate: string;

  @Column({ type: 'text', nullable: true })
  avatarKey?: string;

  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender?: GenderType;

  @Column({ type: 'json' })
  guarantors: Guarantor[];

  @Column({ type: 'json' })
  emailNotification: UserEmailNotificationProps;

  @Column({ type: 'json' })
  pushNotification: UserPushNotificationProps;

  @Column({ type: 'json' })
  smsNotification: UserSmsNotificationProps;

  @Column({ type: 'enum', enum: IdentityStatusType })
  identityStatus: IdentityStatusType;

  @Column({ type: 'varchar', array: true, nullable: true })
  identityDocuments?: string[];

  @Column({ type: 'text', nullable: true })
  identityRejectReason?: string;

  @Column({ type: 'timestamp' })
  identityUpdatedAt: Date;

  @Column({ type: 'boolean', default: false })
  isPhoneApproved: boolean;

  @Column({ type: 'int', default: 0 })
  numberFines: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
