import { ApartmentAdProps } from './entities/apartment-ad.types';
export declare const MILITARY_TIMES: string[];
export declare class ApartmentAdGuard {
    static isProperlyTermPeriod(values: Pick<ApartmentAdProps, 'rentPeriodType' | 'longTermRent' | 'shortTermRent'>): boolean;
    static isNumberOfRooms(value: number): boolean;
    static isLat(value: number): boolean;
    static isLng(value: number): boolean;
    static isArrivalOrDepartureTime(value: string): boolean;
}
