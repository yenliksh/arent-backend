import { Client } from '@googlemaps/google-maps-services-js';
import { Language } from 'src/i18n/types';
import { GoogleMapsModuleOptions } from '../google-maps.types';
export declare class GoogleMapsService {
    private readonly options;
    private _client;
    constructor(options: GoogleMapsModuleOptions);
    private createClientFromOptions;
    get client(): Client;
    get key(): string;
    placeAutocomplete(input: string, language?: Language): Promise<{
        description: string;
        placeId: string;
        mainText: string;
        secondaryText: string;
        mainTextMatchedSubstrings: import("@googlemaps/google-maps-services-js").PredictionSubstring[];
    }[]>;
    placeById(placeId: string, language?: Language): Promise<{
        country: string;
        district: string;
        city: string;
        street: string;
        houseNumber: string;
        region: string;
        address: string;
        location: import("@googlemaps/google-maps-services-js").LatLngLiteral | undefined;
    } | null>;
    placeByCoords(lat: string, lng: string, language?: Language): Promise<{
        country: string;
        district: string;
        city: string;
        street: string;
        houseNumber: string;
        region: string;
        address: string;
        location: import("@googlemaps/google-maps-services-js").LatLngLiteral | undefined;
    } | null>;
    private parseAddress;
}
