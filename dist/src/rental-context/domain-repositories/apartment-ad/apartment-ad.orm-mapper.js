"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdOrmMapper = void 0;
const address_value_object_1 = require("../../domain-value-objects/address.value-object");
const apartment_characteristics_value_object_1 = require("../../domain-value-objects/apartment-characteristics.value-object");
const apartment_rules_value_object_1 = require("../../domain-value-objects/apartment-rules.value-object");
const cost_and_currency_value_object_1 = require("../../domain-value-objects/cost-and-currency.value-object");
const documents_value_object_1 = require("../../domain-value-objects/documents.value-object");
const payment_method_value_object_1 = require("../../domain-value-objects/payment-method.value-object");
const rent_booking_type_value_object_1 = require("../../domain-value-objects/rent-booking-type.value-object");
const long_term_rent_entity_1 = require("../../domains/apartment-ad/domain/entities/long-term-rent.entity");
const short_term_rent_locked_date_entity_1 = require("../../domains/apartment-ad/domain/entities/short-term-rent-locked-date.entity");
const short_term_rent_entity_1 = require("../../domains/apartment-ad/domain/entities/short-term-rent.entity");
const apartment_ad_description_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/apartment-ad-description.value-object");
const apartment_ad_details_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/apartment-ad-details.value-object");
const apartment_ad_status_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/apartment-ad-status.value-object");
const apartment_category_value_objects_1 = require("../../domains/apartment-ad/domain/value-objects/apartment-category.value-objects");
const apartment_type_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/apartment-type.value-object");
const arrival_and_departure_time_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/arrival-and-departure-time.value-object");
const booking_access_in_month_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/booking-access-in-month.value-object");
const legal_capacity_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/legal-capacity.value-object");
const long_term_rent_cancellation_policy_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/long-term-rent-cancellation-policy.value-object");
const media_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/media.value-object");
const rent_period_type_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/rent-period-type.value-object");
const short_term_rent_cancellation_policy_value_object_1 = require("../../domains/apartment-ad/domain/value-objects/short-term-rent-cancellation-policy.value-object");
const types_1 = require("../../domains/user/domain/types");
const contract_orm_entity_1 = require("../../../infrastructure/database/entities/contract.orm-entity");
const long_term_rent_orm_entity_1 = require("../../../infrastructure/database/entities/long-term-rent.orm-entity");
const short_term_rent_locked_dates_orm_entity_1 = require("../../../infrastructure/database/entities/short-term-rent-locked-dates.orm-entity");
const short_term_rent_orm_entity_1 = require("../../../infrastructure/database/entities/short-term-rent.orm-entity");
const user_orm_entity_1 = require("../../../infrastructure/database/entities/user.orm-entity");
const enums_1 = require("../../../infrastructure/enums");
const date_value_object_1 = require("../../../libs/ddd/domain/value-objects/date.value-object");
const iso_date_value_object_1 = require("../../../libs/ddd/domain/value-objects/iso-date.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
class ApartmentAdOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const props = entity.getPropsCopy();
        const shortTermRentProps = props.shortTermRent ? props.shortTermRent.getPropsCopy() : props.shortTermRent;
        const shortTermRent = shortTermRentProps
            ? short_term_rent_orm_entity_1.ShortTermRentOrmEntity.create({
                id: shortTermRentProps.id.value,
                apartmentAdId: entity.id.value,
                cost: shortTermRentProps.costAndCurrency.cost,
                currency: shortTermRentProps.costAndCurrency.currency,
                rentBookingType: shortTermRentProps.rentBookingType.value,
                cancellationPolicy: (_a = shortTermRentProps.cancellationPolicy) === null || _a === void 0 ? void 0 : _a.value,
                arrivalTime: (_b = shortTermRentProps.arrivalAndDepartureTime) === null || _b === void 0 ? void 0 : _b.arrivalTime,
                departureTime: (_c = shortTermRentProps.arrivalAndDepartureTime) === null || _c === void 0 ? void 0 : _c.departureTime,
                status: shortTermRentProps.status.statusType,
                declineReason: shortTermRentProps.status.declineReason,
                bookingAccessInMonths: (_d = shortTermRentProps.bookingAccessInMonths) === null || _d === void 0 ? void 0 : _d.value,
                lockedDates: ((_e = shortTermRentProps.lockedDates) === null || _e === void 0 ? void 0 : _e.map((i) => {
                    const { startDate, shortTermRentId, endDate, id, createdAt, updatedAt, deletedAt } = i.values();
                    return short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.create({
                        id: id.value,
                        startDate: startDate.value,
                        endDate: endDate.value,
                        shortTermRentId: shortTermRentId.value,
                        createdAt: createdAt.value,
                        updatedAt: updatedAt.value,
                        deletedAt: deletedAt === null || deletedAt === void 0 ? void 0 : deletedAt.value,
                    });
                })) || [],
                isApproved: shortTermRentProps.isApproved,
                createdAt: shortTermRentProps.createdAt.value,
                updatedAt: shortTermRentProps.updatedAt.value,
                deletedAt: (_f = shortTermRentProps.deletedAt) === null || _f === void 0 ? void 0 : _f.value,
            })
            : shortTermRentProps;
        const longTermRentProps = props.longTermRent ? props.longTermRent.getPropsCopy() : props.longTermRent;
        const longTermRent = longTermRentProps
            ? long_term_rent_orm_entity_1.LongTermRentOrmEntity.create({
                id: longTermRentProps.id.value,
                apartmentAdId: entity.id.value,
                cost: longTermRentProps.costAndCurrency.cost,
                currency: longTermRentProps.costAndCurrency.currency,
                status: longTermRentProps.status.statusType,
                cancellationPolicy: (_g = longTermRentProps.cancellationPolicy) === null || _g === void 0 ? void 0 : _g.value,
                declineReason: longTermRentProps.status.declineReason,
                isApproved: longTermRentProps.isApproved,
                ownershipDocuments: (_h = longTermRentProps.ownershipDocuments) === null || _h === void 0 ? void 0 : _h.fileKeys,
                createdAt: longTermRentProps.createdAt.value,
                updatedAt: longTermRentProps.updatedAt.value,
                deletedAt: (_j = longTermRentProps.deletedAt) === null || _j === void 0 ? void 0 : _j.value,
            })
            : longTermRentProps;
        const detailsProps = (_k = props.details) === null || _k === void 0 ? void 0 : _k.unpack();
        const details = detailsProps
            ? { numberOfGuests: detailsProps.numberOfGuests, numberOfRooms: detailsProps.numberOfRooms }
            : {};
        const addressProps = (_l = props.address) === null || _l === void 0 ? void 0 : _l.unpack();
        const address = addressProps
            ? {
                country: addressProps.country,
                city: addressProps.city,
                region: addressProps.region,
                street: addressProps.street,
                houseNumber: addressProps.houseNumber,
                lat: addressProps.geoPoint.lat,
                lng: addressProps.geoPoint.lng,
                timezone: addressProps.timezone,
            }
            : {};
        const media = (_m = props.media) === null || _m === void 0 ? void 0 : _m.unpack();
        const description = (_o = props.description) === null || _o === void 0 ? void 0 : _o.unpack();
        const rules = (_p = props.rules) === null || _p === void 0 ? void 0 : _p.unpack();
        const characteristics = (_q = props.characteristics) === null || _q === void 0 ? void 0 : _q.unpack();
        const legalCapacityProps = props.legalCapacity.unpack();
        const legalCapacity = {
            legalCapacityType: legalCapacityProps.type,
            legalCapacityTinBin: legalCapacityProps.tinBin,
            legalCapacityCompanyName: legalCapacityProps.companyName,
            legalCapacityAddress: legalCapacityProps.address,
        };
        const paymentMethodProps = (_r = props.paymentMethod) === null || _r === void 0 ? void 0 : _r.unpack();
        const paymentMethod = {
            defaultPaymentMethod: paymentMethodProps === null || paymentMethodProps === void 0 ? void 0 : paymentMethodProps.defaultType,
            innopayCardId: paymentMethodProps === null || paymentMethodProps === void 0 ? void 0 : paymentMethodProps.innopayCardId,
        };
        const ormProps = {
            landlordId: props.landlordId.value,
            rentPeriodType: props.rentPeriodType.value,
            apartmentType: props.apartmentType.value,
            apartmentCategory: props.apartmentCategory.value,
            completeStep: props.completeStep,
            longTermRent,
            shortTermRent,
            media,
            description,
            rules,
            characteristics,
            ...details,
            ...address,
            ...legalCapacity,
            ...paymentMethod,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity, trxId) {
        var _a, _b;
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const landlordId = new uuid_value_object_1.UUID(ormEntity.landlordId);
        const trx = trxId ? (_a = this.unitOfWork) === null || _a === void 0 ? void 0 : _a.getTrx(trxId) : undefined;
        const concludedLongTermRentContractQuery = contract_orm_entity_1.ContractOrmEntity.query(trx).findOne({
            apartmentAdId: ormEntity.id,
            status: enums_1.ContractStatus.CONCLUDED,
            apartmentRentPeriodType: enums_1.ApartmentRentPeriodType.LONG_TERM,
        });
        const lockedDatesQuery = ((_b = ormEntity.shortTermRent) === null || _b === void 0 ? void 0 : _b.id)
            ? short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.query(trx).where('shortTermRentId', ormEntity.shortTermRent.id)
            : [];
        const landlordQuery = ormEntity.landlordId ? user_orm_entity_1.UserOrmEntity.query(trx).findById(ormEntity.landlordId) : undefined;
        const [concludedLongTermRentContract, lockedDates, landlord] = await Promise.all([
            concludedLongTermRentContractQuery,
            lockedDatesQuery,
            landlordQuery,
        ]);
        const isUserIdentityApproved = landlord ? landlord.identityStatus === types_1.IdentityStatusType.APPROVED : false;
        const shortTermRent = ormEntity.shortTermRent
            ? new short_term_rent_entity_1.ShortTermRentEntity({
                id: new uuid_value_object_1.UUID(ormEntity.shortTermRent.id),
                props: {
                    apartmentAdId: id,
                    costAndCurrency: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                        cost: ormEntity.shortTermRent.cost,
                    }),
                    isApproved: ormEntity.shortTermRent.isApproved,
                    status: apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                        statusType: ormEntity.shortTermRent.status,
                        declineReason: ormEntity.shortTermRent.declineReason,
                    }),
                    rentBookingType: rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(ormEntity.shortTermRent.rentBookingType),
                    bookingAccessInMonths: ormEntity.shortTermRent.bookingAccessInMonths != null
                        ? new booking_access_in_month_value_object_1.BookingAccessInMonthVO({ value: ormEntity.shortTermRent.bookingAccessInMonths })
                        : ormEntity.shortTermRent.bookingAccessInMonths,
                    lockedDates: lockedDates.map(({ id, shortTermRentId, startDate, endDate, createdAt, updatedAt, deletedAt }) => new short_term_rent_locked_date_entity_1.ShortTermRentLockedDateEntity({
                        id: new uuid_value_object_1.UUID(id),
                        props: {
                            startDate: new iso_date_value_object_1.DateISOVO(startDate),
                            endDate: new iso_date_value_object_1.DateISOVO(endDate),
                            shortTermRentId: new uuid_value_object_1.UUID(shortTermRentId),
                        },
                        createdAt: new date_value_object_1.DateVO(createdAt),
                        updatedAt: new date_value_object_1.DateVO(updatedAt),
                        deletedAt: deletedAt ? new date_value_object_1.DateVO(deletedAt) : null,
                    })),
                    arrivalAndDepartureTime: ormEntity.shortTermRent.arrivalTime && ormEntity.shortTermRent.departureTime
                        ? arrival_and_departure_time_value_object_1.ArrivalAndDepartureTimeVO.create({
                            arrivalTime: ormEntity.shortTermRent.arrivalTime,
                            departureTime: ormEntity.shortTermRent.departureTime,
                        })
                        : undefined,
                    cancellationPolicy: ormEntity.shortTermRent.cancellationPolicy
                        ? short_term_rent_cancellation_policy_value_object_1.ShortTermRentCancellationPolicyVO.create(ormEntity.shortTermRent.cancellationPolicy)
                        : undefined,
                },
                createdAt: new date_value_object_1.DateVO(ormEntity.shortTermRent.createdAt),
                updatedAt: new date_value_object_1.DateVO(ormEntity.shortTermRent.updatedAt),
                deletedAt: ormEntity.shortTermRent.deletedAt ? new date_value_object_1.DateVO(ormEntity.shortTermRent.deletedAt) : null,
            })
            : undefined;
        const longTermRent = ormEntity.longTermRent
            ? new long_term_rent_entity_1.LongTermRentEntity({
                id: new uuid_value_object_1.UUID(ormEntity.longTermRent.id),
                props: {
                    apartmentAdId: id,
                    isApproved: ormEntity.longTermRent.isApproved,
                    costAndCurrency: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                        cost: ormEntity.longTermRent.cost,
                    }),
                    status: apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                        statusType: ormEntity.longTermRent.status,
                        declineReason: ormEntity.longTermRent.declineReason,
                    }),
                    cancellationPolicy: ormEntity.longTermRent.cancellationPolicy
                        ? long_term_rent_cancellation_policy_value_object_1.LongTermRentCancellationPolicyVO.create(ormEntity.longTermRent.cancellationPolicy)
                        : undefined,
                    ownershipDocuments: ormEntity.longTermRent.ownershipDocuments
                        ? new documents_value_object_1.DocumentsVO({ fileKeys: ormEntity.longTermRent.ownershipDocuments })
                        : undefined,
                },
                createdAt: new date_value_object_1.DateVO(ormEntity.longTermRent.createdAt),
                updatedAt: new date_value_object_1.DateVO(ormEntity.longTermRent.updatedAt),
                deletedAt: ormEntity.longTermRent.deletedAt ? new date_value_object_1.DateVO(ormEntity.longTermRent.deletedAt) : null,
            })
            : undefined;
        const details = ormEntity.numberOfGuests != null && ormEntity.numberOfRooms != null
            ? apartment_ad_details_value_object_1.ApartmentAdDetailsVO.create({
                numberOfGuests: ormEntity.numberOfGuests,
                numberOfRooms: ormEntity.numberOfRooms,
            })
            : undefined;
        const addressProps = address_value_object_1.AddressVO.isNotEmpty({
            country: ormEntity.country,
            city: ormEntity.city,
            region: ormEntity.region,
            street: ormEntity.street,
            houseNumber: ormEntity.houseNumber,
            geoPoint: {
                lat: ormEntity.lat,
                lng: ormEntity.lng,
            },
            timezone: ormEntity.timezone,
        });
        const address = addressProps ? address_value_object_1.AddressVO.create(addressProps) : undefined;
        const media = (ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.media) ? new media_value_object_1.MediaVO(ormEntity.media) : undefined;
        const description = (ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.description) ? apartment_ad_description_value_object_1.ApartmentAdDescriptionVO.create(ormEntity.description) : undefined;
        const rules = (ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.rules) ? apartment_rules_value_object_1.ApartmentRulesVO.create(ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.rules) : undefined;
        const characteristics = (ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.characteristics)
            ? apartment_characteristics_value_object_1.ApartmentAdCharacteristicsVO.create(ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.characteristics)
            : undefined;
        const paymentMethod = (ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.defaultPaymentMethod) && (ormEntity === null || ormEntity === void 0 ? void 0 : ormEntity.innopayCardId)
            ? new payment_method_value_object_1.PaymentMethodVO({ defaultType: ormEntity.defaultPaymentMethod, innopayCardId: ormEntity.innopayCardId })
            : undefined;
        const props = {
            landlordId,
            completeStep: ormEntity.completeStep,
            legalCapacity: legal_capacity_value_object_1.LegalCapacityVO.create({
                type: ormEntity.legalCapacityType,
                tinBin: ormEntity.legalCapacityTinBin,
                companyName: ormEntity.legalCapacityCompanyName,
                address: ormEntity.legalCapacityAddress,
            }),
            rentPeriodType: rent_period_type_value_object_1.RentPeriodTypeVO.create(ormEntity.rentPeriodType),
            apartmentCategory: apartment_category_value_objects_1.ApartmentCategoryVO.create(ormEntity.apartmentCategory),
            apartmentType: apartment_type_value_object_1.ApartmentTypeVO.create(ormEntity.apartmentType),
            shortTermRent,
            longTermRent,
            details,
            address,
            media,
            description,
            rules,
            characteristics,
            paymentMethod,
            longTermRentAdIsRented: !!concludedLongTermRentContract,
            isUserIdentityApproved,
        };
        return { id, props };
    }
}
exports.ApartmentAdOrmMapper = ApartmentAdOrmMapper;
//# sourceMappingURL=apartment-ad.orm-mapper.js.map