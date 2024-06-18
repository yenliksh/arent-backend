"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentFilterBase = void 0;
const types_1 = require("../../domain/types");
const enums_1 = require("../../../../../infrastructure/enums");
class LongTermRentFilterBase {
    applyBaseFilters(inputFilters, filters) {
        const { location: { lat, lng, radiusInKm }, apartmentTypes, apartmentCategory, } = inputFilters;
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
        if (apartmentCategory != null) {
            filters.push({
                term: {
                    apartmentCategory: apartmentCategory,
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
}
exports.LongTermRentFilterBase = LongTermRentFilterBase;
//# sourceMappingURL=long-term-rent-filter.base.service.js.map