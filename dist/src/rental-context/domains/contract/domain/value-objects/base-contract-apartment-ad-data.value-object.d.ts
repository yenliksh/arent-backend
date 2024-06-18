import { AddressCreateProps } from '@domain-value-objects/address.value-object';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface IBaseApartmentAdData {
    title: string;
    address: AddressCreateProps;
}
export declare class BaseContractApartmentAdDataVO extends ValueObject<IBaseApartmentAdData> {
    constructor(props: IBaseApartmentAdData);
    get timezone(): string;
    protected validate(props: IBaseApartmentAdData): void;
}
