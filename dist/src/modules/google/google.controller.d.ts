import { I18nContext } from 'nestjs-i18n';
import { GetPlaceDetailsByCoordsDto, GetPlaceDetailsDto, GetPlacesDto } from './google-places/google-places.dto';
import { GooglePlacesService } from './google-places/google-places.service';
export declare class GoogleController {
    private googlePlacesService;
    constructor(googlePlacesService: GooglePlacesService);
    getPlaces({ lang }: I18nContext, dto: GetPlacesDto): Promise<{
        description: string;
        placeId: string;
        mainText: string;
        secondaryText: string;
        mainTextMatchedSubstrings: import("@googlemaps/google-maps-services-js").PredictionSubstring[];
    }[]>;
    getAddress({ lang }: I18nContext, dto: GetPlaceDetailsDto): Promise<{
        country: string;
        district: string;
        city: string;
        street: string;
        houseNumber: string;
        region: string;
        address: string;
        location: import("@googlemaps/google-maps-services-js").LatLngLiteral | undefined;
    } | null>;
    getAddressByCoords({ lang }: I18nContext, dto: GetPlaceDetailsByCoordsDto): Promise<{
        country: string;
        district: string;
        city: string;
        street: string;
        houseNumber: string;
        region: string;
        address: string;
        location: import("@googlemaps/google-maps-services-js").LatLngLiteral | undefined;
    } | null>;
}
