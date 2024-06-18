import { ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { BaseContractModel } from '@domains/contract/models/contract.model';
import { UserModel } from '@domains/user/models/user.model';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Field, ObjectType } from '@nestjs/graphql';

import { ContractRequestStatus } from '../domain/types';
import { ApartmentGuestsModel } from './sub-models/apartment-guests.model';

@ObjectType()
export class ContractRequestModel extends ModelBase {
  constructor(contractRequest: ContractRequestOrmEntity) {
    super(contractRequest);
  }

  @Field(() => String, { nullable: true })
  tenantId?: string;

  @Field(() => String, { nullable: true })
  apartmentAdId?: string;

  @Field(() => ApartmentRentPeriodType)
  apartmentRentPeriodType: ApartmentRentPeriodType;

  @Field(() => String, { nullable: true })
  arrivalDate?: string;

  @Field(() => String, { nullable: true })
  departureDate?: string;

  @Field(() => ContractRequestStatus)
  status: ContractRequestStatus;

  @Field(() => ApartmentGuestsModel)
  guests: ApartmentGuestsModel;

  @Field(() => String, { nullable: true })
  comment?: string;

  @Field(() => String, { nullable: true })
  rejectReason?: string;

  @FieldFromResolver(() => BaseContractModel, { nullable: true })
  contract?: BaseContractModel;

  @FieldFromResolver(() => UserModel)
  tenant?: UserModel;

  @FieldFromResolver(() => ApartmentAdViewModel)
  apartmentAd?: ApartmentAdViewModel;

  static create(props: ContractRequestOrmEntity) {
    const payload = new ContractRequestModel(props);

    const contractProps: Omit<ContractRequestModel, keyof ModelBase> = {
      tenantId: props.tenantId,
      apartmentAdId: props.apartmentAdId,
      apartmentRentPeriodType: props.apartmentRentPeriodType,
      arrivalDate: props.arrivalDate?.toISOString(),
      departureDate: props.departureDate?.toISOString(),
      status: props.status,
      comment: props.comment,
      contract: props.contract ? new BaseContractModel(props.contract) : undefined,
      rejectReason: props.rejectReason,
      guests: ApartmentGuestsModel.create(props.guests),
    };

    Object.assign(payload, contractProps);

    return payload;
  }
}
