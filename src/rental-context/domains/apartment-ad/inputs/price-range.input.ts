import { toSmallestUnitTransformer } from '@libs/utils/minimal-unit.helper';
import { Field, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class PriceRangeInput {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(toSmallestUnitTransformer, { toClassOnly: true })
  @Field(() => String, { nullable: true })
  readonly min?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(toSmallestUnitTransformer, { toClassOnly: true })
  @Field(() => String, { nullable: true })
  readonly max?: number;

  // TODO: MVP without currency
  // @IsDefined()
  // @IsEnum(CurrencyType)
  // @Field(() => CurrencyType, { nullable: true, defaultValue: CurrencyType.KZT })
  // readonly currency: string;
}
