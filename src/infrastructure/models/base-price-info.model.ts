import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BasePriceInfoModel {
  @Field(() => String)
  max: string;

  @Field(() => String)
  min: string;

  static create({ min, max }: BasePriceInfoModel) {
    const payload = new BasePriceInfoModel();

    payload.min = toMinorUnitString(Number(min));
    payload.max = toMinorUnitString(Number(max));

    return payload;
  }
}
