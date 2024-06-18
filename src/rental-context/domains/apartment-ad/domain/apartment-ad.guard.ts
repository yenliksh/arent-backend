import { isLatitude, isLongitude } from 'class-validator';

import { ApartmentAdProps } from './entities/apartment-ad.types';
import { RentPeriodType } from './types';

export const MILITARY_TIMES = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];
export class ApartmentAdGuard {
  static isProperlyTermPeriod(values: Pick<ApartmentAdProps, 'rentPeriodType' | 'longTermRent' | 'shortTermRent'>) {
    const validRentPeriodTypeMap: {
      [P in RentPeriodType]: (props: Pick<ApartmentAdProps, 'longTermRent' | 'shortTermRent'>) => boolean;
    } = {
      [RentPeriodType.SHORT_TERM]: ({ shortTermRent, longTermRent }) => {
        if (shortTermRent?.id && !longTermRent?.id) {
          return true;
        }
        return false;
      },
      [RentPeriodType.LONG_TERM]: ({ longTermRent, shortTermRent }) => {
        if (longTermRent?.id && !shortTermRent?.id) {
          return true;
        }
        return false;
      },
      [RentPeriodType.ALL]: ({ shortTermRent, longTermRent }) => {
        if (shortTermRent?.id && longTermRent?.id) {
          return true;
        }
        return false;
      },
    };

    const { rentPeriodType, longTermRent, shortTermRent } = values;

    return validRentPeriodTypeMap[rentPeriodType.value]({ longTermRent, shortTermRent });
  }

  static isNumberOfRooms(value: number) {
    if (typeof value !== 'number') {
      throw new Error('Value of cost must be a number');
    }

    const isValid = value >= 0 && value <= 8;

    if (isValid) {
      return true;
    }

    return false;
  }

  static isLat(value: number) {
    if (typeof value !== 'number') {
      throw new Error('Latitude must be a number');
    }

    const isValid = isLatitude(value.toString());

    if (isValid) {
      return true;
    }

    return false;
  }

  static isLng(value: number) {
    if (typeof value !== 'number') {
      throw new Error('Longitude must be a number');
    }

    const isValid = isLongitude(value.toString());

    if (isValid) {
      return true;
    }

    return false;
  }

  static isArrivalOrDepartureTime(value: string) {
    if (typeof value !== 'string') {
      throw new Error('Longitude must be a string');
    }

    if (MILITARY_TIMES.some((i) => i === value)) {
      return true;
    }

    return false;
  }
}
