import { ApartmentRuleType, CurrencyType } from '@domains/apartment-ad/domain/types';
import { FindShortTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-short-term-rent-ads-filter.request';
import { ShortTermRentLockedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-locked-dates.document';
import {
  ShortTermRentRentedDateDocument,
  ShortTermRentsRentedDateDocumentProps,
} from '@infrastructure/elastic-search/documents/short-term-rent-rented-dates.document';
import { ShortTermRentDocumentProps } from '@infrastructure/elastic-search/documents/short-term-rent.document';
import {
  AggregationsMultiBucketAggregateBase,
  QueryDslQueryContainer,
  SearchTemplateResponse,
} from '@infrastructure/elastic-search/types';
import { CommunicationsEnum } from '@infrastructure/enums';
import { DateUtil } from '@libs/utils/date-util';
import { TimezoneUtil } from '@libs/utils/timezone-util';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { ShortTermRentFilterPort } from './short-term-rent-filter.port';

export class ShortTermRentFilterBase implements ShortTermRentFilterPort {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly shortTermRentLockedDateDocument: ShortTermRentLockedDateDocument,
    private readonly shortTermRentRentedDateDocument: ShortTermRentRentedDateDocument,
  ) {}

  applyBaseFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]) {
    const {
      location: { lat, lng, radiusInKm },
      apartmentTypes,
      apartmentCategory,
      cancellationPolicyType,
      rentBookingType,
    } = inputFilters;

    if (lat != null && lng != null && radiusInKm != null) {
      filters.push({
        geo_distance: {
          distance: `${radiusInKm}km`,
          geoPoint: {
            lat,
            lon: lng,
          },
        },
      });
    }

    if (apartmentTypes != null) {
      filters.push({
        terms: {
          apartmentType: apartmentTypes,
        },
      });
    }

    if (apartmentCategory != null) {
      filters.push({
        term: {
          apartmentCategory: apartmentCategory,
        },
      });
    }

    if (cancellationPolicyType != null) {
      filters.push({
        term: {
          cancellationPolicy: cancellationPolicyType,
        },
      });
    }

    if (rentBookingType != null) {
      filters.push({
        term: {
          rentBookingType,
        },
      });
    }
  }

  applyPriceRangeFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]) {
    const { priceRange } = inputFilters;

    if (priceRange?.max != null && priceRange?.min != null) {
      filters.push({
        // TODO: in post-mvp get currency from client
        bool: {
          must: [
            { term: { currency: CurrencyType.KZT } },
            {
              range: {
                cost: {
                  gte: priceRange.min,
                  lte: priceRange.max,
                },
              },
            },
          ],
        },
      });
    }

    if (priceRange?.min != null && priceRange?.max == null) {
      filters.push({
        // TODO: in post-mvp get currency from client
        bool: {
          must: [
            { term: { currency: CurrencyType.KZT } },
            {
              range: {
                cost: {
                  gte: priceRange.min,
                },
              },
            },
          ],
        },
      });
    }

    if (priceRange?.max != null && priceRange?.min == null) {
      filters.push({
        // TODO: in post-mvp get currency from client
        bool: {
          must: [
            { term: { currency: CurrencyType.KZT } },
            {
              range: {
                cost: {
                  lte: priceRange.max,
                },
              },
            },
          ],
        },
      });
    }
  }

  applyRulesWithGestAffectedFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ) {
    const { rules, numberOfChild, numberOfPets } = inputFilters;

    if (rules != null && rules.includes(ApartmentRuleType.ALLOWED_TO_HANGING_OUT)) {
      filters.push({
        term: {
          allowedToHangingOut: true,
        },
      });
    }

    if (rules != null && rules.includes(ApartmentRuleType.ALLOWED_TO_SMOKE)) {
      filters.push({
        term: {
          allowedToSmoke: true,
        },
      });
    }

    if (
      (rules != null && rules.includes(ApartmentRuleType.ALLOWED_WITH_CHILDREN)) ||
      (numberOfChild != null && numberOfChild > 0)
    ) {
      filters.push({
        term: {
          allowedWithChildren: true,
        },
      });
    }

    if (
      (rules != null && rules.includes(ApartmentRuleType.ALLOWED_WITH_PETS)) ||
      (numberOfPets != null && numberOfPets > 0)
    ) {
      filters.push({
        term: {
          allowedWithPets: true,
        },
      });
    }
  }

  applyCharacteristicsAffectedFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ) {
    const {
      landArea,
      totalArea,
      territoryArea,
      objectArea,
      ceilingHeight,
      yearOfConstruction,
      floor,
      waterSupply,
      gasSupply,
      electricitySupply,
      objectPlacement,
      communications,
    } = inputFilters;

    if (landArea != null) {
      filters.push({
        term: {
          landArea: landArea,
        },
      });
    }

    if (totalArea != null) {
      filters.push({
        term: {
          totalArea: totalArea,
        },
      });
    }

    if (territoryArea != null) {
      filters.push({
        term: {
          territoryArea: territoryArea,
        },
      });
    }

    if (objectArea != null) {
      filters.push({
        term: {
          objectArea: objectArea,
        },
      });
    }

    if (territoryArea != null) {
      filters.push({
        term: {
          territoryArea: territoryArea,
        },
      });
    }

    if (ceilingHeight != null) {
      filters.push({
        term: {
          ceilingHeight: ceilingHeight,
        },
      });
    }

    if (yearOfConstruction != null) {
      filters.push({
        term: {
          yearOfConstruction: yearOfConstruction,
        },
      });
    }

    if (floor != null) {
      filters.push({
        term: {
          floor: floor,
        },
      });
    }

    if (waterSupply != null) {
      filters.push({
        term: {
          waterSupply: waterSupply,
        },
      });
    }

    if (gasSupply != null) {
      filters.push({
        term: {
          gasSupply: gasSupply,
        },
      });
    }

    if (electricitySupply != null) {
      filters.push({
        term: {
          electricitySupply: electricitySupply,
        },
      });
    }

    if (objectPlacement != null) {
      filters.push({
        term: {
          objectPlacement: objectPlacement,
        },
      });
    }

    if (communications != null && communications.includes(CommunicationsEnum.GAS)) {
      filters.push({
        term: {
          gas: true,
        },
      });
    }

    if (communications != null && communications.includes(CommunicationsEnum.HEATING)) {
      filters.push({
        term: {
          heating: true,
        },
      });
    }

    if (communications != null && communications.includes(CommunicationsEnum.LIGHT)) {
      filters.push({
        term: {
          light: true,
        },
      });
    }

    if (communications != null && communications.includes(CommunicationsEnum.SEWERAGE)) {
      filters.push({
        term: {
          sewerage: true,
        },
      });
    }

    if (communications != null && communications.includes(CommunicationsEnum.VENTILATION)) {
      filters.push({
        term: {
          ventilation: true,
        },
      });
    }

    if (communications != null && communications.includes(CommunicationsEnum.WATER)) {
      filters.push({
        term: {
          water: true,
        },
      });
    }
  }

  applyDetailsFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]) {
    const { numberOfAdults, numberOfChild, numberOfRooms } = inputFilters;

    const numberOfGuests = numberOfAdults + (numberOfChild || 0);

    if (numberOfGuests != null) {
      filters.push({
        range: {
          numberOfGuests: {
            gte: numberOfGuests,
          },
        },
      });
    }

    if (numberOfRooms != null && numberOfRooms.every((i) => i >= 0 && i <= 8)) {
      filters.push({
        terms: {
          numberOfRooms,
        },
      });
    }
  }

  applyArrivalAndDepartureFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]) {
    const { arrivalTimeStart, arrivalTimeEnd, departureTimeStart, departureTimeEnd } = inputFilters;

    // if selected both arrival time start and arrival time end
    if (arrivalTimeStart && arrivalTimeEnd) {
      filters.push({
        range: {
          arrivalTime: {
            gte: arrivalTimeStart,
            lte: arrivalTimeEnd,
          },
        },
      });
    }

    // if selected only arrival time start
    if (arrivalTimeStart && !arrivalTimeEnd) {
      filters.push({
        range: {
          arrivalTime: {
            gte: arrivalTimeStart,
          },
        },
      });
    }

    // if selected only arrival time end
    if (arrivalTimeEnd && !arrivalTimeStart) {
      filters.push({
        range: {
          arrivalTime: {
            lte: arrivalTimeEnd,
          },
        },
      });
    }

    // if selected both departure time start and arrival time end
    if (departureTimeStart && departureTimeEnd) {
      filters.push({
        range: {
          departureTime: {
            gte: departureTimeStart,
            lte: departureTimeEnd,
          },
        },
      });
    }

    // if selected only departure time start
    if (departureTimeStart && !departureTimeEnd) {
      filters.push({
        range: {
          departureTime: {
            gte: departureTimeStart,
          },
        },
      });
    }

    // if selected only departure time end
    if (departureTimeEnd && !departureTimeStart) {
      filters.push({
        range: {
          departureTime: {
            lte: departureTimeEnd,
          },
        },
      });
    }
  }

  async subtractLockedDatesFilters(inputFilters: FindShortTermRentAdsFilterRequest) {
    const {
      dateRange,
      location: { lat, lng, radiusInKm },
    } = inputFilters;

    const subFilters: QueryDslQueryContainer[] = [];

    if (dateRange?.startDate && dateRange.endDate) {
      subFilters.push({
        range: {
          startDate: {
            lte: dateRange?.endDate,
          },
        },
      });

      subFilters.push({
        range: {
          endDate: {
            gte: dateRange?.startDate,
          },
        },
      });
    }

    if (dateRange?.startDate && !dateRange.endDate) {
      subFilters.push({
        range: {
          endDate: {
            gte: dateRange?.startDate,
          },
        },
      });
    }

    if (dateRange?.endDate && !dateRange.startDate) {
      subFilters.push({
        range: {
          startDate: {
            lte: dateRange?.endDate,
          },
        },
      });
    }

    const resultOfLockedShortTermRentDocuments = await this.elasticsearchService.search<
      SearchTemplateResponse<ShortTermRentDocumentProps>
    >({
      index: this.shortTermRentLockedDateDocument.indexName,
      body: {
        query: {
          // Date range intersections info: https://stackoverflow.com/questions/16797694/elasticsearch-date-range-intersection
          bool: {
            must: [
              ...subFilters,
              {
                // additional filter to reduce the search range
                geo_distance: {
                  distance: `${radiusInKm}km`,
                  geoPoint: {
                    lat,
                    lon: lng,
                  },
                },
              },
            ],
          },
        },
        // Terms aggregation doc: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html
        aggs: {
          id: {
            terms: {
              field: 'id',
              /**
               *  Max bucket doc: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-settings.html#search-settings-max-buckets
               *  The size sets capacity of aggregated bucket allowed in single response (by default used 10, max recommend size is 65,536)
               */
              size: 10000,
            },
          },
        },
      },
    });

    const lockedShortTermRentIds = (
      (
        resultOfLockedShortTermRentDocuments.body.aggregations?.id as AggregationsMultiBucketAggregateBase<{
          key: string;
        }>
      ).buckets as { key: string; doc_count: number }[]
    ).map((i) => i.key);

    return lockedShortTermRentIds;
  }

  async subtractRentedDatesFilters(inputFilters: FindShortTermRentAdsFilterRequest) {
    const {
      dateRange,
      arrivalTimeStart,
      arrivalTimeEnd,
      departureTimeStart,
      departureTimeEnd,
      location: { lat, lng, radiusInKm },
    } = inputFilters;

    const subFilters: QueryDslQueryContainer[] = [];

    const timezone = TimezoneUtil.getOffsetByCords({ lat, lng });

    if (dateRange?.startDate && dateRange.endDate) {
      const arrivalDateUTC = DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} 00:00`, timezone)
        .startOf('day')
        .toISOString();
      const departureDateUTC = DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} 00:00`, timezone)
        .endOf('day')
        .toISOString();

      subFilters.push({
        range: {
          startDate: {
            lte: departureDateUTC,
          },
        },
      });

      subFilters.push({
        range: {
          endDate: {
            gte: arrivalDateUTC,
          },
        },
      });
    }

    const resultOfRentedShortTermRentDocuments = await this.elasticsearchService.search<
      SearchTemplateResponse<ShortTermRentsRentedDateDocumentProps>
    >({
      index: this.shortTermRentRentedDateDocument.indexName,
      size: 10000,
      body: {
        query: {
          // Date range intersections info: https://stackoverflow.com/questions/16797694/elasticsearch-date-range-intersection
          bool: {
            must: [
              ...subFilters,
              {
                // additional filter to reduce the search range
                geo_distance: {
                  distance: `${radiusInKm}km`,
                  geoPoint: {
                    lat,
                    lon: lng,
                  },
                },
              },
            ],
          },
        },
      },
    });

    const result = resultOfRentedShortTermRentDocuments.body.hits.hits;

    const filterByDateTimeRange = (rentedDateDoc: ShortTermRentsRentedDateDocumentProps) => {
      const rentedArrivalDateTimeUTC = DateUtil.parse(rentedDateDoc.startDate);
      const rentedDepartureDateTimeUTC = DateUtil.parse(rentedDateDoc.endDate);

      if (dateRange?.startDate && dateRange.endDate) {
        const inputArrivalDateTimeStartUTC = arrivalTimeStart
          ? DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} ${arrivalTimeStart}`, timezone)
          : DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} 00:00`, timezone).startOf('day');

        const inputArrivalDateTimeEndUTC = arrivalTimeEnd
          ? DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} ${arrivalTimeEnd}`, timezone)
          : DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} 00:00`, timezone).endOf('day');

        const inputDepartureDateTimeStartUTC = departureTimeStart
          ? DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} ${departureTimeStart}`, timezone)
          : DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} 00:00`, timezone).startOf('day');

        const inputDepartureDateTimeEndUTC = departureTimeEnd
          ? DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} ${departureTimeEnd}`, timezone)
          : DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} 00:00`, timezone).endOf('day');

        // check if input departure date is equal any rented arrival date then check by time
        if (rentedArrivalDateTimeUTC.format('YYYY-MM-DD') === inputDepartureDateTimeEndUTC.format('YYYY-MM-DD')) {
          const rentedArrivalTimeHours = rentedArrivalDateTimeUTC.get('h');
          // without utc(false) returns local time (not in utc tz)
          const inputDepartureTimeStartHours = departureTimeStart
            ? inputDepartureDateTimeStartUTC.utc(false).get('h')
            : inputDepartureDateTimeStartUTC.get('h');

          const isIntersects = rentedArrivalTimeHours <= inputDepartureTimeStartHours;

          if (isIntersects) {
            return true;
          }

          return false;
        }

        // check if input arrival date is equal any rented departure date then check by time
        if (rentedDepartureDateTimeUTC.format('YYYY-MM-DD') === inputArrivalDateTimeStartUTC.format('YYYY-MM-DD')) {
          const rentedDepartureTimeHours = rentedDepartureDateTimeUTC.get('h');
          // without utc(false) returns local time (not in utc tz)
          const inputArrivalTimeEndHours = arrivalTimeEnd
            ? inputArrivalDateTimeEndUTC.utc(false).get('h')
            : inputArrivalDateTimeEndUTC.get('h');

          const isIntersects = rentedDepartureTimeHours >= inputArrivalTimeEndHours;

          if (isIntersects) {
            return true;
          }

          return false;
        }

        // leave the lock if no match
        return true;
      }
    };

    const rentedShortTermRentIds = result
      .filter((i) => (i._source ? filterByDateTimeRange(i._source) : false))
      .map((i) => (i._source as ShortTermRentsRentedDateDocumentProps).id);

    return rentedShortTermRentIds;
  }

  applyBookingAccessFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]) {
    const {
      dateRange,
      location: { lat, lng },
    } = inputFilters;

    const timezone = TimezoneUtil.getOffsetByCords({ lat, lng });

    if (dateRange?.startDate && dateRange?.endDate) {
      const todayUTC = DateUtil.now().tz(timezone).startOf('day').toISOString();

      const endDateUTC = DateUtil.parse(dateRange?.endDate).tz(timezone).startOf('day').toISOString();

      const amountMonthsOffset = DateUtil.getDiffBetweenTwoDatesUTC(todayUTC, endDateUTC, 'month', true);

      filters.push({
        range: {
          bookingAccessInMonths: {
            gte: amountMonthsOffset,
          },
        },
      });
    }

    if (dateRange?.startDate && !dateRange?.endDate) {
      const todayUTC = DateUtil.now().tz(timezone).startOf('day').toISOString();

      const startDateUTC = DateUtil.parse(dateRange?.startDate).tz(timezone).startOf('day').toISOString();

      const amountMonthsOffset = DateUtil.getDiffBetweenTwoDatesUTC(todayUTC, startDateUTC, 'month', true);

      filters.push({
        range: {
          bookingAccessInMonths: {
            gte: amountMonthsOffset,
          },
        },
      });
    }

    if (dateRange?.endDate && !dateRange.startDate) {
      const todayUTC = DateUtil.now().tz(timezone).startOf('day').toISOString();

      const endDateUTC = DateUtil.parse(dateRange?.endDate).tz(timezone).startOf('day').toISOString();

      const amountMonthsOffset = DateUtil.getDiffBetweenTwoDatesUTC(todayUTC, endDateUTC, 'month', true);

      filters.push({
        range: {
          bookingAccessInMonths: {
            gte: amountMonthsOffset,
          },
        },
      });
    }
  }
}
