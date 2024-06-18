"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentDocumentMapper = void 0;
const contract_orm_entity_1 = require("../../database/entities/contract.orm-entity");
const short_term_rent_locked_dates_orm_entity_1 = require("../../database/entities/short-term-rent-locked-dates.orm-entity");
const enums_1 = require("../../enums");
const oxide_ts_1 = require("oxide.ts");
const elasticsearch_document_mapper_base_1 = require("../base-classes/elasticsearch-document.mapper.base");
class ShortTermRentDocumentMapper extends elasticsearch_document_mapper_base_1.ElasticsearchDocumentMapperBase {
    async ormEntityToDocument(ormEntity) {
        if (!ormEntity.apartmentAd) {
            return (0, oxide_ts_1.Err)(new Error('Short term rent should have apartmentAd relation'));
        }
        const props = await this.getPropsFromOrmEntity(ormEntity);
        if (!props) {
            return (0, oxide_ts_1.Err)(new Error('Short term orm entity does not have required fields'));
        }
        return (0, oxide_ts_1.Ok)(props);
    }
    async domainEntityToDocument(domainEntity) {
        if (!domainEntity.isShortTermRent) {
            return (0, oxide_ts_1.Err)(new Error('Apartment ad should have short term rent type'));
        }
        const props = await this.getPropsFromDomainEntity(domainEntity);
        if (!props) {
            return (0, oxide_ts_1.Err)(new Error('Short term orm entity does not have required fields'));
        }
        return (0, oxide_ts_1.Ok)(props);
    }
    async getPropsFromOrmEntity({ id, updatedAt, createdAt, apartmentAd, cost, currency, cancellationPolicy, rentBookingType, arrivalTime, departureTime, apartmentAdId, bookingAccessInMonths = 0, }) {
        if (id == null ||
            updatedAt == null ||
            createdAt == null ||
            apartmentAd == null ||
            cost == null ||
            currency == null ||
            apartmentAdId == null ||
            rentBookingType == null) {
            return;
        }
        const { rentPeriodType, apartmentType, apartmentCategory, numberOfGuests, numberOfRooms, lat, lng, description: _description, rules: _rules, characteristics: _characteristics, media, } = apartmentAd;
        if (rentPeriodType == null ||
            apartmentType == null ||
            apartmentCategory == null ||
            numberOfGuests == null ||
            numberOfRooms == null ||
            lat == null ||
            lng == null ||
            _description == null ||
            _rules == null) {
            return;
        }
        const { name, description, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily } = _description;
        const { allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets } = _rules;
        const { totalArea, landArea, territoryArea, objectArea, ceilingHeight, yearOfConstruction, floor, waterSupply, electricitySupply, gasSupply, objectPlacement, light, water, gas, sewerage, heating, ventilation, } = _characteristics;
        if (name == null || description == null) {
            return;
        }
        const shortTermRentLockedDates = await short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.query().where('shortTermRentId', id);
        const shortTermRentRentedDates = await contract_orm_entity_1.ContractOrmEntity.query()
            .where('status', enums_1.ContractStatus.CONCLUDED)
            .where('apartmentAdId', apartmentAdId);
        return {
            id,
            cost,
            currency,
            rentBookingType,
            arrivalTime: arrivalTime || null,
            departureTime: departureTime || null,
            apartmentAdId,
            updatedAt,
            createdAt,
            rentPeriodType,
            apartmentType,
            apartmentCategory,
            numberOfGuests,
            numberOfRooms,
            cancellationPolicy: cancellationPolicy || null,
            bookingAccessInMonths,
            lockedDates: shortTermRentLockedDates.map((i) => ({ startDate: i.startDate, endDate: i.endDate })),
            rentedDates: shortTermRentRentedDates
                .map((i) => {
                var _a, _b;
                return i.arrivalDate && i.departureDate
                    ? { startDate: (_a = i.arrivalDate) === null || _a === void 0 ? void 0 : _a.toISOString(), endDate: (_b = i.departureDate) === null || _b === void 0 ? void 0 : _b.toISOString() }
                    : null;
            })
                .filter((i) => i),
            geoPoint: {
                lat,
                lon: lng,
            },
            title: name,
            photo: (media === null || media === void 0 ? void 0 : media.photos[0].fileKey) || '',
            remoteView: remoteView || null,
            selfCheckIn: selfCheckIn || null,
            freeParking: freeParking || null,
            workSpace: workSpace || null,
            quite: quite || null,
            forFamily: forFamily || null,
            allowedWithPets,
            allowedWithChildren,
            allowedToSmoke,
            allowedToHangingOut,
            totalArea,
            landArea,
            territoryArea,
            objectArea,
            ceilingHeight,
            yearOfConstruction,
            floor,
            waterSupply,
            electricitySupply,
            gasSupply,
            objectPlacement,
            light,
            water,
            gas,
            sewerage,
            heating,
            ventilation,
        };
    }
    async getPropsFromDomainEntity(entity) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const apartmentAdProps = entity.getPropsCopy();
        const shortTermRentProps = apartmentAdProps.shortTermRent
            ? apartmentAdProps.shortTermRent.getPropsCopy()
            : undefined;
        if (!shortTermRentProps) {
            return;
        }
        const detailsProps = (_a = apartmentAdProps.details) === null || _a === void 0 ? void 0 : _a.unpack();
        const details = {
            numberOfGuests: (detailsProps === null || detailsProps === void 0 ? void 0 : detailsProps.numberOfGuests) || 1,
            numberOfRooms: (detailsProps === null || detailsProps === void 0 ? void 0 : detailsProps.numberOfRooms) || null,
        };
        const addressProps = (_b = apartmentAdProps.address) === null || _b === void 0 ? void 0 : _b.unpack();
        const geoPoint = addressProps
            ? {
                lat: addressProps.geoPoint.lat,
                lon: addressProps.geoPoint.lng,
            }
            : undefined;
        if (!geoPoint) {
            return;
        }
        const description = (_c = apartmentAdProps.description) === null || _c === void 0 ? void 0 : _c.unpack();
        if (!description) {
            return;
        }
        let rules = (_d = apartmentAdProps.rules) === null || _d === void 0 ? void 0 : _d.unpack();
        if (!rules) {
            rules = {
                allowedWithPets: null,
                allowedWithChildren: null,
                allowedToSmoke: null,
                allowedToHangingOut: null,
            };
        }
        let characteristics = (_e = apartmentAdProps.characteristics) === null || _e === void 0 ? void 0 : _e.unpack();
        if (!characteristics) {
            characteristics = {
                totalArea: null,
                landArea: null,
                territoryArea: null,
                objectArea: null,
                ceilingHeight: null,
                yearOfConstruction: null,
                floor: null,
                waterSupply: null,
                electricitySupply: null,
                gasSupply: null,
                objectPlacement: null,
                light: null,
                water: null,
                gas: null,
                sewerage: null,
                heating: null,
                ventilation: null,
            };
        }
        const arrivalAndDepartureTimeProps = (_f = shortTermRentProps.arrivalAndDepartureTime) === null || _f === void 0 ? void 0 : _f.unpack();
        const arrivalAndDepartureTime = (arrivalAndDepartureTimeProps === null || arrivalAndDepartureTimeProps === void 0 ? void 0 : arrivalAndDepartureTimeProps.arrivalTime) && arrivalAndDepartureTimeProps.departureTime
            ? {
                arrivalTime: arrivalAndDepartureTimeProps.arrivalTime,
                departureTime: arrivalAndDepartureTimeProps.departureTime,
            }
            : {
                arrivalTime: null,
                departureTime: null,
            };
        const cancellationPolicy = ((_g = shortTermRentProps.cancellationPolicy) === null || _g === void 0 ? void 0 : _g.value) || null;
        const id = shortTermRentProps.id.value;
        const apartmentAdId = entity.id.value;
        const cost = shortTermRentProps.costAndCurrency.cost;
        const currency = shortTermRentProps.costAndCurrency.currency;
        const rentBookingType = shortTermRentProps.rentBookingType.value;
        const rentPeriodType = apartmentAdProps.rentPeriodType.value;
        const apartmentType = apartmentAdProps.apartmentType.value;
        const apartmentCategory = apartmentAdProps.apartmentCategory.value;
        const photo = ((_h = apartmentAdProps.media) === null || _h === void 0 ? void 0 : _h.unpack().photos[0].fileKey) || '';
        const { name, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily } = description;
        const lockedDates = shortTermRentProps.lockedDates.map((i) => {
            const { startDate, endDate } = i.values();
            return { startDate: startDate.value, endDate: endDate.value };
        });
        const shortTermRentRentedDates = await contract_orm_entity_1.ContractOrmEntity.query()
            .where('status', enums_1.ContractStatus.CONCLUDED)
            .where('apartmentAdId', apartmentAdId);
        const bookingAccessInMonths = ((_j = shortTermRentProps.bookingAccessInMonths) === null || _j === void 0 ? void 0 : _j.value) || 0;
        const createdAt = shortTermRentProps.createdAt.value;
        const updatedAt = shortTermRentProps.updatedAt.value;
        return {
            id,
            apartmentAdId,
            rentBookingType,
            rentPeriodType,
            apartmentType,
            apartmentCategory,
            photo,
            cost,
            currency,
            cancellationPolicy,
            createdAt,
            updatedAt,
            geoPoint,
            bookingAccessInMonths,
            lockedDates,
            rentedDates: shortTermRentRentedDates
                .map((i) => {
                var _a, _b;
                return i.arrivalDate && i.departureDate
                    ? { startDate: (_a = i.arrivalDate) === null || _a === void 0 ? void 0 : _a.toISOString(), endDate: (_b = i.departureDate) === null || _b === void 0 ? void 0 : _b.toISOString() }
                    : null;
            })
                .filter((i) => i),
            title: name,
            remoteView: remoteView || null,
            selfCheckIn: selfCheckIn || null,
            freeParking: freeParking || null,
            workSpace: workSpace || null,
            quite: quite || null,
            forFamily: forFamily || null,
            ...details,
            ...rules,
            ...characteristics,
            ...arrivalAndDepartureTime,
        };
    }
}
exports.ShortTermRentDocumentMapper = ShortTermRentDocumentMapper;
//# sourceMappingURL=short-term-rent.document-mapper.js.map