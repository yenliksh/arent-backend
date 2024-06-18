import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { ApartmentAdStatusType, CurrencyType } from '../domain/types';
import { ApartmentAdModel, ApartmentAdViewModel } from './apartment-ad.model';
import { ApartmentAdLockedDatesModel } from './sub-models/apartment-ad-locked-dates.model';

@ObjectType()
export class BaseApartmentAdShortTermRentModel extends ModelBase {
  protected constructor(props: ShortTermRentOrmEntity) {
    super(props);

    const {
      cost,
      currency,
      apartmentAdId,
      rentBookingType,
      status,
      isApproved,
      declineReason,
      cancellationPolicy,
      arrivalTime,
      departureTime,
      lockedDates,
      bookingAccessInMonths,
    } = props;

    const assignObject: Omit<BaseApartmentAdShortTermRentModel, keyof ModelBase> = {
      cost: toMinorUnitString(cost),
      currency,
      apartmentAdId,
      rentBookingType,
      status,
      isApproved,
      declineReason,
      cancellationPolicy,
      arrivalTime,
      departureTime,
      bookingAccessInMonths,
      lockedDates: lockedDates?.map((i) => ApartmentAdLockedDatesModel.create(i)) || [],
    };

    Object.assign(this, assignObject);
  }

  @Field(() => String)
  cost: string;

  @Field(() => CurrencyType, { defaultValue: CurrencyType.KZT, description: 'does not need specify in MPV' })
  currency: CurrencyType;

  @Field(() => String)
  apartmentAdId: string;

  @Field(() => ShortTermRentBookingType)
  rentBookingType: ShortTermRentBookingType;

  @Field(() => [ApartmentAdStatusType])
  status: ApartmentAdStatusType[];

  @Field(() => Boolean)
  isApproved: boolean;

  @Field(() => String, { nullable: true })
  declineReason?: string | null;

  @Field(() => ShortTermRentCancellationPolicyType, { nullable: true })
  cancellationPolicy?: ShortTermRentCancellationPolicyType;

  @Field(() => String, { nullable: true })
  arrivalTime?: string;

  @Field(() => String, { nullable: true })
  departureTime?: string;

  @Field(() => Int, { nullable: true })
  bookingAccessInMonths?: number;

  @FieldFromResolver(() => [ApartmentAdLockedDatesModel])
  lockedDates: ApartmentAdLockedDatesModel[];
}

@ObjectType()
export class ApartmentAdShortTermRentModel extends BaseApartmentAdShortTermRentModel {
  constructor(props: ShortTermRentOrmEntity) {
    super(props);
  }

  @FieldFromResolver(() => ApartmentAdModel)
  apartmentAd?: ApartmentAdModel;

  static create(props: ShortTermRentOrmEntity) {
    const payload = new ApartmentAdShortTermRentModel(props);

    const assignObject: Omit<ApartmentAdShortTermRentModel, keyof BaseApartmentAdShortTermRentModel> = {
      apartmentAd: props.apartmentAd ? ApartmentAdModel.create(props.apartmentAd) : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}

@ObjectType()
export class ApartmentAdShortTermRentViewModel extends BaseApartmentAdShortTermRentModel {
  constructor(props: ShortTermRentOrmEntity) {
    super(props);
  }

  @FieldFromResolver(() => ApartmentAdViewModel)
  apartmentAd?: ApartmentAdViewModel;

  static create(props: ShortTermRentOrmEntity) {
    const payload = new ApartmentAdShortTermRentModel(props);

    const assignObject: Omit<ApartmentAdShortTermRentViewModel, keyof BaseApartmentAdShortTermRentModel> = {
      apartmentAd: props.apartmentAd ? ApartmentAdViewModel.create(props.apartmentAd) : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
