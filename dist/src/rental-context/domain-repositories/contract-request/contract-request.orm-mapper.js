"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestOrmMapper = void 0;
const apartment_guests_value_object_1 = require("../../domain-value-objects/apartment-guests.value-object");
const rent_booking_type_value_object_1 = require("../../domain-value-objects/rent-booking-type.value-object");
const short_term_rent_payment_type_value_object_1 = require("../../domain-value-objects/short-term-rent-payment-type.value-object");
const request_status_value_object_1 = require("../../domains/contract-request/domain/value-objects/request-status.value-object");
const rent_period_version_entity_1 = require("../../domains/rent-period-version/domain/rent-period-version.entity");
const apartment_ad_orm_entity_1 = require("../../../infrastructure/database/entities/apartment-ad.orm-entity");
const rent_period_version_orm_entity_1 = require("../../../infrastructure/database/entities/rent-period-version.orm-entity");
const date_time_iso_tz_value_object_1 = require("../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const date_value_object_1 = require("../../../libs/ddd/domain/value-objects/date.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
const common_1 = require("@nestjs/common");
class ContractRequestOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        var _a, _b, _c;
        const props = entity.getPropsCopy();
        const guests = (_a = props.guests) === null || _a === void 0 ? void 0 : _a.unpack();
        const ormProps = {
            apartmentAdId: props.apartmentAdId ? props.apartmentAdId.value : undefined,
            apartmentRentPeriodType: props.apartmentRentPeriodType,
            status: props.status.value,
            tenantId: props.tenantId ? props.tenantId.value : undefined,
            arrivalDate: props.arrivalDate ? new Date(props.arrivalDate.value) : undefined,
            departureDate: props.departureDate ? new Date(props.departureDate.value) : undefined,
            comment: props.comment,
            guests,
            rejectReason: props.rejectReason,
            rentPeriodVersionId: props.rentPeriodVersion.id.value,
            rentBookingType: (_b = props.shortTermRentBookingType) === null || _b === void 0 ? void 0 : _b.value,
            rentPaymentType: (_c = props.shortTermRentPaymentType) === null || _c === void 0 ? void 0 : _c.value,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity, trxId) {
        var _a;
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const trx = trxId ? (_a = this.unitOfWork) === null || _a === void 0 ? void 0 : _a.getTrx(trxId) : undefined;
        const [rentPeriodVersion, apartmentAd] = await Promise.all([
            rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query(trx).findById(ormEntity.rentPeriodVersionId),
            ormEntity.apartmentAdId
                ? apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(trx).findById(ormEntity.apartmentAdId).select('landlordId')
                : undefined,
        ]);
        if (!rentPeriodVersion) {
            throw new common_1.NotFoundException('Rent period version not found');
        }
        const props = {
            apartmentAdId: ormEntity.apartmentAdId ? new uuid_value_object_1.UUID(ormEntity.apartmentAdId) : undefined,
            apartmentRentPeriodType: ormEntity.apartmentRentPeriodType,
            landlordId: (apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.landlordId) ? new uuid_value_object_1.UUID(apartmentAd.landlordId) : undefined,
            status: request_status_value_object_1.ContractRequestStatusVO.create(ormEntity.status),
            tenantId: ormEntity.tenantId ? new uuid_value_object_1.UUID(ormEntity.tenantId) : undefined,
            arrivalDate: ormEntity.arrivalDate ? new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.arrivalDate.toISOString()) : undefined,
            departureDate: ormEntity.departureDate ? new date_time_iso_tz_value_object_1.DateTimeISOTZVO(ormEntity.departureDate.toISOString()) : undefined,
            comment: ormEntity.comment,
            rejectReason: ormEntity.rejectReason,
            shortTermRentBookingType: ormEntity.rentBookingType
                ? rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(ormEntity.rentBookingType)
                : undefined,
            shortTermRentPaymentType: ormEntity.rentPaymentType
                ? short_term_rent_payment_type_value_object_1.ShortTermRentPaymentTypeVO.create(ormEntity.rentPaymentType)
                : undefined,
            guests: new apartment_guests_value_object_1.ApartmentGuestsVO(ormEntity.guests),
            rentPeriodVersion: new rent_period_version_entity_1.RentPeriodVersionEntity({
                id: new uuid_value_object_1.UUID(ormEntity.rentPeriodVersionId),
                props: {
                    version: rentPeriodVersion.version,
                    shortTermRentMonth: rentPeriodVersion.shortTermRentMonth,
                    middleTermRentMonth: rentPeriodVersion.middleTermRentMonth,
                    longTermRentMonth: rentPeriodVersion.longTermRentMonth,
                },
                createdAt: new date_value_object_1.DateVO(rentPeriodVersion.createdAt),
                updatedAt: new date_value_object_1.DateVO(rentPeriodVersion.updatedAt),
                deletedAt: rentPeriodVersion.deletedAt ? new date_value_object_1.DateVO(rentPeriodVersion.deletedAt) : null,
            }),
        };
        return { id, props };
    }
}
exports.ContractRequestOrmMapper = ContractRequestOrmMapper;
//# sourceMappingURL=contract-request.orm-mapper.js.map