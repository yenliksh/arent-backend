export declare class Guard {
    static isEmpty(value: unknown): boolean;
    static lengthIsBetween(value: number | string | Array<unknown>, min: number, max: number): boolean;
    static isValidEnum<T extends string>(value: T, enumType: {
        [key in T]: string;
    }): boolean;
    static isPositiveNumber(value: number): boolean;
    static isNegative(value: number): boolean;
    static isFutureDate(value: string): boolean;
    static isDateMoreThan(value: string, nextValue: string): boolean;
    static isFileKey(value: string): boolean;
}
