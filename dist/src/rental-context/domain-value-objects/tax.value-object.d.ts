import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface TaxProps {
    value: number;
}
export declare class TaxVO extends ValueObject<number> {
    get value(): number;
    protected validate(props: DomainPrimitive<number>): void;
}
