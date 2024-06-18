import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);

export type DateUtilType = string | Date;

export class DateUtil {
  static parse(param: DateUtilType) {
    return dayjs(param);
  }

  static parseUTC(param: DateUtilType) {
    return dayjs(param).utc();
  }

  static parseWithZone(param: DateUtilType, tz: string, keepLocalTime = false) {
    return dayjs(param).tz(tz, keepLocalTime);
  }

  static formatDateTimeTzToUtc(param: DateUtilType, tz: string) {
    return DateUtil.parseWithZone(param, tz, true);
  }

  static add(date: DateUtilType, { value, unit }: { value: number; unit: dayjs.ManipulateType }) {
    return dayjs(date).add(value, unit);
  }

  static now() {
    return dayjs().millisecond(0);
  }

  static utcNow() {
    return dayjs().millisecond(0).utc();
  }

  static isFuture(param: DateUtilType) {
    return dayjs(param).utc().isAfter(DateUtil.utcNow());
  }

  static isPast(param: DateUtilType) {
    return dayjs(param).utc().isBefore(DateUtil.utcNow());
  }

  static getDiffBetweenTwoDates(startDate: DateUtilType, endDate: DateUtilType, unit: dayjs.OpUnitType, float = false) {
    return DateUtil.parse(endDate).diff(startDate, unit, float);
  }

  static getDiffDays(firstDate: string, secondDate: string) {
    return Math.ceil(DateUtil.getDiffBetweenTwoDatesUTC(firstDate, secondDate, 'days', true));
  }

  static getDiffHours(firstDate: string, secondDate: string, float = false) {
    return DateUtil.getDiffBetweenTwoDatesUTC(firstDate, secondDate, 'hours', float);
  }

  static getDiffBetweenTwoDatesUTC(
    startDate: DateUtilType,
    endDate: DateUtilType,
    unit: dayjs.OpUnitType,
    float = false,
  ) {
    return DateUtil.parse(endDate).utc().diff(startDate, unit, float);
  }

  static unix(param: number) {
    return dayjs.unix(param);
  }
}
