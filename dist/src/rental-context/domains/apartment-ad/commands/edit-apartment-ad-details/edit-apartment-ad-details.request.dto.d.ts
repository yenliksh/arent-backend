import { CommunicationsEnum, ElectricitySupplyEnum, GasSupplyEnum, ObjectPlacementEnum, WaterSupplyEnum } from '@infrastructure/enums';
export declare class EditApartmentAdDetailsRequest {
    readonly id: string;
    readonly numberOfRooms: number;
    readonly numberOfGuests: number;
    readonly name: string | null;
    readonly totalArea: number | null;
    readonly landArea: number | null;
    readonly objectArea: number | null;
    readonly territoryArea: number | null;
    readonly ceilingHeight: number | null;
    readonly floor: number | null;
    readonly waterSupply: WaterSupplyEnum | null;
    readonly gasSupply: GasSupplyEnum | null;
    readonly electricitySupply: ElectricitySupplyEnum | null;
    readonly objectPlacement: ObjectPlacementEnum | null;
    readonly yearOfConstruction: number | null;
    readonly communications: CommunicationsEnum[];
}
