import { ElectricitySupplyEnum, GasSupplyEnum, ObjectPlacementEnum, WaterSupplyEnum } from '@infrastructure/enums';
import { ApartmentCategory, ApartmentType, RentPeriodType } from 'src/rental-context/domains/apartment-ad/domain/types';
import { ElasticsearchDocumentBase } from '../base-classes/elasticsearch.document.base';
import { Mappings } from '../elasticsearch.types';
import { IndicesIndexSettings, MappingProperty } from '../types';
export interface GeoPointElasticSearch {
    lat: number;
    lon: number;
}
export interface ApartmentAdBaseProps {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    rentPeriodType: RentPeriodType;
    apartmentType: ApartmentType;
    apartmentCategory: ApartmentCategory;
    numberOfGuests: number | null;
    numberOfRooms: number | null;
    geoPoint: GeoPointElasticSearch;
    title: string;
    slug?: string;
    photo: string;
    remoteView: boolean | null;
    selfCheckIn: boolean | null;
    freeParking: boolean | null;
    workSpace: boolean | null;
    quite: boolean | null;
    forFamily: boolean | null;
    allowedWithPets: boolean | null;
    allowedWithChildren: boolean | null;
    allowedToSmoke: boolean | null;
    allowedToHangingOut: boolean | null;
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
export declare abstract class ApartmentAdBaseDocument<DocumentProps> extends ElasticsearchDocumentBase<DocumentProps & ApartmentAdBaseProps> {
    protected get settings(): IndicesIndexSettings;
    protected abstract propertiesScheme: Record<keyof DocumentProps, MappingProperty>;
    protected get mappingProperties(): Mappings<ApartmentAdBaseProps & DocumentProps>;
}
