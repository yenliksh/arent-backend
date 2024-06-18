"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentPeriodVersionEntity = void 0;
const aggregate_root_base_1 = require("../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const guard_1 = require("../../../../libs/ddd/domain/guard");
const uuid_value_object_1 = require("../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../libs/exceptions");
class RentPeriodVersionEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ shortTermRentMonth, middleTermRentMonth, longTermRentMonth, version, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            shortTermRentMonth,
            middleTermRentMonth,
            longTermRentMonth,
            version,
        };
        const rentPeriodVersion = new RentPeriodVersionEntity({ id, props });
        return rentPeriodVersion;
    }
    get id() {
        return this._id;
    }
    get shortTermRentMonth() {
        return this.props.shortTermRentMonth;
    }
    get middleTermRentMonth() {
        return this.props.middleTermRentMonth;
    }
    get longTermRentMonth() {
        return this.props.longTermRentMonth;
    }
    validate() {
        const { shortTermRentMonth, middleTermRentMonth, longTermRentMonth } = this.props;
        if (!guard_1.Guard.lengthIsBetween(shortTermRentMonth, 1, 2) ||
            !guard_1.Guard.lengthIsBetween(middleTermRentMonth, 1, 2) ||
            !guard_1.Guard.lengthIsBetween(longTermRentMonth, 1, 2)) {
            throw new exceptions_1.ArgumentInvalidException('Periods length must be 1 or 2');
        }
    }
}
exports.RentPeriodVersionEntity = RentPeriodVersionEntity;
//# sourceMappingURL=rent-period-version.entity.js.map