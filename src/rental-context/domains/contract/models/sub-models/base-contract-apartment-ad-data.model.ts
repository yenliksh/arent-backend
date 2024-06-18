import { IBaseApartmentAdData } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseContractAddressDataModel } from './base-contract-address-data.model';

@ObjectType()
export class BaseContractApartmentAdDataModel implements IBaseApartmentAdData {
  @Field(() => String)
  title: string;

  @Field(() => BaseContractAddressDataModel)
  address: BaseContractAddressDataModel;

  static create(props: IBaseApartmentAdData) {
    const payload = new BaseContractApartmentAdDataModel();

    const assignObject: BaseContractApartmentAdDataModel = {
      title: props.title,
      address: BaseContractAddressDataModel.create(props.address),
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
