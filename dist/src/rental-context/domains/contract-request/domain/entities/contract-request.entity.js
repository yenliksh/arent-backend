"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestEntity = void 0;
const rental_date_guard_1 = require("../../../contract/base-classes/rental-guards/rental-date.guard");
const enums_1 = require("../../../../../infrastructure/enums");
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const constants_1 = require("../../../../constants");
const contract_request_errors_1 = require("../errors/contract-request.errors");
const types_1 = require("../types");
const request_status_value_object_1 = require("../value-objects/request-status.value-object");
class ContractRequestEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ apartmentAdId, tenantId, apartmentRentPeriodType, landlordId, guests, arrivalDate, departureDate, status, comment, rentPeriodVersion, shortTermRentBookingType, shortTermRentPaymentType, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            apartmentAdId,
            tenantId,
            apartmentRentPeriodType,
            landlordId,
            guests,
            status,
            arrivalDate,
            departureDate,
            comment,
            rentPeriodVersion,
            shortTermRentBookingType,
            shortTermRentPaymentType,
        };
        const contract = new ContractRequestEntity({ id, props });
        return contract;
    }
    accept() {
        const { status, tenantId, apartmentAdId, landlordId, shortTermRentBookingType } = this.props;
        if (status.value !== types_1.ContractRequestStatus.CREATED) {
            throw new exceptions_1.ArgumentInvalidException(`You can accept request if status = ${types_1.ContractRequestStatus.CREATED} only`);
        }
        if ((shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) === enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentNotProvidedException('You can not accept instant booking request');
        }
        if (!tenantId || !apartmentAdId || !landlordId) {
            throw new contract_request_errors_1.ContractRequestHasNullRequiredFieldsError();
        }
        this.props.status = request_status_value_object_1.ContractRequestStatusVO.create(types_1.ContractRequestStatus.ACCEPTED);
        this.validate();
    }
    reject(reason) {
        const { status, shortTermRentBookingType } = this.props;
        if (status.value !== types_1.ContractRequestStatus.CREATED) {
            throw new exceptions_1.ArgumentInvalidException(`You can reject request if status = ${types_1.ContractRequestStatus.CREATED} only`);
        }
        if ((shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) === enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentNotProvidedException('You can not reject instant booking request');
        }
        this.props.status = request_status_value_object_1.ContractRequestStatusVO.create(types_1.ContractRequestStatus.REJECTED);
        this.props.rejectReason = reason;
        this.validate();
    }
    rejectInstant() {
        const { shortTermRentBookingType } = this.props;
        if ((shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) !== enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentInvalidException(`System can reject instant request if shortTermRentBookingType = ${enums_1.ShortTermRentBookingType.INSTANT} only`);
        }
        this.props.status = request_status_value_object_1.ContractRequestStatusVO.create(types_1.ContractRequestStatus.REJECTED);
        this.validate();
    }
    getRequiredDataForContract() {
        const { apartmentRentPeriodType, arrivalDate, departureDate, apartmentAdId, tenantId, shortTermRentBookingType, shortTermRentPaymentType, guests, landlordId, rentPeriodVersion, } = this.props;
        if (!tenantId || !landlordId || !apartmentAdId || !rentPeriodVersion) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('Active contract request must to have complete all required fields');
        }
        return {
            apartmentRentPeriodType,
            arrivalDate,
            departureDate,
            apartmentAdId,
            tenantId,
            shortTermRentBookingType,
            shortTermRentPaymentType,
            guests,
            landlordId,
            rentPeriodVersion,
        };
    }
    get id() {
        return this._id;
    }
    get comment() {
        return this.props.comment;
    }
    get apartmentRentPeriodType() {
        return this.props.apartmentRentPeriodType;
    }
    get dates() {
        const { arrivalDate, departureDate } = this.props;
        return { arrivalDate: arrivalDate === null || arrivalDate === void 0 ? void 0 : arrivalDate.value, departureDate: departureDate === null || departureDate === void 0 ? void 0 : departureDate.value };
    }
    get shortTermRentBookingType() {
        var _a;
        return (_a = this.props.shortTermRentBookingType) === null || _a === void 0 ? void 0 : _a.value;
    }
    get tenantIdOrFail() {
        if (!this.props.tenantId) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('Tenant id required');
        }
        return this.props.tenantId;
    }
    validate() {
        const { status, tenantId, apartmentRentPeriodType, landlordId, guests, rejectReason } = this.props;
        const fields = [status, apartmentRentPeriodType, guests];
        if (fields.some((f) => f == null)) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('Contract must to have complete all required fields');
        }
        if (tenantId && tenantId.equals(landlordId)) {
            throw new exceptions_1.ArgumentInvalidException('TenantId must be not equals landlordId');
        }
        if (status.value !== types_1.ContractRequestStatus.REJECTED && rejectReason) {
            throw new exceptions_1.ArgumentInvalidException(`Reject reason required only for status = ${types_1.ContractRequestStatus.REJECTED}`);
        }
        this.validateLongTermRent();
        this.validateShortTermRent();
        this.validateActiveRequiredFields();
    }
    validateShortTermRent() {
        const { apartmentRentPeriodType, arrivalDate, departureDate, shortTermRentBookingType, shortTermRentPaymentType } = this.props;
        if (apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            return;
        }
        if (!arrivalDate || !departureDate) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('ArrivalDate and departureDate required for short term rent period');
        }
        if (!guard_1.Guard.isDateMoreThan(arrivalDate.value, departureDate.value)) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('End date must be more that start date');
        }
        if (!shortTermRentBookingType) {
            throw new exceptions_1.ArgumentInvalidException('Rent booking type required for short term rent period');
        }
        if (!shortTermRentPaymentType) {
            throw new exceptions_1.ArgumentInvalidException('Rent payment type required for short term rent period');
        }
        this.validateShortTermRentPeriod(arrivalDate, departureDate);
    }
    validateLongTermRent() {
        const { apartmentRentPeriodType, comment, arrivalDate, departureDate, shortTermRentBookingType, shortTermRentPaymentType, } = this.props;
        if (apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.LONG_TERM) {
            return;
        }
        if (comment) {
            throw new exceptions_1.ArgumentInvalidException('Comment available only for short term rent');
        }
        if (arrivalDate || departureDate) {
            throw new exceptions_1.ArgumentInvalidException('Arrival and departure dates available only for short term rent');
        }
        if (shortTermRentBookingType) {
            throw new exceptions_1.ArgumentInvalidException('Rent booking type available only for short term rent period');
        }
        if (shortTermRentPaymentType) {
            throw new exceptions_1.ArgumentInvalidException('Rent payment type available only for short term rent period');
        }
    }
    validateActiveRequiredFields() {
        const { status, tenantId, landlordId, apartmentAdId, rentPeriodVersion } = this.props;
        if (status.value !== types_1.ContractRequestStatus.CREATED) {
            return;
        }
        if (!tenantId) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('Tenant id required');
        }
        if (!landlordId) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('Landlord id required');
        }
        if (!apartmentAdId) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('Apartment ad id required');
        }
        if (!rentPeriodVersion) {
            throw new contract_request_errors_1.ContractRequestHasEmptyFieldsError('Rent period version required');
        }
    }
    validateShortTermRentPeriod(arrivalDate, departureDate) {
        const { rentPeriodVersion, apartmentRentPeriodType, shortTermRentPaymentType } = this.props;
        const paymentDateGuard = new rental_date_guard_1.RentalDateGuard(rentPeriodVersion);
        const paymentStrategyType = paymentDateGuard.defineRentPeriodStrategyType({
            arrivalDate: arrivalDate.value,
            departureDate: departureDate.value,
        }, apartmentRentPeriodType);
        if ((shortTermRentPaymentType === null || shortTermRentPaymentType === void 0 ? void 0 : shortTermRentPaymentType.value) === enums_1.ShortTermRentPaymentType.PARTIAL) {
            rental_date_guard_1.RentalDateGuard.mustBeDaysBeforeArrival(date_util_1.DateUtil.utcNow().toISOString(), arrivalDate.value, constants_1.SHORT_RENT_PARTIAL_ALLOWED_DAYS_BEFORE_ARRIVAL);
        }
        paymentDateGuard.validateOrThrowError({ arrivalDate: arrivalDate.value, departureDate: departureDate.value }, paymentStrategyType);
    }
}
exports.ContractRequestEntity = ContractRequestEntity;
//# sourceMappingURL=contract-request.entity.js.map