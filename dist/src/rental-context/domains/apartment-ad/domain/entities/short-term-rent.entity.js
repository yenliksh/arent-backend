"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentEntity = void 0;
const rent_booking_type_value_object_1 = require("../../../../domain-value-objects/rent-booking-type.value-object");
const rental_date_guard_1 = require("../../../contract/base-classes/rental-guards/rental-date.guard");
const enums_1 = require("../../../../../infrastructure/enums");
const entity_base_1 = require("../../../../../libs/ddd/domain/base-classes/entity.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const date_util_1 = require("../../../../../libs/utils/date-util");
const cost_and_currency_value_object_1 = require("../../../../domain-value-objects/cost-and-currency.value-object");
const apartment_ad_pause_error_1 = require("../errors/apartment-ad-pause.error");
const apartment_ad_publish_errors_1 = require("../errors/apartment-ad-publish.errors");
const apartment_ad_errors_1 = require("../errors/apartment-ad.errors");
const types_1 = require("../types");
const apartment_ad_status_value_object_1 = require("../value-objects/apartment-ad-status.value-object");
const arrival_and_departure_time_value_object_1 = require("../value-objects/arrival-and-departure-time.value-object");
const booking_access_in_month_value_object_1 = require("../value-objects/booking-access-in-month.value-object");
const short_term_rent_cancellation_policy_value_object_1 = require("../value-objects/short-term-rent-cancellation-policy.value-object");
const short_term_rent_locked_date_entity_1 = require("./short-term-rent-locked-date.entity");
class ShortTermRentEntity extends entity_base_1.Entity {
    static create({ apartmentAdId, cost }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            apartmentAdId,
            costAndCurrency: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost,
            }),
            isApproved: false,
            status: apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({ statusType: [types_1.ApartmentAdStatusType.DRAFT] }),
            rentBookingType: rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(enums_1.ShortTermRentBookingType.REQUEST),
            lockedDates: [],
            bookingAccessInMonths: new booking_access_in_month_value_object_1.BookingAccessInMonthVO({ value: 3 }),
        };
        const shortTermRent = new ShortTermRentEntity({ id, props });
        return shortTermRent;
    }
    get id() {
        return this._id;
    }
    get isPublished() {
        return this.props.status.isPublished;
    }
    get isApproved() {
        return this.props.isApproved;
    }
    get apartmentAdId() {
        return this.props.apartmentAdId;
    }
    get costAndCurrency() {
        return this.props.costAndCurrency;
    }
    get cancellationPolicy() {
        var _a;
        return (_a = this.props.cancellationPolicy) === null || _a === void 0 ? void 0 : _a.value;
    }
    get arrivalTime() {
        var _a;
        return (_a = this.props.arrivalAndDepartureTime) === null || _a === void 0 ? void 0 : _a.arrivalTime;
    }
    get departureTime() {
        var _a;
        return (_a = this.props.arrivalAndDepartureTime) === null || _a === void 0 ? void 0 : _a.departureTime;
    }
    get rentBookingType() {
        return this.props.rentBookingType.value;
    }
    get status() {
        return this.props.status;
    }
    setCost(cost) {
        this.props.costAndCurrency = cost_and_currency_value_object_1.CostAndCurrencyVO.create({
            cost,
        });
    }
    setArrivalAndDepartureTime({ arrivalTime, departureTime }) {
        const [arrivalHourString, arrivalMinString] = arrivalTime.split(':');
        const [departureHourString, departureMinString] = departureTime.split(':');
        const arrivalDate = date_util_1.DateUtil.utcNow()
            .startOf('day')
            .set('hour', Number(arrivalHourString))
            .set('minute', Number(arrivalMinString))
            .toISOString();
        const departureDate = date_util_1.DateUtil.utcNow()
            .startOf('day')
            .set('hour', Number(departureHourString))
            .set('minute', Number(departureMinString))
            .toISOString();
        rental_date_guard_1.RentalDateGuard.validateTimeOrThrowError({
            arrivalDate,
            departureDate,
        });
        this.props.arrivalAndDepartureTime = arrival_and_departure_time_value_object_1.ArrivalAndDepartureTimeVO.create({ arrivalTime, departureTime });
    }
    setCancelationPolicy(type) {
        this.props.cancellationPolicy = short_term_rent_cancellation_policy_value_object_1.ShortTermRentCancellationPolicyVO.create(type);
    }
    setRentBookingType(type) {
        this.props.rentBookingType = rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(type);
    }
    sendToApprove() {
        if (this.props.isApproved) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [...new Set([...this.props.status.statusType])],
                declineReason: null,
            });
            return this;
        }
        if (this.props.status.isDraft) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PROCESSING],
                declineReason: null,
            });
            return this;
        }
    }
    setAvailabilitySettings({ lockedDates, bookingAccessInMonths }) {
        this.props.lockedDates = lockedDates.map((i) => short_term_rent_locked_date_entity_1.ShortTermRentLockedDateEntity.create({ ...i, shortTermRentId: this.id.value }));
        this.props.bookingAccessInMonths = new booking_access_in_month_value_object_1.BookingAccessInMonthVO({ value: bookingAccessInMonths });
    }
    pause() {
        if (this.props.isApproved && this.props.status.isPublished) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PAUSED],
                declineReason: this.props.status.declineReason,
            });
            return this;
        }
        throw new apartment_ad_pause_error_1.ApartmentAdPauseError();
    }
    publish() {
        if (this.props.isApproved && this.props.status.isPaused) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PUBLISHED],
                declineReason: this.props.status.declineReason,
            });
            return this;
        }
        throw new apartment_ad_publish_errors_1.ApartmentAdPublishError();
    }
    approve() {
        if (this.props.isApproved && this.props.status.isProcessing) {
        }
        if (this.props.status.isProcessing) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PUBLISHED],
            });
            this.props.isApproved = true;
            return this;
        }
        throw new apartment_ad_publish_errors_1.ApartmentAdPublishError();
    }
    reject(declineReason) {
        if (this.props.status.isProcessing) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.DRAFT],
                declineReason,
            });
            return this;
        }
        throw new apartment_ad_publish_errors_1.ApartmentAdPublishError();
    }
    get isPublishable() {
        const { apartmentAdId, costAndCurrency, status, rentBookingType, isApproved, arrivalAndDepartureTime, cancellationPolicy, } = this.props;
        const fields = [
            apartmentAdId,
            costAndCurrency,
            status,
            rentBookingType,
            isApproved,
            arrivalAndDepartureTime,
            cancellationPolicy,
        ];
        if (fields.some((f) => f == null)) {
            return false;
        }
        return true;
    }
    validate() {
        const { apartmentAdId, costAndCurrency: { cost, currency }, status, rentBookingType, } = this.props;
        const fields = [apartmentAdId, cost, currency, status, rentBookingType];
        if (fields.some((f) => f == null)) {
            throw new apartment_ad_errors_1.ApartmentAdHasEmptyFieldsError('Short term rent must to have complete all required fields');
        }
    }
}
exports.ShortTermRentEntity = ShortTermRentEntity;
//# sourceMappingURL=short-term-rent.entity.js.map