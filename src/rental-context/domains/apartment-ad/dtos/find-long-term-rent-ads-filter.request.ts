import {
  CommunicationsEnum,
  ElectricitySupplyEnum,
  GasSupplyEnum,
  ObjectPlacementEnum,
  WaterSupplyEnum,
} from '@infrastructure/enums';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsEnum, IsInt, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import {
  ApartmentCategory,
  ApartmentRuleType,
  ApartmentType,
} from 'src/rental-context/domains/apartment-ad/domain/types';
import { LocationInput } from 'src/rental-context/domains/apartment-ad/inputs/location.input';

import { PriceRangeInput } from '../inputs/price-range.input';

@InputType()
export class FindLongTermRentAdsFilterRequest {
  @IsDefined()
  @ValidateNested()
  @Type(() => LocationInput)
  @Field(() => LocationInput)
  readonly location: LocationInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => PriceRangeInput)
  @Field(() => PriceRangeInput, { nullable: true })
  readonly priceRange?: PriceRangeInput;

  @IsOptional()
  @IsEnum(ApartmentType, { each: true })
  @Field(() => [ApartmentType], { nullable: true })
  readonly apartmentTypes?: ApartmentType[];

  @IsOptional()
  @IsEnum(ApartmentCategory)
  @Field(() => ApartmentCategory, { nullable: true })
  readonly apartmentCategory?: ApartmentCategory;

  @IsOptional()
  @IsEnum(ApartmentRuleType, { each: true })
  @Field(() => [ApartmentRuleType], { nullable: true })
  readonly rules?: ApartmentRuleType[];

  @IsOptional()
  @Min(0, { each: true })
  @Max(8, { each: true })
  @IsArray()
  @Field(() => [Int], { nullable: true, description: '0 equal studio apartment, 8 mean 8+ number of rooms' })
  readonly numberOfRooms?: number[];

  @IsOptional()
  @Min(1)
  @Max(1000000)
  @IsInt()
  @Field(() => Int, { defaultValue: 1, nullable: true })
  readonly numberOfAdults: number;

  @IsOptional()
  @Min(1)
  @Max(1000000)
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly numberOfChild?: number;

  @IsOptional()
  @Min(1)
  @Max(1000000)
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly numberOfPets?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly landArea?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly totalArea?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly territoryArea?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly objectArea?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly ceilingHeight?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly yearOfConstruction?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly floor?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly waterSupply?: WaterSupplyEnum;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly gasSupply?: GasSupplyEnum;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly electricitySupply?: ElectricitySupplyEnum;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly objectPlacement?: ObjectPlacementEnum;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly communications?: CommunicationsEnum[];
}
