import { DomainPrimitive, ValueObject } from '../base-classes/value-object.base';
export declare class DateVO extends ValueObject<Date> {
    constructor(value: Date | string | number);
    get value(): Date;
    static now(): DateVO;
    protected validate({ value }: DomainPrimitive<Date>): void;
}
