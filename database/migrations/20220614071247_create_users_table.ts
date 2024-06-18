import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import type { Knex } from 'knex';

const tableName = 'users';

const identityStatus = ['NOT_CONFIRMED', 'PROCESSING', 'APPROVED', 'REJECTED'];

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.string('phone', 16).unique().nullable().index();
    t.string('email', 320).unique().notNullable();
    t.string('firstName', 320).notNullable();
    t.string('lastName', 320).notNullable();
    t.string('middleName', 320);
    t.string('birthDate', 16).nullable();
    t.string('avatarKey');
    t.enu('gender', ['MALE', 'FEMALE']);
    t.json('guarantors').defaultTo(JSON.stringify([])).notNullable();
    t.enum('identityStatus', identityStatus).defaultTo(identityStatus[0]);
    t.specificType('identityDocuments', 'varchar[]');
    t.text('identityRejectReason');
    t.timestamp('identityUpdatedAt').defaultTo(knex.fn.now());
    t.boolean('isPhoneApproved').defaultTo(false);
    t.boolean('isEmailVerified').defaultTo(false);

    t.json('emailNotification').defaultTo(defaultEmailNotification).notNullable();
    t.json('pushNotification').defaultTo(defaultPushNotification).notNullable();
    t.json('smsNotification').defaultTo(defaultSmsNotification).notNullable();

    t.integer('numberFines').unsigned().defaultTo(0).notNullable();

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

const defaultEmailNotification: UserEmailNotificationProps = {
  newMessages: true,
  bookingRequestSent: true,
  contractConcluded: true,
  businessTrains: true,
  transferSuccess: true,
  transferFailure: true,
  recurringPaymentSuccess: true,
  recurringPaymentFailure: true,
  reminderNeedToPayRent: true,
  adApproved: true,
  adRejected: true,
};

const defaultPushNotification: UserPushNotificationProps = {
  reminderUnreadMessages: true,
  newMessages: true,
  bookingRequestSent: true,
  bookingRequestUpdated: true,
  contractOfferSent: true,
  contractOfferUpdated: true,
  contractCompleted: true,
  contractConcluded: true,
  contractRejectedByAdmin: true,
  bookingRequestAccepted: true,
  changesInPassportDetails: true,
  reminderTenantUpcomingEntryDate: true,
  reminderLandlordUpcomingEntryDate: true,
  recurringPaymentSuccess: true,
  recurringPaymentFailure: true,
  adApproved: true,
  adRejected: true,
  adStatusUpdatedByAdmin: true,
  adRemovedByAdmin: true,
  adUpdatedByAdmin: true,
};

const defaultSmsNotification: UserSmsNotificationProps = {
  reminderUnreadMessages: true,
  accountRemovedByAdmin: true,
  bookingRequestUpdated: true,
  contractCancellationOfTheLease: true,
  reminderUpcomingDepartureDate: true,
  reminderNeedToPayRent: true,
};
