"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const documents_value_object_1 = require("../../../../domain-value-objects/documents.value-object");
const reject_reason_value_object_1 = require("../../../../domain-value-objects/reject-reason.value-object");
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const date_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/date.value-object");
const iso_date_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/iso-date.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const user_identity_approved_errors_1 = require("../errors/user-identity-approved.errors");
const user_errors_1 = require("../errors/user.errors");
const types_1 = require("../types");
const value_objects_1 = require("../value-objects");
const avatar_key_value_object_1 = require("../value-objects/avatar-key.value-object");
const guarantor_value_object_1 = require("../value-objects/guarantor.value-object");
const name_value_object_1 = require("../value-objects/name.value-object");
const user_email_notification_value_object_1 = require("../value-objects/notifications/user-email-notification.value-object");
const user_push_notification_value_object_1 = require("../value-objects/notifications/user-push-notification.value-object");
const user_sms_notification_value_object_1 = require("../value-objects/notifications/user-sms-notification.value-object");
class UserEntity extends aggregate_root_base_1.AggregateRoot {
    static create(create) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            ...create,
            identityStatus: types_1.IdentityStatusType.NOT_CONFIRMED,
            identityUpdatedAt: date_value_object_1.DateVO.now(),
            emailNotification: user_email_notification_value_object_1.UserEmailNotificationVO.create(),
            pushNotification: user_push_notification_value_object_1.UserPushNotificationVO.create(),
            smsNotification: user_sms_notification_value_object_1.UserSmsNotificationVO.create(),
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
    get isIdentityApproved() {
        return this.props.identityStatus === types_1.IdentityStatusType.APPROVED;
    }
    baseEditGuarantor({ phone, firstName, lastName }) {
        this.props.guarantors = [new guarantor_value_object_1.GuarantorVO({ phone, firstName, lastName })];
        return this;
    }
    baseDeleteGuarantor() {
        this.props.guarantors = [];
        return this;
    }
    editGuarantor({ phone, firstName, lastName }) {
        return this.baseEditGuarantor({ phone, firstName, lastName });
    }
    deleteGuarantor() {
        return this.baseDeleteGuarantor();
    }
    adminEditGuarantor({ phone, firstName, lastName }) {
        return this.baseEditGuarantor({ phone, firstName, lastName });
    }
    baseEditPersonalName(firstName, lastName, middleName) {
        this.props.firstName = new name_value_object_1.NameVO(firstName);
        this.props.lastName = new name_value_object_1.NameVO(lastName);
        if (middleName) {
            this.props.middleName = new name_value_object_1.NameVO(middleName);
        }
        if (middleName === null) {
            this.props.middleName = null;
        }
        return this;
    }
    editPersonalName(firstName, lastName, middleName) {
        if (this.isIdentityApproved) {
            throw new user_identity_approved_errors_1.UserIdentityApprovedError();
        }
        return this.baseEditPersonalName(firstName, lastName, middleName);
    }
    adminEditPersonalName(firstName, lastName, middleName) {
        return this.baseEditPersonalName(firstName, lastName, middleName);
    }
    editAvatar(avatarKey) {
        this.props.avatarKey = typeof avatarKey === 'string' ? new avatar_key_value_object_1.AvatarKeyVO(avatarKey) : null;
        return this;
    }
    deleteAvatar() {
        this.props.avatarKey = null;
    }
    baseEditBirthDate(birthDate) {
        this.props.birthDate = new iso_date_value_object_1.DateISOVO(birthDate);
        return this;
    }
    editBirthDate(birthDate) {
        if (this.isIdentityApproved) {
            throw new user_identity_approved_errors_1.UserIdentityApprovedError();
        }
        return this.baseEditBirthDate(birthDate);
    }
    adminEditBirthDate(birthDate) {
        return this.baseEditBirthDate(birthDate);
    }
    editEmail(email) {
        this.props.email = new value_objects_1.EmailVO(email);
        this.props.isEmailVerified = false;
        return this;
    }
    approveEmail(email) {
        if (this.email.value !== email) {
            throw new exceptions_1.ArgumentInvalidException('Invalid email');
        }
        this.props.isEmailVerified = true;
        return this;
    }
    baseEditGender(gender) {
        this.props.gender = gender;
        return this;
    }
    editGender(gender) {
        if (this.isIdentityApproved) {
            throw new user_identity_approved_errors_1.UserIdentityApprovedError();
        }
        return this.baseEditGender(gender);
    }
    adminEditGender(gender) {
        return this.baseEditGender(gender);
    }
    addIdentityDocuments(documents) {
        if (this.isIdentityApproved) {
            throw new user_identity_approved_errors_1.UserIdentityApprovedError();
        }
        this.props.identityStatus = types_1.IdentityStatusType.PROCESSING;
        this.props.identityDocuments = new documents_value_object_1.DocumentsVO({ fileKeys: documents });
        this.props.identityUpdatedAt = date_value_object_1.DateVO.now();
        return this;
    }
    approveIdentity() {
        if (this.isIdentityApproved) {
            throw new user_identity_approved_errors_1.UserIdentityApprovedError();
        }
        this.props.identityStatus = types_1.IdentityStatusType.APPROVED;
        return this;
    }
    rejectIdentity(reason) {
        if (this.isIdentityApproved) {
            throw new user_identity_approved_errors_1.UserIdentityApprovedError();
        }
        this.props.identityStatus = types_1.IdentityStatusType.REJECTED;
        if (reason) {
            this.props.identityRejectReason = new reject_reason_value_object_1.RejectReasonVO(reason);
        }
        return this;
    }
    fining() {
        this.props.numberFines = 1;
    }
    resetFine() {
        this.props.numberFines = 0;
    }
    validate() {
        const { firstName, lastName, identityStatus, numberFines } = this.props;
        const fields = [firstName, lastName, identityStatus, numberFines];
        if (fields.some((f) => f == null)) {
            throw new user_errors_1.UserHasEmptyFieldsError('User must to complete all required fields');
        }
        if (!guard_1.Guard.isValidEnum(identityStatus, types_1.IdentityStatusType)) {
            throw new exceptions_1.ArgumentInvalidException('Identity status type is not valid');
        }
        if (guard_1.Guard.isNegative(numberFines)) {
            throw new exceptions_1.ArgumentInvalidException('Number of fines cannot be negative');
        }
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map