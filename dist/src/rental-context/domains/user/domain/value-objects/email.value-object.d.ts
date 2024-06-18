import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export declare class EmailVO extends ValueObject<string> {
    constructor(value: string);
    get value(): string;
    protected validate({ value }: DomainPrimitive<string>): void;
    static format(email: string): string;
}
