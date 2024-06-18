"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentFilterBase = void 0;
const types_1 = require("../../domain/types");
const enums_1 = require("../../../../../infrastructure/enums");
const date_util_1 = require("../../../../../libs/utils/date-util");
const timezone_util_1 = require("../../../../../libs/utils/timezone-util");
class ShortTermRentFilterBase {
    constructor(elasticsearchService, shortTermRentLockedDateDocument, shortTermRentRentedDateDocument) {
        this.elasticsearchService = elasticsearchService;
        this.shortTermRentLockedDateDocument = shortTermRentLockedDateDocument;
        this.shortTermRentRentedDateDocument = shortTermRentRentedDateDocument;
    }
    applyBaseFilters(inputFilters, filters) {
        const { location: { lat, lng, radiusInKm }, apartmentTypes, apartmentCategory, cancellationPolicyType, rentBookingType, } = inputFilters;
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
    applyPriceRangeFilters(inputFilters, filters) {
        const { priceRange } = inputFilters;
        if ((priceRange === null || priceRange === void 0 ? void 0 : priceRange.max) != null && (priceRange === null || priceRange === void 0 ? void 0 : priceRange.min) != null) {
            filters.push({
                bool: {
                    must: [
                        { term: { currency: types_1.CurrencyType.KZT } },
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
        if ((priceRange === null || priceRange === void 0 ? void 0 : priceRange.min) != null && (priceRange === null || priceRange === void 0 ? void 0 : priceRange.max) == null) {
            filters.push({
                bool: {
                    must: [
                        { term: { currency: types_1.CurrencyType.KZT } },
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
        if ((priceRange === null || priceRange === void 0 ? void 0 : priceRange.max) != null && (priceRange === null || priceRange === void 0 ? void 0 : priceRange.min) == null) {
            filters.push({
                bool: {
                    must: [
                        { term: { currency: types_1.CurrencyType.KZT } },
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
    applyRulesWithGestAffectedFilters(inputFilters, filters) {
        const { rules, numberOfChild, numberOfPets } = inputFilters;
        if (rules != null && rules.includes(types_1.ApartmentRuleType.ALLOWED_TO_HANGING_OUT)) {
            filters.push({
                term: {
                    allowedToHangingOut: true,
                },
            });
        }
        if (rules != null && rules.includes(types_1.ApartmentRuleType.ALLOWED_TO_SMOKE)) {
            filters.push({
                term: {
                    allowedToSmoke: true,
                },
            });
        }
        if ((rules != null && rules.includes(types_1.ApartmentRuleType.ALLOWED_WITH_CHILDREN)) ||
            (numberOfChild != null && numberOfChild > 0)) {
            filters.push({
                term: {
                    allowedWithChildren: true,
                },
            });
        }
        if ((rules != null && rules.includes(types_1.ApartmentRuleType.ALLOWED_WITH_PETS)) ||
            (numberOfPets != null && numberOfPets > 0)) {
            filters.push({
                term: {
                    allowedWithPets: true,
                },
            });
        }
    }
    applyCharacteristicsAffectedFilters(inputFilters, filters) {
        const { landArea, totalArea, territoryArea, objectArea, ceilingHeight, yearOfConstruction, floor, waterSupply, gasSupply, electricitySupply, objectPlacement, communications, } = inputFilters;
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
        if (communications != null && communications.includes(enums_1.CommunicationsEnum.GAS)) {
            filters.push({
                term: {
                    gas: true,
                },
            });
        }
        if (communications != null && communications.includes(enums_1.CommunicationsEnum.HEATING)) {
            filters.push({
                term: {
                    heating: true,
                },
            });
        }
        if (communications != null && communications.includes(enums_1.CommunicationsEnum.LIGHT)) {
            filters.push({
                term: {
                    light: true,
                },
            });
        }
        if (communications != null && communications.includes(enums_1.CommunicationsEnum.SEWERAGE)) {
            filters.push({
                term: {
                    sewerage: true,
                },
            });
        }
        if (communications != null && communications.includes(enums_1.CommunicationsEnum.VENTILATION)) {
            filters.push({
                term: {
                    ventilation: true,
                },
            });
        }
        if (communications != null && communications.includes(enums_1.CommunicationsEnum.WATER)) {
            filters.push({
                term: {
                    water: true,
                },
            });
        }
    }
    applyDetailsFilters(inputFilters, filters) {
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
    applyArrivalAndDepartureFilters(inputFilters, filters) {
        const { arrivalTimeStart, arrivalTimeEnd, departureTimeStart, departureTimeEnd } = inputFilters;
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
        if (arrivalTimeStart && !arrivalTimeEnd) {
            filters.push({
                range: {
                    arrivalTime: {
                        gte: arrivalTimeStart,
                    },
                },
            });
        }
        if (arrivalTimeEnd && !arrivalTimeStart) {
            filters.push({
                range: {
                    arrivalTime: {
                        lte: arrivalTimeEnd,
                    },
                },
            });
        }
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
        if (departureTimeStart && !departureTimeEnd) {
            filters.push({
                range: {
                    departureTime: {
                        gte: departureTimeStart,
                    },
                },
            });
        }
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
    async subtractLockedDatesFilters(inputFilters) {
        var _a;
        const { dateRange, location: { lat, lng, radiusInKm }, } = inputFilters;
        const subFilters = [];
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate) && dateRange.endDate) {
            subFilters.push({
                range: {
                    startDate: {
                        lte: dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate,
                    },
                },
            });
            subFilters.push({
                range: {
                    endDate: {
                        gte: dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate,
                    },
                },
            });
        }
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate) && !dateRange.endDate) {
            subFilters.push({
                range: {
                    endDate: {
                        gte: dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate,
                    },
                },
            });
        }
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate) && !dateRange.startDate) {
            subFilters.push({
                range: {
                    startDate: {
                        lte: dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate,
                    },
                },
            });
        }
        const resultOfLockedShortTermRentDocuments = await this.elasticsearchService.search({
            index: this.shortTermRentLockedDateDocument.indexName,
            body: {
                query: {
                    bool: {
                        must: [
                            ...subFilters,
                            {
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
                aggs: {
                    id: {
                        terms: {
                            field: 'id',
                            size: 10000,
                        },
                    },
                },
            },
        });
        const lockedShortTermRentIds = ((_a = resultOfLockedShortTermRentDocuments.body.aggregations) === null || _a === void 0 ? void 0 : _a.id).buckets.map((i) => i.key);
        return lockedShortTermRentIds;
    }
    async subtractRentedDatesFilters(inputFilters) {
        const { dateRange, arrivalTimeStart, arrivalTimeEnd, departureTimeStart, departureTimeEnd, location: { lat, lng, radiusInKm }, } = inputFilters;
        const subFilters = [];
        const timezone = timezone_util_1.TimezoneUtil.getOffsetByCords({ lat, lng });
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate) && dateRange.endDate) {
            const arrivalDateUTC = date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} 00:00`, timezone)
                .startOf('day')
                .toISOString();
            const departureDateUTC = date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} 00:00`, timezone)
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
        const resultOfRentedShortTermRentDocuments = await this.elasticsearchService.search({
            index: this.shortTermRentRentedDateDocument.indexName,
            size: 10000,
            body: {
                query: {
                    bool: {
                        must: [
                            ...subFilters,
                            {
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
        const filterByDateTimeRange = (rentedDateDoc) => {
            const rentedArrivalDateTimeUTC = date_util_1.DateUtil.parse(rentedDateDoc.startDate);
            const rentedDepartureDateTimeUTC = date_util_1.DateUtil.parse(rentedDateDoc.endDate);
            if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate) && dateRange.endDate) {
                const inputArrivalDateTimeStartUTC = arrivalTimeStart
                    ? date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} ${arrivalTimeStart}`, timezone)
                    : date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} 00:00`, timezone).startOf('day');
                const inputArrivalDateTimeEndUTC = arrivalTimeEnd
                    ? date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} ${arrivalTimeEnd}`, timezone)
                    : date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.startDate} 00:00`, timezone).endOf('day');
                const inputDepartureDateTimeStartUTC = departureTimeStart
                    ? date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} ${departureTimeStart}`, timezone)
                    : date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} 00:00`, timezone).startOf('day');
                const inputDepartureDateTimeEndUTC = departureTimeEnd
                    ? date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} ${departureTimeEnd}`, timezone)
                    : date_util_1.DateUtil.formatDateTimeTzToUtc(`${dateRange.endDate} 00:00`, timezone).endOf('day');
                if (rentedArrivalDateTimeUTC.format('YYYY-MM-DD') === inputDepartureDateTimeEndUTC.format('YYYY-MM-DD')) {
                    const rentedArrivalTimeHours = rentedArrivalDateTimeUTC.get('h');
                    const inputDepartureTimeStartHours = departureTimeStart
                        ? inputDepartureDateTimeStartUTC.utc(false).get('h')
                        : inputDepartureDateTimeStartUTC.get('h');
                    const isIntersects = rentedArrivalTimeHours <= inputDepartureTimeStartHours;
                    if (isIntersects) {
                        return true;
                    }
                    return false;
                }
                if (rentedDepartureDateTimeUTC.format('YYYY-MM-DD') === inputArrivalDateTimeStartUTC.format('YYYY-MM-DD')) {
                    const rentedDepartureTimeHours = rentedDepartureDateTimeUTC.get('h');
                    const inputArrivalTimeEndHours = arrivalTimeEnd
                        ? inputArrivalDateTimeEndUTC.utc(false).get('h')
                        : inputArrivalDateTimeEndUTC.get('h');
                    const isIntersects = rentedDepartureTimeHours >= inputArrivalTimeEndHours;
                    if (isIntersects) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
        };
        const rentedShortTermRentIds = result
            .filter((i) => (i._source ? filterByDateTimeRange(i._source) : false))
            .map((i) => i._source.id);
        return rentedShortTermRentIds;
    }
    applyBookingAccessFilters(inputFilters, filters) {
        const { dateRange, location: { lat, lng }, } = inputFilters;
        const timezone = timezone_util_1.TimezoneUtil.getOffsetByCords({ lat, lng });
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate) && (dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate)) {
            const todayUTC = date_util_1.DateUtil.now().tz(timezone).startOf('day').toISOString();
            const endDateUTC = date_util_1.DateUtil.parse(dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate).tz(timezone).startOf('day').toISOString();
            const amountMonthsOffset = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(todayUTC, endDateUTC, 'month', true);
            filters.push({
                range: {
                    bookingAccessInMonths: {
                        gte: amountMonthsOffset,
                    },
                },
            });
        }
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate) && !(dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate)) {
            const todayUTC = date_util_1.DateUtil.now().tz(timezone).startOf('day').toISOString();
            const startDateUTC = date_util_1.DateUtil.parse(dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate).tz(timezone).startOf('day').toISOString();
            const amountMonthsOffset = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(todayUTC, startDateUTC, 'month', true);
            filters.push({
                range: {
                    bookingAccessInMonths: {
                        gte: amountMonthsOffset,
                    },
                },
            });
        }
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate) && !dateRange.startDate) {
            const todayUTC = date_util_1.DateUtil.now().tz(timezone).startOf('day').toISOString();
            const endDateUTC = date_util_1.DateUtil.parse(dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate).tz(timezone).startOf('day').toISOString();
            const amountMonthsOffset = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(todayUTC, endDateUTC, 'month', true);
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
exports.ShortTermRentFilterBase = ShortTermRentFilterBase;
//# sourceMappingURL=short-term-rent-filter.base.service.js.map