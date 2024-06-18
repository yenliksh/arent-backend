"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintEntity = void 0;
const user_complaint_value_object_1 = require("../value-objects/user-complaint.value-object");
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const user_complaint_error_1 = require("../errors/user-complaint.error");
class UserComplaintEntity extends aggregate_root_base_1.AggregateRoot {
    static create(createProps) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            senderUserId: new uuid_value_object_1.UUID(createProps.senderUserId),
            recipientUserId: new uuid_value_object_1.UUID(createProps.recipientUserId),
            complaint: user_complaint_value_object_1.UserComplaintVO.create(createProps.cause, createProps.reason),
            isViewed: false,
        };
        const userComplaint = new UserComplaintEntity({ id, props });
        return userComplaint;
    }
    get id() {
        return this._id;
    }
    get recipientUserId() {
        return this.props.recipientUserId;
    }
    get complaint() {
        return this.props.complaint;
    }
    adminViewed() {
        this.props.isViewed = true;
        return this;
    }
    validate() {
        const { senderUserId, recipientUserId, complaint } = this.props;
        const fields = [senderUserId, recipientUserId, complaint];
        if (fields.some((f) => f == null)) {
            throw new user_complaint_error_1.UserComplaintHasEmptyFieldsError('Complaint must to complete all required fields');
        }
        if (senderUserId.value === recipientUserId.value) {
            throw new exceptions_1.ArgumentInvalidException('Complaint sender and complaint recipient cannot be the same');
        }
    }
}
exports.UserComplaintEntity = UserComplaintEntity;
//# sourceMappingURL=user-complaint.entity.js.map