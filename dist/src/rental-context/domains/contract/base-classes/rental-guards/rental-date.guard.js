"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalDateGuard = void 0;
const enums_1 = require("../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const types_1 = require("../rental-manager/types");
const DAY_LIVE_IN_HOURS = 22;
class RentalDateGuard {
    constructor(rentPeriods, contractStatus) {
        this.rentPeriods = rentPeriods;
        this.contractStatus = contractStatus;
        this.validatorMap = {
            [types_1.RentPeriodStrategyType.SHORT_TERM_RENT]: (props) => {
                this.validateShortTermRent(props);
            },
            [types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT]: (props) => {
                this.validateMiddleTermRent(props);
            },
            [types_1.RentPeriodStrategyType.LONG_TERM_RENT]: (props) => {
                this.validateLongTermRent(props);
            },
        };
    }
    validateOrThrowError({ arrivalDate, departureDate }, rentPeriodStrategyType) {
        this.validatorMap[rentPeriodStrategyType]({ arrivalDate, departureDate });
    }
    validatePositiveOrThrowError({ arrivalDate, departureDate }) {
        const amountOfRentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });
        if (amountOfRentDays < 1) {
            const errorMessage = `Arrival and departure dates must be positive`;
            throw new exceptions_1.ArgumentOutOfRangeException(errorMessage);
        }
    }
    static validateTimeOrThrowError({ arrivalDate, departureDate }, contractStatus) {
        if (contractStatus && contractStatus === enums_1.ContractStatus.REJECTED) {
            return;
        }
        const errorMessage = `Time difference must be equal ${DAY_LIVE_IN_HOURS} hours`;
        const parsedArrivalDate = date_util_1.DateUtil.parseUTC(arrivalDate);
        const parsedDepartureDate = date_util_1.DateUtil.parseUTC(departureDate);
        const isDepartureTimeLessThanArrivalTime = parsedArrivalDate.hour() >= parsedDepartureDate.hour();
        if (isDepartureTimeLessThanArrivalTime) {
            const differenceInHours = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, parsedArrivalDate
                .hour(parsedDepartureDate.hour())
                .minute(parsedDepartureDate.minute())
                .millisecond(parsedDepartureDate.millisecond())
                .add(1, 'day')
                .toISOString(), 'hours');
            const isValid = differenceInHours === DAY_LIVE_IN_HOURS;
            if (isValid) {
                return;
            }
            throw new exceptions_1.ArgumentOutOfRangeException(errorMessage);
        }
        const differenceInHours = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, parsedArrivalDate
            .hour(parsedDepartureDate.hour())
            .minute(parsedDepartureDate.minute())
            .millisecond(parsedDepartureDate.millisecond())
            .toISOString(), 'hours');
        const isValid = differenceInHours === DAY_LIVE_IN_HOURS;
        if (isValid) {
            return;
        }
        throw new exceptions_1.ArgumentOutOfRangeException(errorMessage);
    }
    getAmountOfRentDays({ arrivalDate, departureDate }) {
        return Math.ceil(date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'days', true));
    }
    validateShortTermRent({ arrivalDate, departureDate }) {
        const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });
        RentalDateGuard.validateTimeOrThrowError({ arrivalDate, departureDate }, this.contractStatus);
        this.validatePositiveOrThrowError({ arrivalDate, departureDate });
        const [allowedDayStarts, allowedDayEnds] = this.getRangeOfAllowedBookingDays(arrivalDate, this.rentPeriods.shortTermRentMonth);
        const isValidAmountRentDays = allowedDayStarts < rentDays && rentDays <= allowedDayEnds;
        if (!isValidAmountRentDays) {
            const errorMessage = `Short term rent days must be greater then ${allowedDayStarts} and less than or equal ${allowedDayEnds}`;
            throw new exceptions_1.ArgumentOutOfRangeException(errorMessage);
        }
    }
    static mustBeDaysBeforeArrival(now, arrivalDate, mustBeDays) {
        const amountOfDaysBeforeTheArrival = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(now, arrivalDate, 'days');
        if (amountOfDaysBeforeTheArrival <= mustBeDays) {
            const errorMessage = `Days before arrival must be greater then ${mustBeDays} for using partial payment method`;
            throw new exceptions_1.ArgumentOutOfRangeException(errorMessage);
        }
    }
    validateMiddleTermRent({ arrivalDate, departureDate }) {
        const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });
        RentalDateGuard.validateTimeOrThrowError({ arrivalDate, departureDate }, this.contractStatus);
        this.validatePositiveOrThrowError({ arrivalDate, departureDate });
        const [allowedDayStarts, allowedDayEnds] = this.getRangeOfAllowedBookingDays(arrivalDate, this.rentPeriods.middleTermRentMonth);
        const isValidAmountRentDays = allowedDayStarts < rentDays && rentDays <= allowedDayEnds;
        if (!isValidAmountRentDays) {
            const errorMessage = `Middle term rent days must be greater then ${allowedDayStarts} and less than or equal ${allowedDayEnds}`;
            throw new exceptions_1.ArgumentOutOfRangeException(errorMessage);
        }
    }
    validateLongTermRent({ arrivalDate, departureDate }) {
        const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });
        RentalDateGuard.validateTimeOrThrowError({ arrivalDate, departureDate }, this.contractStatus);
        this.validatePositiveOrThrowError({ arrivalDate, departureDate });
        const [amountOfAllowedDays] = this.getAmountOfAllowedBookingDays(arrivalDate, this.rentPeriods.longTermRentMonth);
        const validAmountRentDays = amountOfAllowedDays === rentDays;
        if (!validAmountRentDays) {
            const errorMessage = `Long term rent days must be equal ${amountOfAllowedDays}`;
            throw new exceptions_1.ArgumentOutOfRangeException(errorMessage);
        }
    }
    getRangeOfAllowedBookingDays(arrivalDate, allowedMonthRange) {
        const [fromMonth, toMonth] = allowedMonthRange;
        const relativeArrivalDateFromMonth = date_util_1.DateUtil.parse(arrivalDate).add(fromMonth, 'month');
        const relativeArrivalDateToMonth = date_util_1.DateUtil.parse(arrivalDate).add(toMonth, 'month');
        const allowedDayStarts = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(date_util_1.DateUtil.parse(arrivalDate).toDate(), relativeArrivalDateFromMonth.toDate(), 'days');
        const allowedDaysEnds = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(date_util_1.DateUtil.parse(arrivalDate).toDate(), relativeArrivalDateToMonth.toDate(), 'days');
        return [allowedDayStarts, allowedDaysEnds];
    }
    getAmountOfAllowedBookingDays(arrivalDate, allowedMonthRange) {
        const [allowedMonth] = allowedMonthRange;
        const relativeArrivalDateAmountOfMonths = date_util_1.DateUtil.parseUTC(arrivalDate).add(allowedMonth, 'month');
        const allowedDayDiffs = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(date_util_1.DateUtil.parse(arrivalDate).toDate(), relativeArrivalDateAmountOfMonths.toDate(), 'days');
        return [allowedDayDiffs];
    }
    defineRentPeriodStrategyType({ arrivalDate, departureDate }, apartmentRentPeriodType) {
        const rentDays = this.getAmountOfRentDays({ arrivalDate, departureDate });
        const [shortAllowedDayStarts, shortAllowedDayEnds] = this.getRangeOfAllowedBookingDays(arrivalDate, this.rentPeriods.shortTermRentMonth);
        const isShortTermRentPaymentType = shortAllowedDayStarts < rentDays &&
            rentDays <= shortAllowedDayEnds &&
            (!apartmentRentPeriodType || apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM);
        if (isShortTermRentPaymentType) {
            return types_1.RentPeriodStrategyType.SHORT_TERM_RENT;
        }
        const [middleAllowedDayStarts, middleAllowedDayEnds] = this.getRangeOfAllowedBookingDays(arrivalDate, this.rentPeriods.middleTermRentMonth);
        const isMiddleTermRentPaymentType = middleAllowedDayStarts < rentDays &&
            rentDays <= middleAllowedDayEnds &&
            (!apartmentRentPeriodType || apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM);
        if (isMiddleTermRentPaymentType) {
            return types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT;
        }
        const [longAllowedRentDays] = this.getRangeOfAllowedBookingDays(arrivalDate, this.rentPeriods.longTermRentMonth);
        const isLongTermRentPaymentType = longAllowedRentDays === rentDays &&
            (!apartmentRentPeriodType || apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM);
        if (isLongTermRentPaymentType) {
            return types_1.RentPeriodStrategyType.LONG_TERM_RENT;
        }
        throw new exceptions_1.ArgumentOutOfRangeException("Rent days aren't matched with specified range rules");
    }
}
exports.RentalDateGuard = RentalDateGuard;
//# sourceMappingURL=rental-date.guard.js.map