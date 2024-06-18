import { DomainPrimitive, ValueObject } from '../base-classes/value-object.base';
export declare class DateISOVO extends ValueObject<string> {
    constructor(value: string);
    get value(): string;
    protected validate({ value }: DomainPrimitive<string>): void;
}
