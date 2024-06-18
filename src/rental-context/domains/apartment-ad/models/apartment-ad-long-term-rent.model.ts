import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, ObjectType } from '@nestjs/graphql';

import { ApartmentAdStatusType, CurrencyType } from '../domain/types';
import { ApartmentAdModel, ApartmentAdViewModel } from './apartment-ad.model';

@ObjectType()
export class BaseApartmentAdLongTermRentModel extends ModelBase {
  protected constructor(props: LongTermRentOrmEntity) {
    super(props);

    const { cost, currency, cancellationPolicy, status, apartmentAdId, isApproved, declineReason } = props;

    const assignObject: Omit<BaseApartmentAdLongTermRentModel, keyof ModelBase> = {
      cost: toMinorUnitString(cost),
      currency,
      cancellationPolicy,
      apartmentAdId,
      status,
      isApproved,
      declineReason,
    };

    Object.assign(this, assignObject);
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  cost: string;

  @Field(() => CurrencyType, { defaultValue: CurrencyType.KZT, description: 'does not need specify in MPV' })
  currency: CurrencyType;

  @Field(() => LongTermRentCancellationPolicyType, { nullable: true })
  cancellationPolicy?: LongTermRentCancellationPolicyType;

  @Field(() => String)
  apartmentAdId: string;

  @Field(() => [ApartmentAdStatusType])
  status: ApartmentAdStatusType[];

  @Field(() => Boolean)
  isApproved: boolean;

  @Field(() => String, { nullable: true })
  declineReason?: string | null;
}

@ObjectType()
export class ApartmentAdLongTermRentModel extends BaseApartmentAdLongTermRentModel {
  constructor(props: LongTermRentOrmEntity) {
    super(props);
  }

  @Field(() => [String], { nullable: true })
  ownershipDocuments?: string[];

  @FieldFromResolver(() => ApartmentAdModel)
  apartmentAd?: ApartmentAdModel;

  static create(props: LongTermRentOrmEntity) {
    const payload = new ApartmentAdLongTermRentModel(props);

    const assignObject: Omit<ApartmentAdLongTermRentModel, keyof BaseApartmentAdLongTermRentModel> = {
      ownershipDocuments: props.ownershipDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      apartmentAd: props.apartmentAd ? ApartmentAdModel.create(props.apartmentAd) : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}

@ObjectType()
export class ApartmentAdLongTermRentViewModel extends BaseApartmentAdLongTermRentModel {
  constructor(props: LongTermRentOrmEntity) {
    super(props);
  }

  @FieldFromResolver(() => ApartmentAdViewModel)
  apartmentAd?: ApartmentAdViewModel;

  static create(props: LongTermRentOrmEntity) {
    const payload = new ApartmentAdLongTermRentModel(props);

    const assignObject: Omit<ApartmentAdLongTermRentViewModel, keyof BaseApartmentAdLongTermRentModel> = {
      apartmentAd: props.apartmentAd ? ApartmentAdViewModel.create(props.apartmentAd) : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
