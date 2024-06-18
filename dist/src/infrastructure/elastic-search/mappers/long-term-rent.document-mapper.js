"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentDocumentMapper = void 0;
const oxide_ts_1 = require("oxide.ts");
const elasticsearch_document_mapper_base_1 = require("../base-classes/elasticsearch-document.mapper.base");
class LongTermRentDocumentMapper extends elasticsearch_document_mapper_base_1.ElasticsearchDocumentMapperBase {
    async ormEntityToDocument(ormEntity) {
        if (!ormEntity.apartmentAd) {
            return (0, oxide_ts_1.Err)(new Error('Long term rent should have apartmentAd relation'));
        }
        const props = await this.getPropsFromOrmEntity(ormEntity);
        if (!props) {
            return (0, oxide_ts_1.Err)(new Error('Long term orm entity does not have required fields'));
        }
        return (0, oxide_ts_1.Ok)(props);
    }
    async domainEntityToDocument(domainEntity) {
        if (!domainEntity.isLongTermRent) {
            return (0, oxide_ts_1.Err)(new Error('Apartment ad should have long term rent type'));
        }
        const props = await this.getPropsFromDomainEntity(domainEntity);
        if (!props) {
            return (0, oxide_ts_1.Err)(new Error('Long term orm entity does not have required fields'));
        }
        return (0, oxide_ts_1.Ok)(props);
    }
    async getPropsFromOrmEntity({ id, updatedAt, createdAt, apartmentAd, cost, currency, apartmentAdId, }) {
        if (id == null ||
            updatedAt == null ||
            createdAt == null ||
            apartmentAd == null ||
            cost == null ||
            currency == null ||
            apartmentAdId == null) {
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
        if (name == null ||
            description == null ||
            remoteView == null ||
            selfCheckIn == null ||
            freeParking == null ||
            workSpace == null ||
            quite == null ||
            forFamily == null ||
            allowedToHangingOut == null ||
            allowedToSmoke == null ||
            allowedWithChildren == null ||
            allowedWithPets == null) {
            return;
        }
        return {
            id,
            cost,
            currency,
            apartmentAdId,
            updatedAt,
            createdAt,
            rentPeriodType,
            apartmentType,
            apartmentCategory,
            numberOfGuests,
            numberOfRooms,
            geoPoint: {
                lat,
                lon: lng,
            },
            title: name,
            photo: (media === null || media === void 0 ? void 0 : media.photos[0].fileKey) || '',
            remoteView,
            selfCheckIn,
            freeParking,
            workSpace,
            quite,
            forFamily,
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
        var _a, _b, _c, _d, _e, _f;
        const apartmentAdProps = entity.getPropsCopy();
        const longTermRentProps = apartmentAdProps.longTermRent ? apartmentAdProps.longTermRent.getPropsCopy() : undefined;
        if (!longTermRentProps) {
            return;
        }
        const detailsProps = (_a = apartmentAdProps.details) === null || _a === void 0 ? void 0 : _a.unpack();
        const details = {
            numberOfGuests: (detailsProps === null || detailsProps === void 0 ? void 0 : detailsProps.numberOfGuests) || 1,
            numberOfRooms: (detailsProps === null || detailsProps === void 0 ? void 0 : detailsProps.numberOfRooms) || null,
        };
        if (!details) {
            return;
        }
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
        let characteristics = (_e = apartmentAdProps.characteristics) === null || _e === void 0 ? void 0 : _e.unpack();
        if (!rules) {
            rules = {
                allowedWithPets: null,
                allowedWithChildren: null,
                allowedToSmoke: null,
                allowedToHangingOut: null,
            };
        }
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
        const id = longTermRentProps.id.value;
        const apartmentAdId = entity.id.value;
        const cost = longTermRentProps.costAndCurrency.cost;
        const currency = longTermRentProps.costAndCurrency.currency;
        const rentPeriodType = apartmentAdProps.rentPeriodType.value;
        const apartmentType = apartmentAdProps.apartmentType.value;
        const apartmentCategory = apartmentAdProps.apartmentCategory.value;
        const createdAt = longTermRentProps.createdAt.value;
        const updatedAt = longTermRentProps.updatedAt.value;
        const photo = ((_f = apartmentAdProps.media) === null || _f === void 0 ? void 0 : _f.unpack().photos[0].fileKey) || '';
        const { name, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily } = description;
        return {
            id,
            apartmentAdId,
            rentPeriodType,
            apartmentType,
            apartmentCategory,
            cost,
            currency,
            photo,
            title: name,
            createdAt,
            updatedAt,
            geoPoint,
            remoteView: remoteView || null,
            selfCheckIn: selfCheckIn || null,
            freeParking: freeParking || null,
            workSpace: workSpace || null,
            quite: quite || null,
            forFamily: forFamily || null,
            ...details,
            ...rules,
            ...characteristics,
        };
    }
}
exports.LongTermRentDocumentMapper = LongTermRentDocumentMapper;
//# sourceMappingURL=long-term-rent.document-mapper.js.map