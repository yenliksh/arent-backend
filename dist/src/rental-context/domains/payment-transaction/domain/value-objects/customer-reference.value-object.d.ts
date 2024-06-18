import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
interface CustomerReferenceProps {
    customerReference: string;
    livinCustomerReference?: string;
}
export declare class CustomerReferenceVO extends ValueObject<CustomerReferenceProps> {
    constructor(value: CustomerReferenceProps);
    get value(): CustomerReferenceProps;
    protected validate(value: CustomerReferenceProps): void;
}
export {};
