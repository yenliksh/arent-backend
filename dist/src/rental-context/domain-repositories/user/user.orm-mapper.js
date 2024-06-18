"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrmMapper = void 0;
const documents_value_object_1 = require("../../domain-value-objects/documents.value-object");
const reject_reason_value_object_1 = require("../../domain-value-objects/reject-reason.value-object");
const types_1 = require("../../domains/user/domain/types");
const value_objects_1 = require("../../domains/user/domain/value-objects");
const avatar_key_value_object_1 = require("../../domains/user/domain/value-objects/avatar-key.value-object");
const guarantor_value_object_1 = require("../../domains/user/domain/value-objects/guarantor.value-object");
const name_value_object_1 = require("../../domains/user/domain/value-objects/name.value-object");
const user_email_notification_value_object_1 = require("../../domains/user/domain/value-objects/notifications/user-email-notification.value-object");
const user_push_notification_value_object_1 = require("../../domains/user/domain/value-objects/notifications/user-push-notification.value-object");
const user_sms_notification_value_object_1 = require("../../domains/user/domain/value-objects/notifications/user-sms-notification.value-object");
const date_value_object_1 = require("../../../libs/ddd/domain/value-objects/date.value-object");
const iso_date_value_object_1 = require("../../../libs/ddd/domain/value-objects/iso-date.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
class UserOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        var _a, _b, _c, _d;
        const props = entity.getPropsCopy();
        const ormProps = {
            email: props.email.value,
            firstName: props.firstName.value,
            lastName: props.lastName.value,
            middleName: props.middleName ? props.middleName.value : props.middleName,
            phone: (_a = props.phone) === null || _a === void 0 ? void 0 : _a.value,
            birthDate: (_b = props.birthDate) === null || _b === void 0 ? void 0 : _b.value,
            avatarKey: props.avatarKey ? props.avatarKey.value : props.avatarKey,
            gender: props.gender,
            identityStatus: props.identityStatus,
            isPhoneApproved: props.isPhoneApproved,
            identityDocuments: (_c = props.identityDocuments) === null || _c === void 0 ? void 0 : _c.fileKeys,
            identityRejectReason: (_d = props.identityRejectReason) === null || _d === void 0 ? void 0 : _d.value,
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
    async toDomainProps(ormEntity) {
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const props = {
            email: new value_objects_1.EmailVO(ormEntity.email),
            isEmailVerified: ormEntity.isEmailVerified,
            phone: ormEntity.phone ? new value_objects_1.PhoneVO(ormEntity.phone) : undefined,
            firstName: new name_value_object_1.NameVO(ormEntity.firstName),
            lastName: new name_value_object_1.NameVO(ormEntity.lastName),
            middleName: ormEntity.middleName ? new name_value_object_1.NameVO(ormEntity.middleName) : undefined,
            birthDate: ormEntity.birthDate ? new iso_date_value_object_1.DateISOVO(ormEntity.birthDate) : undefined,
            avatarKey: ormEntity.avatarKey ? new avatar_key_value_object_1.AvatarKeyVO(ormEntity.avatarKey) : undefined,
            gender: ormEntity.gender ? types_1.GenderType[ormEntity.gender] : undefined,
            identityStatus: ormEntity.identityStatus,
            identityDocuments: ormEntity.identityDocuments
                ? new documents_value_object_1.DocumentsVO({ fileKeys: ormEntity.identityDocuments })
                : undefined,
            identityUpdatedAt: new date_value_object_1.DateVO(ormEntity.identityUpdatedAt),
            identityRejectReason: ormEntity.identityRejectReason
                ? new reject_reason_value_object_1.RejectReasonVO(ormEntity.identityRejectReason)
                : undefined,
            isPhoneApproved: ormEntity.isPhoneApproved,
            guarantors: ormEntity.guarantors
                ? ormEntity.guarantors.map((guarantor) => new guarantor_value_object_1.GuarantorVO({
                    phone: guarantor.phone,
                    firstName: guarantor.firstName,
                    lastName: guarantor.lastName,
                }))
                : undefined,
            emailNotification: new user_email_notification_value_object_1.UserEmailNotificationVO(ormEntity.emailNotification),
            smsNotification: new user_sms_notification_value_object_1.UserSmsNotificationVO(ormEntity.smsNotification),
            pushNotification: new user_push_notification_value_object_1.UserPushNotificationVO(ormEntity.pushNotification),
            numberFines: ormEntity.numberFines,
        };
        return { id, props };
    }
}
exports.UserOrmMapper = UserOrmMapper;
//# sourceMappingURL=user.orm-mapper.js.map