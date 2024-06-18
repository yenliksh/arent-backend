import { Client, PlaceData } from '@googlemaps/google-maps-services-js';
import { Inject, Injectable } from '@nestjs/common';
import { Language } from 'src/i18n/types';

import { GOOGLE_MAPS_OPTIONS_PROVIDER_NAME, GoogleMapsModuleOptions } from '../google-maps.types';

@Injectable()
export class GoogleMapsService {
  private _client: Client;
  constructor(
    @Inject(GOOGLE_MAPS_OPTIONS_PROVIDER_NAME)
    private readonly options: GoogleMapsModuleOptions,
  ) {
    this._client = this.createClientFromOptions();
  }

  private createClientFromOptions() {
    return new Client({
      config: {
        params: {
          key: this.options.key,
        },
      },
    });
  }

  get client(): Client {
    return this._client;
  }

  get key(): string {
    return this.options.key;
  }

  async placeAutocomplete(input: string, language: Language = Language.en) {
    const res = await this.client.placeAutocomplete({
      params: { input, key: this.key, language, components: ['country:kz'] },
    });

    return res.data.predictions.map((item) => ({
      description: item.description,
      placeId: item.place_id,
      mainText: item.structured_formatting.main_text,
      secondaryText: item.structured_formatting.secondary_text,
      mainTextMatchedSubstrings: item.structured_formatting.main_text_matched_substrings,
    }));
  }

  async placeById(placeId: string, language: Language = Language.en) {
    const res = await this.client.placeDetails({
      params: { place_id: placeId, key: this.key, language },
    });

    return res.data?.result ? this.parseAddress(res.data.result) : null;
  }

  async placeByCoords(lat: string, lng: string, language: Language = Language.en) {
    const res = await this.client.reverseGeocode({ params: { latlng: [+lat, +lng], key: this.key, language } });

    return res.data?.results ? this.parseAddress(res.data.results[0]) : null;
  }

  private parseAddress = (result: Partial<PlaceData>) => {
    let country = '';
    let region = '';
    let city = '';
    let district = '';
    let street = '';
    let houseNumber = '';

    result.address_components?.forEach((el) => {
      if (el.types[0] === 'locality') {
        city = el.long_name;
      } else if (el.types[0] === 'route') {
        street = el.short_name;
      } else if (el.types[0] === 'country') {
        country = el.short_name;
      } else if (el.types[0] === 'street_number') {
        houseNumber = el.short_name;
      } else if (el.types[1] === 'sublocality') {
        district = el.short_name;
      } else if (el.types[0] === 'administrative_area_level_1') {
        region = el.short_name;
      }
    });

    return {
      country,
      district,
      city,
      street,
      houseNumber,
      region,
      address: street && houseNumber ? `${street} ${houseNumber}` : '',
      location: result.geometry?.location,
    };
  };
}
