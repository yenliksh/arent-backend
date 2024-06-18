import { IBaseApartmentAdData } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import { BaseContractAddressDataModel } from './base-contract-address-data.model';
export declare class BaseContractApartmentAdDataModel implements IBaseApartmentAdData {
    title: string;
    address: BaseContractAddressDataModel;
    static create(props: IBaseApartmentAdData): BaseContractApartmentAdDataModel;
}
