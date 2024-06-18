import { toSmallestUnitTransformer } from '@libs/utils/minimal-unit.helper';
import { Field, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsEnum, IsInt, IsUUID, Max, Min, ValidateIf } from 'class-validator';
import {
  LONG_RENT_PERIOD_MAX_COST,
  LONG_RENT_PERIOD_MIN_COST,
  MINIMAL_UNIT_FACTOR,
  SHORT_RENT_PERIOD_MAX_COST,
  SHORT_RENT_PERIOD_MIN_COST,
} from 'src/rental-context/constants';
import { RentPeriodType } from 'src/rental-context/domains/apartment-ad/domain/types';

@InputType()
export class EditApartmentAdRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @IsEnum(RentPeriodType)
  @Field(() => RentPeriodType)
  readonly rentPeriodType: RentPeriodType;

  @ValidateIf((obj) => obj.rentPeriodType === RentPeriodType.SHORT_TERM || obj.rentPeriodType == RentPeriodType.ALL)
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  @Min(SHORT_RENT_PERIOD_MIN_COST, {
    message: `shortTermRentCost must not be less than ${SHORT_RENT_PERIOD_MIN_COST / MINIMAL_UNIT_FACTOR}`,
  })
  @Max(SHORT_RENT_PERIOD_MAX_COST, {
    message: `shortTermRentCost must not be greater than ${SHORT_RENT_PERIOD_MAX_COST / MINIMAL_UNIT_FACTOR}`,
  })
  @Transform(toSmallestUnitTransformer, { toClassOnly: true })
  @Field(() => String, { nullable: true })
  readonly shortTermRentCost?: number;

  @ValidateIf((obj) => obj.rentPeriodType == RentPeriodType.LONG_TERM || obj.rentPeriodType == RentPeriodType.ALL)
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  @Min(LONG_RENT_PERIOD_MIN_COST, {
    message: `longTermRentCost must not be less than ${LONG_RENT_PERIOD_MIN_COST / MINIMAL_UNIT_FACTOR}`,
  })
  @Max(LONG_RENT_PERIOD_MAX_COST, {
    message: `longTermRentCost must not be less than ${LONG_RENT_PERIOD_MAX_COST / MINIMAL_UNIT_FACTOR}`,
  })
  @Transform(toSmallestUnitTransformer, { toClassOnly: true })
  @Field(() => String, { nullable: true })
  readonly longTermRentCost?: number;
}
