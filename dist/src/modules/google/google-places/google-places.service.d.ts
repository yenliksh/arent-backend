import { GoogleMapsService } from '@third-parties/google-maps/src';
import { Language } from 'src/i18n/types';
export declare class GooglePlacesService {
    private readonly googleMapsService;
    constructor(googleMapsService: GoogleMapsService);
    getLocation(input: string, language: Language): Promise<{
        description: string;
        placeId: string;
        mainText: string;
        secondaryText: string;
        mainTextMatchedSubstrings: import("@googlemaps/google-maps-services-js").PredictionSubstring[];
    }[]>;
    getPlaceDetails(placeId: string, language: Language): Promise<{
        country: string;
        district: string;
        city: string;
        street: string;
        houseNumber: string;
        region: string;
        address: string;
        location: import("@googlemaps/google-maps-services-js").LatLngLiteral | undefined;
    } | null>;
    getPlaceDetailsByCoords(lat: string, lng: string, language: Language): Promise<{
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
