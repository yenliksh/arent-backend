"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentLockedDateEntity = void 0;
const entity_base_1 = require("../../../../../libs/ddd/domain/base-classes/entity.base");
const iso_date_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/iso-date.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
class ShortTermRentLockedDateEntity extends entity_base_1.Entity {
    static create({ shortTermRentId, startDate, endDate }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            shortTermRentId: new uuid_value_object_1.UUID(shortTermRentId),
            startDate: new iso_date_value_object_1.DateISOVO(startDate),
            endDate: new iso_date_value_object_1.DateISOVO(endDate),
        };
        const shortTermRent = new ShortTermRentLockedDateEntity({ id, props });
        return shortTermRent;
    }
    values() {
        return {
            id: this._id,
            shortTermRentId: this.props.shortTermRentId,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    validate() {
        const { startDate, endDate } = this.props;
        const fields = [startDate, endDate];
        if (fields.some((f) => f == null)) {
            throw new exceptions_1.ArgumentInvalidException('Locked dates must to have complete all required fields');
        }
    }
}
exports.ShortTermRentLockedDateEntity = ShortTermRentLockedDateEntity;
//# sourceMappingURL=short-term-rent-locked-date.entity.js.map