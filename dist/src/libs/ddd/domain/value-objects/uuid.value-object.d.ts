import { DomainPrimitive } from '../base-classes/value-object.base';
import { ID } from './id.value-object';
export declare class UUID extends ID {
    static generate(): UUID;
    protected validate({ value }: DomainPrimitive<string>): void;
}
