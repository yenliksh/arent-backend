import { ElectricitySupplyEnum, GasSupplyEnum, ObjectPlacementEnum, WaterSupplyEnum } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';

export interface ApartmentAdCharacteristicsProps {
  totalArea: number | null;
  landArea: number | null;
  territoryArea: number | null;
  objectArea: number | null;
  ceilingHeight: number | null;
  yearOfConstruction: number | null;
  floor: number | null;
  waterSupply: WaterSupplyEnum | null;
  electricitySupply: ElectricitySupplyEnum | null;
  gasSupply: GasSupplyEnum | null;
  objectPlacement: ObjectPlacementEnum | null;
  light: boolean | null;
  water: boolean | null;
  gas: boolean | null;
  sewerage: boolean | null;
  heating: boolean | null;
  ventilation: boolean | null;
}

export class ApartmentAdCharacteristicsVO extends ValueObject<ApartmentAdCharacteristicsProps> {
  private constructor(props: ApartmentAdCharacteristicsProps) {
    super(props);
  }

  static create(props: ApartmentAdCharacteristicsProps) {
    return new ApartmentAdCharacteristicsVO(props);
  }

  protected validate(): void {
    true;
  }
}
