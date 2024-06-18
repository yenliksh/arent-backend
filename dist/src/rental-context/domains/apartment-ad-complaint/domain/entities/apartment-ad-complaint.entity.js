"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdComplaintEntity = void 0;
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const complaint_errors_1 = require("../errors/complaint.errors");
const ad_complaint_value_object_1 = require("../value-objects/ad-complaint.value-object");
class ApartmentAdComplaintEntity extends aggregate_root_base_1.AggregateRoot {
    static create(createProps) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            userId: new uuid_value_object_1.UUID(createProps.userId),
            apartmentAdId: new uuid_value_object_1.UUID(createProps.apartmentAdId),
            complaint: ad_complaint_value_object_1.AdComplaintVO.create(createProps.cause, createProps.reason),
            isViewed: false,
        };
        const apartmentAdComplaint = new ApartmentAdComplaintEntity({ id, props });
        return apartmentAdComplaint;
    }
    get id() {
        return this._id;
    }
    get apartmentAdId() {
        return this.props.apartmentAdId;
    }
    get complaint() {
        return this.props.complaint;
    }
    adminViewed() {
        this.props.isViewed = true;
        return this;
    }
    validate() {
        const { userId, apartmentAdId, complaint } = this.props;
        const fields = [userId, apartmentAdId, complaint];
        if (fields.some((f) => f == null)) {
            throw new complaint_errors_1.ComplaintHasEmptyFieldsError('Complaint must to complete all required fields');
        }
    }
}
exports.ApartmentAdComplaintEntity = ApartmentAdComplaintEntity;
//# sourceMappingURL=apartment-ad-complaint.entity.js.map