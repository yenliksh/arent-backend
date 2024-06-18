"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
const timezone_util_1 = require("../../libs/utils/timezone-util");
const apartment_ad_guard_1 = require("../domains/apartment-ad/domain/apartment-ad.guard");
class AddressVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super(value);
    }
    static create(createProps) {
        const { geoPoint: cords } = createProps;
        const props = { ...createProps, timezone: timezone_util_1.TimezoneUtil.getOffsetByCords(cords) };
        return new AddressVO(props);
    }
    get timezone() {
        return this.props.timezone;
    }
    unpackCreatedProps() {
        return {
            city: this.props.city,
            country: this.props.country,
            geoPoint: this.props.geoPoint,
            houseNumber: this.props.houseNumber,
            street: this.props.street,
            region: this.props.region,
        };
    }
    validate(props) {
        if (!guard_1.Guard.lengthIsBetween(props.country, 1, 50)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Country is out of range');
        }
        if (!guard_1.Guard.lengthIsBetween(props.city, 1, 100)) {
            throw new exceptions_1.ArgumentOutOfRangeException('City is out of range');
        }
        if (props.region && !guard_1.Guard.lengthIsBetween(props.region, 1, 100)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Region is out of range');
        }
        if (!guard_1.Guard.lengthIsBetween(props.street, 1, 100)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Street is out of range');
        }
        if (!guard_1.Guard.lengthIsBetween(props.houseNumber, 1, 50)) {
            throw new exceptions_1.ArgumentOutOfRangeException('House number is out of range');
        }
        if (!apartment_ad_guard_1.ApartmentAdGuard.isLat(props.geoPoint.lat)) {
            throw new exceptions_1.ArgumentInvalidException('Latitude number is invalid');
        }
        if (!apartment_ad_guard_1.ApartmentAdGuard.isLng(props.geoPoint.lng)) {
            throw new exceptions_1.ArgumentInvalidException('Longitude number is invalid');
        }
    }
    static isNotEmpty(props) {
        if (props.country &&
            props.city &&
            props.street &&
            props.houseNumber &&
            props.geoPoint.lat != null &&
            props.geoPoint.lng != null &&
            props.timezone) {
            return {
                country: props.country,
                city: props.city,
                region: props.region,
                street: props.street,
                houseNumber: props.houseNumber,
                geoPoint: {
                    lat: props.geoPoint.lat,
                    lng: props.geoPoint.lng,
                },
                timezone: props.timezone,
            };
        }
        return;
    }
}
exports.AddressVO = AddressVO;
//# sourceMappingURL=address.value-object.js.map