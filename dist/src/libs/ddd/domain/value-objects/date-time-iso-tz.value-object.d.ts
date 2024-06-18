import { DomainPrimitive, ValueObject } from '../base-classes/value-object.base';
export declare class DateTimeISOTZVO extends ValueObject<string> {
    constructor(value?: string);
    getDate(): Date;
    get value(): string;
    protected validate({ value }: DomainPrimitive<string>): void;
}
