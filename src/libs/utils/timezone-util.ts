import * as geoTz from 'geo-tz';

const cacheMap = new Map();

geoTz.setCache({ store: cacheMap });

export class TimezoneUtil {
  static getOffsetByCords(cords: { lat: number; lng: number }) {
    return geoTz.find(cords.lat, cords.lng)[0];
  }
}
