import {
  CommunicationsEnum,
  ElectricitySupplyEnum,
  GasSupplyEnum,
  ObjectPlacementEnum,
  WaterSupplyEnum,
} from '@infrastructure/enums';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDefined, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class EditApartmentAdDetailsRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsOptional()
  @Min(0)
  @Max(8)
  @IsInt()
  @Field(() => Int, { description: '0 equal studio apartment, 8 mean 8+ number of rooms' })
  readonly numberOfRooms: number;

  @IsOptional()
  @Min(0)
  @Max(1000000)
  @IsInt()
  @Field(() => Int)
  readonly numberOfGuests: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly name: string | null;

  @IsOptional()
  @Min(0)
  @Max(1000000)
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly totalArea: number | null;

  @IsOptional()
  @Min(0)
  @Max(1000000)
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly landArea: number | null;

  @IsOptional()
  @Min(0)
  @Max(1000000)
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly objectArea: number | null;

  @IsOptional()
  @Min(0)
  @Max(1000000)
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly territoryArea: number | null;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly ceilingHeight: number | null;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly floor: number | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly waterSupply: WaterSupplyEnum | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly gasSupply: GasSupplyEnum | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly electricitySupply: ElectricitySupplyEnum | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly objectPlacement: ObjectPlacementEnum | null;

  @IsOptional()
  @Min(1800)
  @Max(2023)
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly yearOfConstruction: number | null;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly communications: CommunicationsEnum[];
}
