import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export declare class BookingAccessInMonthVO extends ValueObject<number> {
    get value(): number;
    protected validate(props: DomainPrimitive<number>): void;
}
