"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdEntity = void 0;
const address_value_object_1 = require("../../../../domain-value-objects/address.value-object");
const apartment_characteristics_value_object_1 = require("../../../../domain-value-objects/apartment-characteristics.value-object");
const apartment_rules_value_object_1 = require("../../../../domain-value-objects/apartment-rules.value-object");
const enums_1 = require("../../../../../infrastructure/enums");
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../libs/exceptions/illegal-operation.exception");
const date_util_1 = require("../../../../../libs/utils/date-util");
const payment_method_value_object_1 = require("../../../../domain-value-objects/payment-method.value-object");
const apartment_ad_guard_1 = require("../apartment-ad.guard");
const apartment_ad_pause_error_1 = require("../errors/apartment-ad-pause.error");
const apartment_ad_publish_errors_1 = require("../errors/apartment-ad-publish.errors");
const apartment_ad_term_period_errors_1 = require("../errors/apartment-ad-term-period.errors");
const apartment_ad_errors_1 = require("../errors/apartment-ad.errors");
const long_term_rent_errors_1 = require("../errors/long-term-rent.errors");
const types_1 = require("../types");
const apartment_ad_description_value_object_1 = require("../value-objects/apartment-ad-description.value-object");
const apartment_ad_details_value_object_1 = require("../value-objects/apartment-ad-details.value-object");
const apartment_category_value_objects_1 = require("../value-objects/apartment-category.value-objects");
const apartment_type_value_object_1 = require("../value-objects/apartment-type.value-object");
const legal_capacity_value_object_1 = require("../value-objects/legal-capacity.value-object");
const media_value_object_1 = require("../value-objects/media.value-object");
const rent_period_type_value_object_1 = require("../value-objects/rent-period-type.value-object");
const long_term_rent_entity_1 = require("./long-term-rent.entity");
const short_term_rent_entity_1 = require("./short-term-rent.entity");
const TOTAL_STEPS = 7;
class ApartmentAdEntity extends aggregate_root_base_1.AggregateRoot {
    constructor() {
        super(...arguments);
        this.isExistLongTermRent = (longTermRent) => {
            return (longTermRent === null || longTermRent === void 0 ? void 0 : longTermRent.id) !== undefined;
        };
        this.isExistShortTermRent = (longTermRent) => {
            return (longTermRent === null || longTermRent === void 0 ? void 0 : longTermRent.id) !== undefined;
        };
    }
    static create({ landlordId, rentPeriodType, shortTermRentCost, longTermRentCost, slug, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            landlordId,
            apartmentCategory: apartment_category_value_objects_1.ApartmentCategoryVO.create(types_1.ApartmentCategory.FLAT),
            apartmentType: apartment_type_value_object_1.ApartmentTypeVO.create(types_1.ApartmentType.FLAT),
            legalCapacity: legal_capacity_value_object_1.LegalCapacityVO.create({ type: types_1.LegalCapacityType.INDIVIDUAL }),
            rentPeriodType: rent_period_type_value_object_1.RentPeriodTypeVO.create(rentPeriodType),
            longTermRent: longTermRentCost
                ? long_term_rent_entity_1.LongTermRentEntity.create({
                    apartmentAdId: uuid_value_object_1.UUID.generate(),
                    cost: longTermRentCost,
                })
                : undefined,
            shortTermRent: shortTermRentCost
                ? short_term_rent_entity_1.ShortTermRentEntity.create({
                    apartmentAdId: uuid_value_object_1.UUID.generate(),
                    cost: shortTermRentCost,
                })
                : undefined,
            completeStep: 1,
            longTermRentAdIsRented: false,
            isUserIdentityApproved: false,
            slug,
        };
        const apartmentAd = new ApartmentAdEntity({ id, props });
        return apartmentAd;
    }
    get id() {
        return this._id;
    }
    get landlordId() {
        return this.props.landlordId;
    }
    get rules() {
        return this.props.rules;
    }
    get rentPeriodType() {
        return this.props.rentPeriodType;
    }
    get longTermRentIsRented() {
        return this.props.longTermRentAdIsRented;
    }
    get shortTermRentCancellationPolicy() {
        var _a;
        return (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.cancellationPolicy;
    }
    get longTermRentCancellationPolicy() {
        var _a;
        return (_a = this.props.longTermRent) === null || _a === void 0 ? void 0 : _a.cancellationPolicy;
    }
    get isPaymentMethodAttached() {
        var _a;
        return !!((_a = this.props.paymentMethod) === null || _a === void 0 ? void 0 : _a.innopayCardId);
    }
    get isAllStepsCreationFilled() {
        return this.props.completeStep === TOTAL_STEPS;
    }
    get rentBookingType() {
        var _a;
        return (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.rentBookingType;
    }
    setStep(step) {
        if (step > TOTAL_STEPS) {
            return;
        }
        this.props.completeStep = step <= this.props.completeStep ? this.props.completeStep : step;
    }
    getCostAndCurrency(type) {
        let rentEntity;
        if (type === enums_1.ApartmentRentPeriodType.LONG_TERM) {
            rentEntity = this.props.longTermRent;
        }
        if (type === enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            rentEntity = this.props.shortTermRent;
        }
        if (!rentEntity) {
            throw new exceptions_1.ArgumentInvalidException(`Rent entity does not exist for ${type} rent type`);
        }
        return rentEntity.costAndCurrency;
    }
    getTimezoneOrFail() {
        var _a;
        const timezone = (_a = this.props.address) === null || _a === void 0 ? void 0 : _a.timezone;
        if (!timezone) {
            throw new exceptions_1.ArgumentInvalidException('Timezone required');
        }
        return timezone;
    }
    getDepartureTimeOrFail() {
        var _a;
        const departureTime = (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.departureTime;
        if (!departureTime) {
            throw new exceptions_1.ArgumentInvalidException('Departure time required');
        }
        return departureTime;
    }
    getArrivalTimeOrFail() {
        var _a;
        const arrivalTime = (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.arrivalTime;
        if (!arrivalTime) {
            throw new exceptions_1.ArgumentInvalidException('Arrival time required');
        }
        return arrivalTime;
    }
    get longTermRentId() {
        var _a;
        return (_a = this.props.longTermRent) === null || _a === void 0 ? void 0 : _a.id;
    }
    get shortTermRentId() {
        var _a;
        return (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.id;
    }
    editShortTermRentApartmentAd(shortTermRentCost) {
        const editShortTermRentMap = {
            ['CREATE']: shortTermRentCost != null && !this.isExistShortTermRent(this.props.shortTermRent),
            ['REMOVE']: shortTermRentCost == null && this.isExistShortTermRent(this.props.shortTermRent),
            ['UPDATE']: shortTermRentCost != null && this.isExistShortTermRent(this.props.shortTermRent),
        };
        let action = null;
        if (editShortTermRentMap.UPDATE) {
            this.props.shortTermRent.setCost(shortTermRentCost);
            action = 'UPDATE';
        }
        if (editShortTermRentMap.CREATE) {
            this.props.shortTermRent = short_term_rent_entity_1.ShortTermRentEntity.create({
                apartmentAdId: uuid_value_object_1.UUID.generate(),
                cost: shortTermRentCost,
            });
            action = 'CREATE';
        }
        if (editShortTermRentMap.REMOVE) {
            this.props.shortTermRent = null;
            action = 'REMOVE';
        }
        return action;
    }
    editLongTermRentApartmentAd(longTermRentCost) {
        const editLongTermRentMap = {
            ['CREATE']: longTermRentCost != null && !this.isExistLongTermRent(this.props.longTermRent),
            ['REMOVE']: longTermRentCost == null && this.isExistLongTermRent(this.props.longTermRent),
            ['UPDATE']: longTermRentCost != null && this.isExistLongTermRent(this.props.longTermRent),
        };
        let action = null;
        if (editLongTermRentMap.UPDATE) {
            this.props.longTermRent.setCost(longTermRentCost);
            action = 'UPDATE';
        }
        if (editLongTermRentMap.CREATE) {
            this.props.longTermRent = long_term_rent_entity_1.LongTermRentEntity.create({
                apartmentAdId: uuid_value_object_1.UUID.generate(),
                cost: longTermRentCost,
            });
            action = 'CREATE';
        }
        if (editLongTermRentMap.REMOVE) {
            this.props.longTermRent = null;
            action = 'REMOVE';
        }
        return action;
    }
    editShortTermRentAvailability(props) {
        var _a;
        if (!this.isShortTermRent || !this.props.shortTermRent) {
            throw new illegal_operation_exception_1.IllegalOperationException('Availability can only be changed for a short rental period');
        }
        if (!((_a = this.shortTermRentStatus) === null || _a === void 0 ? void 0 : _a.isPublished)) {
            throw new illegal_operation_exception_1.IllegalOperationException('Availability can only be changed for a published short rental period');
        }
        if (this.areIntersected(props.lockedDates)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Locked dates can not be intersected or equal between them self');
        }
        this.props.shortTermRent.setAvailabilitySettings(props);
    }
    areIntersected(lockedDates) {
        const intersectionsResult = lockedDates.map((lockedDate, indexMap) => {
            return lockedDates.reduce((acc, curr, indexReduce) => {
                if (indexMap === indexReduce) {
                    return acc;
                }
                return this.isDatesOverlaps(curr, lockedDate);
            }, false);
        });
        return intersectionsResult.some((i) => i == true);
    }
    isDatesOverlaps(date1, date2) {
        return (date_util_1.DateUtil.parse(date1.startDate).isBetween(date_util_1.DateUtil.parse(date2.startDate), date_util_1.DateUtil.parse(date2.endDate)) ||
            date_util_1.DateUtil.parse(date1.endDate).isBetween(date_util_1.DateUtil.parse(date2.startDate), date_util_1.DateUtil.parse(date2.endDate)) ||
            date_util_1.DateUtil.parse(date2.startDate).isBetween(date_util_1.DateUtil.parse(date1.startDate), date_util_1.DateUtil.parse(date1.endDate)) ||
            date1.startDate === date2.startDate ||
            date1.endDate === date2.startDate ||
            date2.endDate === date1.endDate);
    }
    editApartmentAd({ rentPeriodType, shortTermRentCost, longTermRentCost }) {
        if (shortTermRentCost == null && longTermRentCost == null) {
            throw new exceptions_1.ArgumentInvalidException('While try to edit apartment short term rent cost or long term rent cost must be specified');
        }
        const longTermAction = this.editLongTermRentApartmentAd(longTermRentCost);
        const shortTermAction = this.editShortTermRentApartmentAd(shortTermRentCost);
        this.props.rentPeriodType = rent_period_type_value_object_1.RentPeriodTypeVO.create(rentPeriodType);
        this.setStep(1);
        this.validate();
        return { longTermAction, shortTermAction };
    }
    setApartmentType(type) {
        this.props.apartmentType = apartment_type_value_object_1.ApartmentTypeVO.create(type);
        this.setStep(2);
    }
    setApartmentCategory(category) {
        this.props.apartmentCategory = apartment_category_value_objects_1.ApartmentCategoryVO.create(category);
        this.setStep(2);
    }
    setDetails(props) {
        this.props.details = apartment_ad_details_value_object_1.ApartmentAdDetailsVO.create(props);
        this.setStep(3);
    }
    setCharacteristics(props) {
        this.props.characteristics = apartment_characteristics_value_object_1.ApartmentAdCharacteristicsVO.create(props);
    }
    setAddress(props) {
        this.props.address = address_value_object_1.AddressVO.create(props);
        this.setStep(4);
    }
    get isShortTermRentPublished() {
        var _a;
        return !!((_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.isPublished);
    }
    setMedia(urls) {
        this.props.media = media_value_object_1.MediaVO.create({ photos: urls });
        this.setStep(5);
    }
    setDescription(props) {
        this.props.description = apartment_ad_description_value_object_1.ApartmentAdDescriptionVO.create(props);
        this.setStep(6);
    }
    adminEditDescriptionText(descriptionText) {
        if (!this.props.description) {
            throw new exceptions_1.ArgumentInvalidException('Description does not exist for this operation');
        }
        this.props.description = apartment_ad_description_value_object_1.ApartmentAdDescriptionVO.create({
            ...this.props.description.unpack(),
            description: descriptionText,
        });
        return this;
    }
    adminEditDescriptionName(name) {
        if (!this.props.description) {
            throw new exceptions_1.ArgumentInvalidException('Description does not exist for this operation');
        }
        this.props.description = apartment_ad_description_value_object_1.ApartmentAdDescriptionVO.create({
            ...this.props.description.unpack(),
            name,
        });
        return this;
    }
    get isAdHasAllRequirements() {
        const requirements = [
            this.isAllStepsCreationFilled,
            this.props.isUserIdentityApproved,
            this.isPaymentMethodAttached,
        ];
        if (requirements.every((i) => i === true)) {
            return true;
        }
        return true;
    }
    approveLongTermRent() {
        if (!this.props.longTermRent) {
            throw new apartment_ad_publish_errors_1.ApartmentAdPublishError('Apartment ad should has another rent period type');
        }
        if (!this.isAdHasAllRequirements) {
            throw new illegal_operation_exception_1.IllegalOperationException('Ad does not meet all requirements');
        }
        this.props.longTermRent.approve();
    }
    rejectLongTermRent(declineReason) {
        if (!this.props.longTermRent) {
            throw new apartment_ad_publish_errors_1.ApartmentAdPublishError('Apartment ad should has another rent period type');
        }
        if (!this.isAdHasAllRequirements) {
            throw new illegal_operation_exception_1.IllegalOperationException('Ad does not meet all requirements');
        }
        this.props.longTermRent.reject(declineReason);
    }
    rejectShortTermRent(declineReason) {
        if (!this.props.shortTermRent) {
            throw new apartment_ad_publish_errors_1.ApartmentAdPublishError('Apartment ad should has another rent period type');
        }
        if (!this.isAdHasAllRequirements) {
            throw new illegal_operation_exception_1.IllegalOperationException('Ad does not meet all requirements');
        }
        this.props.shortTermRent.reject(declineReason);
    }
    approveShortTermRent() {
        if (!this.props.shortTermRent) {
            throw new apartment_ad_publish_errors_1.ApartmentAdPublishError('Apartment ad should have another rent period type');
        }
        if (!this.isAdHasAllRequirements) {
            throw new illegal_operation_exception_1.IllegalOperationException('Ad does not meet all requirements');
        }
        this.props.shortTermRent.approve();
    }
    get isShortTermRent() {
        return !!this.props.shortTermRent;
    }
    get isLongTermRent() {
        return !!this.props.longTermRent;
    }
    get longTermRentStatus() {
        var _a;
        return (_a = this.props.longTermRent) === null || _a === void 0 ? void 0 : _a.status;
    }
    get shortTermRentStatus() {
        var _a;
        return (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.status;
    }
    get baseApartmentAdDataForContract() {
        var _a, _b;
        const description = (_a = this.props.description) === null || _a === void 0 ? void 0 : _a.unpack();
        const address = (_b = this.props.address) === null || _b === void 0 ? void 0 : _b.unpackCreatedProps();
        if (!description || !address) {
            return;
        }
        return {
            name: description.name,
            address,
        };
    }
    setOwnershipDocuments(documents) {
        if (!this.props.longTermRent) {
            throw new long_term_rent_errors_1.LongTermRentError();
        }
        this.props.longTermRent.setOwnershipDocuments(documents);
    }
    setPaymentMethod(props) {
        this.props.paymentMethod = new payment_method_value_object_1.PaymentMethodVO(props);
    }
    setImportantInfo({ allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets, shortTermRentArrivalTime, shortTermRentDepartureTime, shortTermRentCancellationPolicyType, shortTermRentBookingType, }) {
        this.props.rules = apartment_rules_value_object_1.ApartmentRulesVO.create({
            allowedToHangingOut,
            allowedToSmoke,
            allowedWithChildren,
            allowedWithPets,
        });
        if (this.props.shortTermRent &&
            (!shortTermRentArrivalTime ||
                !shortTermRentDepartureTime ||
                !shortTermRentCancellationPolicyType ||
                !shortTermRentBookingType)) {
            throw new apartment_ad_errors_1.ApartmentAdHasEmptyFieldsError('Short term rent period must have all required fields');
        }
        if (this.props.shortTermRent &&
            shortTermRentArrivalTime &&
            shortTermRentDepartureTime &&
            shortTermRentCancellationPolicyType &&
            shortTermRentBookingType) {
            this.props.shortTermRent.setArrivalAndDepartureTime({
                arrivalTime: shortTermRentArrivalTime,
                departureTime: shortTermRentDepartureTime,
            });
            this.props.shortTermRent.setCancelationPolicy(shortTermRentCancellationPolicyType);
            this.props.shortTermRent.setRentBookingType(shortTermRentBookingType);
        }
        this.setStep(7);
    }
    switchRentBookingType() {
        if (!this.props.shortTermRent) {
            throw new illegal_operation_exception_1.IllegalOperationException('Apartment ad must have short term rent type');
        }
        if (!this.props.shortTermRent.isPublished) {
            throw new illegal_operation_exception_1.IllegalOperationException('Apartment ad must be in published status');
        }
        const rentBookingType = this.props.shortTermRent.rentBookingType;
        if (rentBookingType === enums_1.ShortTermRentBookingType.INSTANT) {
            this.props.shortTermRent.setRentBookingType(enums_1.ShortTermRentBookingType.REQUEST);
            return this;
        }
        this.props.shortTermRent.setRentBookingType(enums_1.ShortTermRentBookingType.INSTANT);
        return this;
    }
    sendToApprove() {
        if (this.props.longTermRent) {
            this.props.longTermRent.sendToApprove();
        }
        if (this.props.shortTermRent) {
            this.props.shortTermRent.sendToApprove();
        }
    }
    pause(periodType) {
        const longTermRentPause = () => {
            var _a;
            if (!this.props.longTermRent) {
                throw new apartment_ad_pause_error_1.ApartmentAdPauseError('Apartment ad should have another rent period type');
            }
            (_a = this.props.longTermRent) === null || _a === void 0 ? void 0 : _a.pause();
        };
        const shortTermRentPause = () => {
            var _a;
            if (!this.props.shortTermRent) {
                throw new apartment_ad_pause_error_1.ApartmentAdPauseError('Apartment ad should have another rent period type');
            }
            (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.pause();
        };
        const pauseRentMap = {
            [enums_1.ApartmentRentPeriodType.LONG_TERM]: longTermRentPause,
            [enums_1.ApartmentRentPeriodType.SHORT_TERM]: shortTermRentPause,
        };
        pauseRentMap[periodType]();
    }
    publish(periodType) {
        const longTermRentPause = () => {
            var _a;
            if (!this.props.longTermRent) {
                throw new apartment_ad_publish_errors_1.ApartmentAdPublishError('Apartment ad should have another rent period type');
            }
            if (this.props.longTermRentAdIsRented) {
                throw new apartment_ad_publish_errors_1.ApartmentAdPublishError(`Apartment type ${periodType} cannot be published it's ad already rented`);
            }
            (_a = this.props.longTermRent) === null || _a === void 0 ? void 0 : _a.publish();
        };
        const shortTermRentPause = () => {
            var _a;
            if (!this.props.shortTermRent) {
                throw new apartment_ad_publish_errors_1.ApartmentAdPublishError('Apartment ad should have another rent period type');
            }
            (_a = this.props.shortTermRent) === null || _a === void 0 ? void 0 : _a.publish();
        };
        const publishRentMap = {
            [enums_1.ApartmentRentPeriodType.LONG_TERM]: longTermRentPause,
            [enums_1.ApartmentRentPeriodType.SHORT_TERM]: shortTermRentPause,
        };
        publishRentMap[periodType]();
    }
    isRentPublished(rentPeriodType) {
        var _a, _b;
        const rentEntityMapper = {
            [enums_1.ApartmentRentPeriodType.SHORT_TERM]: this.props.shortTermRent,
            [enums_1.ApartmentRentPeriodType.LONG_TERM]: this.props.longTermRent,
        };
        return (_b = (_a = rentEntityMapper[rentPeriodType]) === null || _a === void 0 ? void 0 : _a.status.isPublished) !== null && _b !== void 0 ? _b : false;
    }
    get isPublishable() {
        const { landlordId, rentPeriodType, apartmentType, apartmentCategory, shortTermRent, longTermRent, details, address, media, description, rules, } = this.props;
        const fields = [
            landlordId,
            rentPeriodType,
            apartmentType,
            apartmentCategory,
            details,
            address,
            media,
            description,
            rules,
        ];
        const isNotFullFilled = fields.some((f) => f == null);
        if (isNotFullFilled) {
            return false;
        }
        if (shortTermRent && longTermRent) {
            return shortTermRent.isPublishable && longTermRent.isPublishable;
        }
        if (longTermRent) {
            return longTermRent.isPublishable;
        }
        if (shortTermRent) {
            return shortTermRent.isPublishable;
        }
        return false;
    }
    pausePublishingByAcceptContract(type) {
        const rentMap = {
            [types_1.RentPeriodType.LONG_TERM]: this.rentLongTermAd.bind(this),
            [types_1.RentPeriodType.SHORT_TERM]: this.rentShortTermRentAd.bind(this),
        };
        rentMap[type]();
        return this;
    }
    get numberOfGuests() {
        var _a;
        return ((_a = this.props.details) === null || _a === void 0 ? void 0 : _a.numberOfGuests) || 0;
    }
    isGuestsValid(guests) {
        var _a, _b;
        const maxGuestsCount = (_a = this.props.details) === null || _a === void 0 ? void 0 : _a.numberOfGuests;
        const guestsCount = guests.numberOfAdult + guests.numberOfChildren;
        if (!maxGuestsCount || maxGuestsCount < guestsCount) {
            return false;
        }
        const rules = (_b = this.props.rules) === null || _b === void 0 ? void 0 : _b.unpack();
        if ((!(rules === null || rules === void 0 ? void 0 : rules.allowedWithChildren) && !!guests.numberOfChildren) ||
            (!(rules === null || rules === void 0 ? void 0 : rules.allowedWithPets) && !!guests.numberOfPets)) {
            return false;
        }
        return true;
    }
    rentLongTermAd() {
        if (this.props.longTermRent) {
            this.props.longTermRent.pause();
        }
    }
    rentShortTermRentAd() {
    }
    validate() {
        const { rentPeriodType, longTermRent, shortTermRent, paymentMethod } = this.props;
        if (!apartment_ad_guard_1.ApartmentAdGuard.isProperlyTermPeriod({ rentPeriodType, longTermRent, shortTermRent })) {
            throw new apartment_ad_term_period_errors_1.ApartmentAdTermPeriodError('Apartment ad must have correctly specified rental fields');
        }
        if (longTermRent && longTermRent.isApproved && !(paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.innopayCardId)) {
            throw new illegal_operation_exception_1.IllegalOperationException('Approved apartment ad cannot be valid without payment method');
        }
        if (shortTermRent && shortTermRent.isApproved && !(paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.innopayCardId)) {
            throw new illegal_operation_exception_1.IllegalOperationException('Approved apartment ad cannot be valid without payment method');
        }
    }
}
exports.ApartmentAdEntity = ApartmentAdEntity;
//# sourceMappingURL=apartment-ad.entity.js.map