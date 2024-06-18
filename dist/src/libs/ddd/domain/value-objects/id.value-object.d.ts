import { DomainPrimitive, ValueObject } from '../base-classes/value-object.base';
export declare abstract class ID extends ValueObject<string> {
    constructor(value: string);
    get value(): string;
    protected abstract validate({ value }: DomainPrimitive<string>): void;
}
