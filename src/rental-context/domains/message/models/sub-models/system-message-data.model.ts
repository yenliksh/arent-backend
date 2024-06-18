import { ISystemMessageData, ISystemMessageOrmData } from '@domains/message/domain/types';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  LongTermRentCancellationPolicyType,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
  ShortTermRentPaymentType,
} from '@infrastructure/enums';
import { ApartmentAdRulesModel } from '@infrastructure/models/apartment-ad-rules.model';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SystemMessageDataModel {
  @Field(() => ApartmentAdRulesModel, { nullable: true })
  rules?: ApartmentAdRulesModel;

  @Field(() => String, { nullable: true })
  cost?: string;

  @Field(() => String, { nullable: true })
  arrivalDate?: string;

  @Field(() => String, { nullable: true })
  departureDate?: string;

  @Field(() => ShortTermRentCancellationPolicyType, { nullable: true })
  shortTermRentCancellationPolicyType?: ShortTermRentCancellationPolicyType;

  @Field(() => LongTermRentCancellationPolicyType, { nullable: true })
  longTermRentCancellationPolicyType?: LongTermRentCancellationPolicyType;

  @Field(() => ApartmentRentPeriodType, { nullable: true })
  apartmentRentPeriodType?: ApartmentRentPeriodType;

  @Field(() => String, { nullable: true })
  comment?: string;

  @Field(() => ContractStatus)
  status: ContractStatus;

  @Field(() => ShortTermRentBookingType, { nullable: true })
  shortTermRentBookingType?: ShortTermRentBookingType;

  @Field(() => ShortTermRentPaymentType, { nullable: true })
  shortTermRentPaymentType?: ShortTermRentPaymentType;

  constructor(model: ISystemMessageData) {
    const assignObject: SystemMessageDataModel = {
      status: model.status,
      apartmentRentPeriodType: model.apartmentRentPeriodType,
      arrivalDate: model.arrivalDate?.toISOString(),
      comment: model.comment,
      cost: model.cost ? toMinorUnitString(model.cost) : undefined,
      departureDate: model.departureDate?.toISOString(),
      longTermRentCancellationPolicyType: model.longTermRentCancellationPolicyType,
      rules: model.rules ? ApartmentAdRulesModel.create(model.rules) : undefined,
      shortTermRentCancellationPolicyType: model.shortTermRentCancellationPolicyType,
      shortTermRentBookingType: model.shortTermRentBookingType,
      shortTermRentPaymentType: model.shortTermRentPaymentType,
    };

    Object.assign(this, assignObject);
  }

  static create(props: ISystemMessageOrmData) {
    const transformedProps = SystemMessageDataModel.transform(props);
    return new SystemMessageDataModel(transformedProps);
  }

  static transform(props: ISystemMessageOrmData): ISystemMessageData {
    return {
      ...props,
      arrivalDate: props.arrivalDate ? new Date(props.arrivalDate) : undefined,
      departureDate: props.departureDate ? new Date(props.departureDate) : undefined,
      transactionsMeta: props.transactionsMeta?.map((meta) => ({
        ...meta,
        endDate: new Date(meta.endDate),
        startDate: new Date(meta.startDate),
        withdrawFundsDate: new Date(meta.withdrawFundsDate),
      })),
    };
  }
}
