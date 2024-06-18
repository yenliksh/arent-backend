"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContractApartmentAdDataVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../libs/exceptions");
const timezone_util_1 = require("../../../../../libs/utils/timezone-util");
class BaseContractApartmentAdDataVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get timezone() {
        return timezone_util_1.TimezoneUtil.getOffsetByCords({
            lat: this.props.address.geoPoint.lat,
            lng: this.props.address.geoPoint.lng,
        });
    }
    validate(props) {
        const { title } = props;
        const { city, country, geoPoint, houseNumber, street } = props.address;
        const fields = [title, city, country, geoPoint, houseNumber, street];
        if (fields.some((f) => f == null)) {
            throw new exceptions_1.ArgumentInvalidException('Base apartment ad data for contract must to have complete all required fields');
        }
    }
}
exports.BaseContractApartmentAdDataVO = BaseContractApartmentAdDataVO;
//# sourceMappingURL=base-contract-apartment-ad-data.value-object.js.map