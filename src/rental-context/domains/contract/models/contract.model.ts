import { ApartmentAdModel, ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { ApartmentGuestsModel } from '@domains/contract-request/models/sub-models/apartment-guests.model';
import { InnopayCardModel } from '@domains/innopay-card/models/innopay-card.model';
import { UserMeModel, UserModel } from '@domains/user/models/user.model';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  LongTermRentCancellationPolicyType,
  ShortTermRentCancellationPolicyType,
} from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, ObjectType } from '@nestjs/graphql';
import { CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { BaseContractApartmentAdDataModel } from './sub-models/base-contract-apartment-ad-data.model';
import { ContractCancelationModel } from './sub-models/contract-cancelation.model';
import { ContractRulesModel } from './sub-models/contract-rules.model';
import { InnopayPaymentPageModel } from './sub-models/innopay-payment-page.model';
import { NextPaymentInfoModel } from './sub-models/next-payment-info.model';

@ObjectType()
export class BaseContractModel extends ModelBase {
  constructor(props: ContractOrmEntity) {
    super(props);

    const assignObject: Omit<BaseContractModel, keyof ModelBase> = {
      apartmentRentPeriodType: props.apartmentRentPeriodType,
      contractRequestId: props.contractRequestId,
      status: props.status,
      apartmentAdId: props.apartmentAdId,
      arrivalDate: props.arrivalDate?.toISOString(),
      cost: toMinorUnitString(props.cost),
      currency: props.currency,
      departureDate: props.departureDate?.toISOString(),
      landlordId: props.landlordId,
      rules: props.rules ? ContractRulesModel.create(props.rules) : undefined,
      tenantId: props.tenantId,
      shortTermRentCancellationPolicyType: props.shortTermCancellationPolicy,
      longTermRentCancellationPolicyType: props.longTermCancellationPolicy,
      isPending: props.isPending,
      isTemporary: props.isTemporary,
      guests: ApartmentGuestsModel.create(props.guests),
      baseApartmentAdData: BaseContractApartmentAdDataModel.create(props.baseApartmentAdData),
    };

    Object.assign(this, assignObject);
  }

  @Field(() => String, { nullable: true })
  contractRequestId?: string;

  @Field(() => String, { nullable: true })
  tenantId?: string;

  @Field(() => String, { nullable: true })
  landlordId?: string;

  @Field(() => String, { nullable: true })
  apartmentAdId?: string;

  @Field(() => ApartmentRentPeriodType)
  apartmentRentPeriodType: ApartmentRentPeriodType;

  @Field(() => String)
  cost: string;

  @Field(() => CurrencyType)
  currency: CurrencyType;

  @Field(() => ContractStatus)
  status: ContractStatus;

  @Field(() => String, { nullable: true })
  arrivalDate?: string;

  @Field(() => String, { nullable: true })
  departureDate?: string;

  @Field(() => ContractRulesModel, { nullable: true })
  rules?: ContractRulesModel;

  @Field(() => ShortTermRentCancellationPolicyType, { nullable: true })
  shortTermRentCancellationPolicyType?: ShortTermRentCancellationPolicyType;

  @Field(() => LongTermRentCancellationPolicyType, { nullable: true })
  longTermRentCancellationPolicyType?: LongTermRentCancellationPolicyType;

  @Field(() => Boolean)
  isPending: boolean;

  @Field(() => Boolean)
  isTemporary: boolean;

  @Field(() => ApartmentGuestsModel)
  guests: ApartmentGuestsModel;

  @Field(() => BaseContractApartmentAdDataModel)
  baseApartmentAdData: BaseContractApartmentAdDataModel;
}

@ObjectType()
export class ContractLandlordModel extends BaseContractModel {
  constructor(contract: ContractOrmEntity) {
    super(contract);
  }

  @Field(() => String, { nullable: true })
  nextPaymentTransactionId?: string;

  @FieldFromResolver(() => ApartmentAdModel, { nullable: true })
  apartmentAd?: ApartmentAdModel;

  @FieldFromResolver(() => UserMeModel, { nullable: true })
  landlord?: UserMeModel;

  @FieldFromResolver(() => UserModel, { nullable: true })
  tenant?: UserModel;

  @FieldFromResolver(() => NextPaymentInfoModel, { nullable: true })
  nextPayment?: NextPaymentInfoModel;

  static create(props: ContractOrmEntity) {
    const payload = new ContractLandlordModel(props);

    const assignObject: Omit<ContractLandlordModel, keyof BaseContractModel> = {
      apartmentAd: props.apartmentAd ? ApartmentAdModel.create(props.apartmentAd) : undefined,
      nextPaymentTransactionId: props.nextPaymentTransactionId,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}

@ObjectType()
export class ContractTenantModel extends BaseContractModel {
  constructor(contract: ContractOrmEntity) {
    super(contract);
  }

  @Field(() => String, { nullable: true })
  innopayCardId?: string;

  @Field(() => String, { nullable: true })
  nextPaymentTransactionId?: string;

  @FieldFromResolver(() => ApartmentAdViewModel, { nullable: true })
  apartmentAd?: ApartmentAdViewModel;

  @FieldFromResolver(() => UserModel, { nullable: true })
  landlord?: UserModel;

  @FieldFromResolver(() => UserMeModel, { nullable: true })
  tenant?: UserMeModel;

  @FieldFromResolver(() => InnopayCardModel, { nullable: true })
  innopayCard?: InnopayCardModel;

  @FieldFromResolver(() => NextPaymentInfoModel, { nullable: true })
  nextPayment?: NextPaymentInfoModel;

  @FieldFromResolver(() => ContractCancelationModel, { nullable: true })
  contractCancelation?: ContractCancelationModel;

  static create(props: ContractOrmEntity) {
    const payload = new ContractTenantModel(props);

    const assignObject: Omit<ContractTenantModel, keyof BaseContractModel> = {
      innopayCardId: props.tenantInnopayCardId ?? undefined,
      apartmentAd: props.apartmentAd ? ApartmentAdViewModel.create(props.apartmentAd) : undefined,
      tenant: props.tenant ? UserMeModel.create(props.tenant) : undefined,
      innopayCard: props.tenantInnopayCard ? InnopayCardModel.create(props.tenantInnopayCard) : undefined,
      nextPaymentTransactionId: props.nextPaymentTransactionId,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}

@ObjectType()
export class ContractChatModel extends BaseContractModel {
  constructor(contract: ContractOrmEntity) {
    super(contract);
  }

  @FieldFromResolver(() => ApartmentAdViewModel, { nullable: true })
  apartmentAd?: ApartmentAdViewModel;

  @FieldFromResolver(() => UserModel, { nullable: true })
  landlord?: UserModel;

  @FieldFromResolver(() => UserModel, { nullable: true })
  tenant?: UserModel;

  @FieldFromResolver(() => InnopayPaymentPageModel, { nullable: true, description: 'for tenant only' })
  innopayPaymentPageModel?: InnopayPaymentPageModel;

  static create(props: ContractOrmEntity) {
    const payload = new ContractTenantModel(props);

    const assignObject: Omit<ContractTenantModel, keyof BaseContractModel> = {
      apartmentAd: props.apartmentAd ? ApartmentAdViewModel.create(props.apartmentAd) : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
