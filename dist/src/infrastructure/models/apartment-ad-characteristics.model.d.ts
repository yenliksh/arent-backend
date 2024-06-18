import { ApartmentAdCharacteristicsProps } from '@domain-value-objects/apartment-characteristics.value-object';
import { ElectricitySupplyEnum, GasSupplyEnum, ObjectPlacementEnum, WaterSupplyEnum } from '@infrastructure/enums';
declare type ApartmentAdCharacteristicsModelCreateProps = Required<ApartmentAdCharacteristicsProps>;
export declare class ApartmentAdCharacteristicsModel {
    totalArea: number | null;
    landArea: number | null;
    territoryArea: number | null;
    objectArea: number | null;
    ceilingHeight: number | null;
    yearOfConstruction: number | null;
    floor: number | null;
    waterSupply: WaterSupplyEnum | null;
    gasSupply: GasSupplyEnum | null;
    electricitySupply: ElectricitySupplyEnum | null;
    objectPlacement: ObjectPlacementEnum | null;
    light: boolean | null;
    water: boolean | null;
    gas: boolean | null;
    sewerage: boolean | null;
    heating: boolean | null;
    ventilation: boolean | null;
    constructor(model: ApartmentAdCharacteristicsModel);
    static create(props: ApartmentAdCharacteristicsModelCreateProps): ApartmentAdCharacteristicsModel;
}
export {};
