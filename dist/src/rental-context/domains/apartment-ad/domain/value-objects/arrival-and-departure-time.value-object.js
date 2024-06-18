"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrivalAndDepartureTimeVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../libs/exceptions");
const apartment_ad_guard_1 = require("../apartment-ad.guard");
class ArrivalAndDepartureTimeVO extends value_object_base_1.ValueObject {
    static create({ arrivalTime, departureTime }) {
        return new ArrivalAndDepartureTimeVO({
            arrivalTime,
            departureTime,
        });
    }
    get arrivalTime() {
        return this.props.arrivalTime;
    }
    get departureTime() {
        return this.props.departureTime;
    }
    validate(props) {
        const { arrivalTime, departureTime } = props;
        if (!apartment_ad_guard_1.ApartmentAdGuard.isArrivalOrDepartureTime(arrivalTime)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected arrival time');
        }
        if (!apartment_ad_guard_1.ApartmentAdGuard.isArrivalOrDepartureTime(departureTime)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected departure time');
        }
    }
}
exports.ArrivalAndDepartureTimeVO = ArrivalAndDepartureTimeVO;
//# sourceMappingURL=arrival-and-departure-time.value-object.js.map