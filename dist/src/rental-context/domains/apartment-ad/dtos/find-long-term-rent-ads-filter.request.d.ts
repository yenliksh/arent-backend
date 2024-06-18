import { CommunicationsEnum, ElectricitySupplyEnum, GasSupplyEnum, ObjectPlacementEnum, WaterSupplyEnum } from '@infrastructure/enums';
import { ApartmentCategory, ApartmentRuleType, ApartmentType } from 'src/rental-context/domains/apartment-ad/domain/types';
import { LocationInput } from 'src/rental-context/domains/apartment-ad/inputs/location.input';
import { PriceRangeInput } from '../inputs/price-range.input';
export declare class FindLongTermRentAdsFilterRequest {
    readonly location: LocationInput;
    readonly priceRange?: PriceRangeInput;
    readonly apartmentTypes?: ApartmentType[];
    readonly apartmentCategory?: ApartmentCategory;
    readonly rules?: ApartmentRuleType[];
    readonly numberOfRooms?: number[];
    readonly numberOfAdults: number;
    readonly numberOfChild?: number;
    readonly numberOfPets?: number;
    readonly landArea?: number;
    readonly totalArea?: number;
    readonly territoryArea?: number;
    readonly objectArea?: number;
    readonly ceilingHeight?: number;
    readonly yearOfConstruction?: number;
    readonly floor?: number;
    readonly waterSupply?: WaterSupplyEnum;
    readonly gasSupply?: GasSupplyEnum;
    readonly electricitySupply?: ElectricitySupplyEnum;
    readonly objectPlacement?: ObjectPlacementEnum;
    readonly communications?: CommunicationsEnum[];
}
