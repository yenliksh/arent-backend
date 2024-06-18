import { Injectable, NotFoundException } from '@nestjs/common';
import { GoogleMapsService } from '@third-parties/google-maps/src';
import { Language } from 'src/i18n/types';

@Injectable()
export class GooglePlacesService {
  constructor(private readonly googleMapsService: GoogleMapsService) {}

  async getLocation(input: string, language: Language) {
    const resp = await this.googleMapsService.placeAutocomplete(input, language);

    return resp;
  }

  async getPlaceDetails(placeId: string, language: Language) {
    try {
      const resp = await this.googleMapsService.placeById(placeId, language);

      return resp;
    } catch (error: any) {
      throw new NotFoundException();
    }
  }

  async getPlaceDetailsByCoords(lat: string, lng: string, language: Language) {
    try {
      const resp = await this.googleMapsService.placeByCoords(lat, lng, language);

      return resp;
    } catch (error: any) {
      throw new NotFoundException();
    }
  }
}
