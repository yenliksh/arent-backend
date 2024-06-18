import { ContractRequestModel } from '@domains/contract-request/models/contract-request.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { PaymentMethod } from '@infrastructure/enums';
import { ApartmentAdCharacteristicsModel } from '@infrastructure/models/apartment-ad-characteristics.model';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserMeModel, UserModel } from 'src/rental-context/domains/user/models/user.model';

import { ApartmentAdRulesModel } from '../../../../infrastructure/models/apartment-ad-rules.model';
import { ApartmentCategory, ApartmentType, RentPeriodType } from '../domain/types';
import { ApartmentAdLongTermRentModel, ApartmentAdLongTermRentViewModel } from './apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentModel, ApartmentAdShortTermRentViewModel } from './apartment-ad-short-term-rent.model';
import { ApartmentAdAddressModel } from './sub-models/apartment-ad-address.model';
import { ApartmentAdDescriptionModel } from './sub-models/apartment-ad-description.model';
import { ApartmentAdDetailsModel } from './sub-models/apartment-ad-details.model';
import { ApartmentAdMediaModel } from './sub-models/apartment-ad-media.model';

@ObjectType()
export class BaseApartmentAdModel extends ModelBase {
  protected constructor(props: ApartmentAdOrmEntity) {
    super(props);

    const addressProps = ApartmentAdAddressModel.getAddressProps(props);
    const detailsProps = ApartmentAdDetailsModel.getDetailsProps(props);

    const assignObject: Omit<BaseApartmentAdModel, keyof ModelBase> = {
      landlordId: props.landlordId,
      rentPeriodType: props.rentPeriodType,
      apartmentType: props.apartmentType,
      apartmentCategory: props.apartmentCategory,
      defaultPaymentMethod: props.defaultPaymentMethod,
      address: addressProps ? ApartmentAdAddressModel.create(addressProps) : undefined,
      details: detailsProps ? ApartmentAdDetailsModel.create(detailsProps) : undefined,
      photos: (props.media?.photos || []).map(ApartmentAdMediaModel.create),
      videos: (props.media?.videos || []).map(ApartmentAdMediaModel.create),
      description: props.description ? ApartmentAdDescriptionModel.create(props.description) : undefined,
      rules: props.rules ? ApartmentAdRulesModel.create(props.rules) : undefined,
      characteristics: props.characteristics
        ? ApartmentAdCharacteristicsModel.create(props.characteristics)
        : undefined,
    };

    Object.assign(this, assignObject);
  }

  @Field(() => String)
  landlordId: string;

  @Field(() => RentPeriodType)
  rentPeriodType: RentPeriodType;

  @Field(() => ApartmentType)
  apartmentType: ApartmentType;

  @Field(() => ApartmentCategory)
  apartmentCategory: ApartmentCategory;

  @Field(() => ApartmentAdDetailsModel, { nullable: true })
  details?: ApartmentAdDetailsModel;

  @Field(() => ApartmentAdAddressModel, { nullable: true })
  address?: ApartmentAdAddressModel;

  @Field(() => [ApartmentAdMediaModel])
  photos: ApartmentAdMediaModel[];

  @Field(() => [ApartmentAdMediaModel])
  videos: ApartmentAdMediaModel[];

  @Field(() => ApartmentAdDescriptionModel, { nullable: true })
  description?: ApartmentAdDescriptionModel;

  @Field(() => ApartmentAdRulesModel, { nullable: true })
  rules?: ApartmentAdRulesModel;

  @Field(() => ApartmentAdCharacteristicsModel, { nullable: true })
  characteristics?: ApartmentAdCharacteristicsModel;

  @Field(() => PaymentMethod, { nullable: true })
  defaultPaymentMethod?: PaymentMethod;
}

@ObjectType()
export class ApartmentAdModel extends BaseApartmentAdModel {
  constructor(apartmentAd: ApartmentAdOrmEntity) {
    super(apartmentAd);
  }

  @Field(() => String, { nullable: true })
  innopayCardId?: string;

  @Field(() => Int)
  completeStep: number;

  @FieldFromResolver(() => UserMeModel)
  landlord?: UserMeModel;

  @FieldFromResolver(() => ApartmentAdLongTermRentModel, { nullable: true })
  longTermRent?: ApartmentAdLongTermRentModel;

  @FieldFromResolver(() => ApartmentAdShortTermRentModel, { nullable: true })
  shortTermRent?: ApartmentAdShortTermRentModel;

  @FieldFromResolver(() => ApartmentAdDescriptionModel, { nullable: true })
  adDescription: ApartmentAdDescriptionModel | undefined;

  @FieldFromResolver(() => ApartmentAdCharacteristicsModel, { nullable: true })
  adCharacteristics: ApartmentAdCharacteristicsModel | undefined;

  static create(props: ApartmentAdOrmEntity) {
    const payload = new ApartmentAdModel(props);

    const assignObject: Omit<ApartmentAdModel, keyof BaseApartmentAdModel> = {
      innopayCardId: props.innopayCardId,
      completeStep: props.completeStep,
      landlord: props.landlord ? UserMeModel.create(props.landlord) : undefined,
      longTermRent: props.longTermRent ? ApartmentAdLongTermRentModel.create(props.longTermRent) : undefined,
      shortTermRent: props.shortTermRent ? ApartmentAdShortTermRentModel.create(props.shortTermRent) : undefined,
      adDescription: props.description ? ApartmentAdDescriptionModel.create(props.description) : undefined,
      adCharacteristics: props.characteristics
        ? ApartmentAdCharacteristicsModel.create(props.characteristics)
        : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}

@ObjectType()
export class ApartmentAdViewModel extends BaseApartmentAdModel {
  constructor(apartmentAd: ApartmentAdOrmEntity) {
    super(apartmentAd);
  }

  @Field(() => [ContractRequestModel], { nullable: true })
  contractRequests?: ContractRequestModel[];

  @FieldFromResolver(() => UserModel)
  landlord?: UserModel;

  @FieldFromResolver(() => ApartmentAdLongTermRentViewModel, { nullable: true })
  longTermRent?: ApartmentAdLongTermRentViewModel;

  @FieldFromResolver(() => ApartmentAdShortTermRentViewModel, { nullable: true })
  shortTermRent?: ApartmentAdShortTermRentViewModel;

  static create(props: ApartmentAdOrmEntity) {
    const payload = new ApartmentAdViewModel(props);

    const assignObject: Omit<ApartmentAdViewModel, keyof BaseApartmentAdModel> = {
      landlord: props.landlord ? UserModel.create(props.landlord) : undefined,
      longTermRent: props.longTermRent ? ApartmentAdLongTermRentViewModel.create(props.longTermRent) : undefined,
      shortTermRent: props.shortTermRent ? ApartmentAdShortTermRentViewModel.create(props.shortTermRent) : undefined,
      contractRequests: props.contractRequests?.length
        ? props.contractRequests.map((i) => ContractRequestModel.create(i))
        : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
