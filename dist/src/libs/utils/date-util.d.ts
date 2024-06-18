import * as dayjs from 'dayjs';
export declare type DateUtilType = string | Date;
export declare class DateUtil {
    static parse(param: DateUtilType): dayjs.Dayjs;
    static parseUTC(param: DateUtilType): dayjs.Dayjs;
    static parseWithZone(param: DateUtilType, tz: string, keepLocalTime?: boolean): dayjs.Dayjs;
    static formatDateTimeTzToUtc(param: DateUtilType, tz: string): dayjs.Dayjs;
    static add(date: DateUtilType, { value, unit }: {
        value: number;
        unit: dayjs.ManipulateType;
    }): dayjs.Dayjs;
    static now(): dayjs.Dayjs;
    static utcNow(): dayjs.Dayjs;
    static isFuture(param: DateUtilType): boolean;
    static isPast(param: DateUtilType): boolean;
    static getDiffBetweenTwoDates(startDate: DateUtilType, endDate: DateUtilType, unit: dayjs.OpUnitType, float?: boolean): number;
    static getDiffDays(firstDate: string, secondDate: string): number;
    static getDiffHours(firstDate: string, secondDate: string, float?: boolean): number;
    static getDiffBetweenTwoDatesUTC(startDate: DateUtilType, endDate: DateUtilType, unit: dayjs.OpUnitType, float?: boolean): number;
    static unix(param: number): dayjs.Dayjs;
}
