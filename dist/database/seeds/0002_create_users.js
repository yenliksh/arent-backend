"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const user_email_notification_value_object_1 = require("../../src/rental-context/domains/user/domain/value-objects/notifications/user-email-notification.value-object");
const user_push_notification_value_object_1 = require("../../src/rental-context/domains/user/domain/value-objects/notifications/user-push-notification.value-object");
const user_sms_notification_value_object_1 = require("../../src/rental-context/domains/user/domain/value-objects/notifications/user-sms-notification.value-object");
const faker_1 = require("@faker-js/faker");
const user_orm_entity_1 = require("../../src/infrastructure/database/entities/user.orm-entity");
const types_1 = require("../../src/rental-context/domains/user/domain/types");
const uuid_1 = require("uuid");
const private_images_1 = require("../mock/private_images");
const public_images_1 = require("../mock/public_images");
async function seed(knex) {
    const isProd = process.env.NODE_ENV === 'production';
    const recordsCount = await knex(user_orm_entity_1.UserOrmEntity.tableName).count();
    if (isProd || recordsCount[0].count !== '0') {
        return;
    }
    const users = await Promise.all(new Array(50).fill(undefined).map((_, index) => {
        const identityStatus = index < 11
            ? types_1.IdentityStatusType.APPROVED
            : Object.keys(types_1.IdentityStatusType)[faker_1.faker.datatype.number({ min: 0, max: 3 })];
        const gender = Object.keys(types_1.GenderType)[faker_1.faker.datatype.number({ min: 0, max: 1 })];
        let identityDocuments = undefined;
        let identityRejectReason = undefined;
        if (identityStatus === types_1.IdentityStatusType.APPROVED) {
            identityDocuments = private_images_1.userIdentityDocuments;
        }
        if (identityStatus === types_1.IdentityStatusType.PROCESSING) {
            identityDocuments = private_images_1.userIdentityDocuments;
        }
        if (identityStatus === types_1.IdentityStatusType.REJECTED) {
            identityDocuments = private_images_1.userIdentityDocuments;
            identityRejectReason = faker_1.faker.lorem.words(30);
        }
        return {
            id: (0, uuid_1.v4)(),
            phone: `+79${index > 9 ? index : '0' + index}5553535`,
            identityUpdatedAt: new Date(),
            isEmailVerified: faker_1.faker.datatype.boolean(),
            isPhoneApproved: true,
            avatarKey: public_images_1.userAvatars[faker_1.faker.datatype.number({ min: 0, max: public_images_1.userAvatars.length - 1 })],
            gender: gender,
            firstName: faker_1.faker.name.firstName(),
            lastName: faker_1.faker.name.lastName(),
            email: faker_1.faker.internet.email().toLowerCase(),
            birthDate: faker_1.faker.date.between('2015-01-01', '2015-01-05').toISOString().slice(0, 10),
            identityStatus,
            identityDocuments,
            identityRejectReason,
            numberFines: 0,
            emailNotification: user_email_notification_value_object_1.UserEmailNotificationVO.create().unpack(),
            pushNotification: user_push_notification_value_object_1.UserPushNotificationVO.create().unpack(),
            smsNotification: user_sms_notification_value_object_1.UserSmsNotificationVO.create().unpack(),
            updatedAt: new Date(),
            createdAt: new Date(),
        };
    }));
    return await knex(user_orm_entity_1.UserOrmEntity.tableName).insert(users);
}
exports.seed = seed;
//# sourceMappingURL=0002_create_users.js.map