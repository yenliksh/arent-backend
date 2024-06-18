"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const dayjs = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat");
const isBetween = require("dayjs/plugin/isBetween");
const isoWeek = require("dayjs/plugin/isoWeek");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
class DateUtil {
    static parse(param) {
        return dayjs(param);
    }
    static parseUTC(param) {
        return dayjs(param).utc();
    }
    static parseWithZone(param, tz, keepLocalTime = false) {
        return dayjs(param).tz(tz, keepLocalTime);
    }
    static formatDateTimeTzToUtc(param, tz) {
        return DateUtil.parseWithZone(param, tz, true);
    }
    static add(date, { value, unit }) {
        return dayjs(date).add(value, unit);
    }
    static now() {
        return dayjs().millisecond(0);
    }
    static utcNow() {
        return dayjs().millisecond(0).utc();
    }
    static isFuture(param) {
        return dayjs(param).utc().isAfter(DateUtil.utcNow());
    }
    static isPast(param) {
        return dayjs(param).utc().isBefore(DateUtil.utcNow());
    }
    static getDiffBetweenTwoDates(startDate, endDate, unit, float = false) {
        return DateUtil.parse(endDate).diff(startDate, unit, float);
    }
    static getDiffDays(firstDate, secondDate) {
        return Math.ceil(DateUtil.getDiffBetweenTwoDatesUTC(firstDate, secondDate, 'days', true));
    }
    static getDiffHours(firstDate, secondDate, float = false) {
        return DateUtil.getDiffBetweenTwoDatesUTC(firstDate, secondDate, 'hours', float);
    }
    static getDiffBetweenTwoDatesUTC(startDate, endDate, unit, float = false) {
        return DateUtil.parse(endDate).utc().diff(startDate, unit, float);
    }
    static unix(param) {
        return dayjs.unix(param);
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date-util.js.map