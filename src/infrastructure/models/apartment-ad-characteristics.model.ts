import { ApartmentAdCharacteristicsProps } from '@domain-value-objects/apartment-characteristics.value-object';
import { ElectricitySupplyEnum, GasSupplyEnum, ObjectPlacementEnum, WaterSupplyEnum } from '@infrastructure/enums';
import { Field, ObjectType } from '@nestjs/graphql';

type ApartmentAdCharacteristicsModelCreateProps = Required<ApartmentAdCharacteristicsProps>;

@ObjectType()
export class ApartmentAdCharacteristicsModel {
  @Field(() => Number, { nullable: true })
  totalArea: number | null;

  @Field(() => Number, { nullable: true })
  landArea: number | null;

  @Field(() => Number, { nullable: true })
  territoryArea: number | null;

  @Field(() => Number, { nullable: true })
  objectArea: number | null;

  @Field(() => Number, { nullable: true })
  ceilingHeight: number | null;

  @Field(() => Number, { nullable: true })
  yearOfConstruction: number | null;

  @Field(() => Number, { nullable: true })
  floor: number | null;

  @Field(() => String, { nullable: true })
  waterSupply: WaterSupplyEnum | null;

  @Field(() => String, { nullable: true })
  gasSupply: GasSupplyEnum | null;

  @Field(() => String, { nullable: true })
  electricitySupply: ElectricitySupplyEnum | null;

  @Field(() => String, { nullable: true })
  objectPlacement: ObjectPlacementEnum | null;

  @Field(() => Boolean, { nullable: true })
  light: boolean | null;

  @Field(() => Boolean, { nullable: true })
  water: boolean | null;

  @Field(() => Boolean, { nullable: true })
  gas: boolean | null;

  @Field(() => Boolean, { nullable: true })
  sewerage: boolean | null;

  @Field(() => Boolean, { nullable: true })
  heating: boolean | null;

  @Field(() => Boolean, { nullable: true })
  ventilation: boolean | null;

  constructor(model: ApartmentAdCharacteristicsModel) {
    Object.assign(this, model);
  }

  static create(props: ApartmentAdCharacteristicsModelCreateProps) {
    return new ApartmentAdCharacteristicsModel(props);
  }
}
