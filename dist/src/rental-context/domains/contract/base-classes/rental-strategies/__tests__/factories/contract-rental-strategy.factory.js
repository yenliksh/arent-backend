"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRentalStrategyFactory = void 0;
const apartment_guests_value_object_1 = require("../../../../../../domain-value-objects/apartment-guests.value-object");
const apartment_rules_value_object_1 = require("../../../../../../domain-value-objects/apartment-rules.value-object");
const cancellation_policy_value_object_1 = require("../../../../../../domain-value-objects/cancellation-policy.value-object");
const contract_status_value_object_1 = require("../../../../../../domain-value-objects/contract-status.value-object");
const cost_and_currency_value_object_1 = require("../../../../../../domain-value-objects/cost-and-currency.value-object");
const rent_booking_type_value_object_1 = require("../../../../../../domain-value-objects/rent-booking-type.value-object");
const short_term_rent_payment_type_value_object_1 = require("../../../../../../domain-value-objects/short-term-rent-payment-type.value-object");
const contract_entity_1 = require("../../../../domain/entities/contract.entity");
const base_contract_apartment_ad_data_value_object_1 = require("../../../../domain/value-objects/base-contract-apartment-ad-data.value-object");
const contract_details_value_object_1 = require("../../../../domain/value-objects/contract-details.value-object");
const rent_period_version_entity_1 = require("../../../../../rent-period-version/domain/rent-period-version.entity");
const enums_1 = require("../../../../../../../infrastructure/enums");
const date_time_iso_tz_value_object_1 = require("../../../../../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const date_value_object_1 = require("../../../../../../../libs/ddd/domain/value-objects/date.value-object");
const uuid_value_object_1 = require("../../../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const date_util_1 = require("../../../../../../../libs/utils/date-util");
const contractRentalStrategyFactory = ({ arrivalDate = '2022-10-20T16:00:00.000Z', departureDate = '2022-10-25T14:00:00.000Z', cost = 5000000, rentType = enums_1.ApartmentRentPeriodType.SHORT_TERM, shortTermRentPaymentTypeInput = enums_1.ShortTermRentPaymentType.FULL, shortTermRentCancelationPolicyType = enums_1.ShortTermRentCancellationPolicyType.FLEXIBLE, withFine = false, }) => {
    const cancellationPolicy = rentType === enums_1.ApartmentRentPeriodType.SHORT_TERM
        ? cancellation_policy_value_object_1.CancellationPolicyVO.create(rentType, {
            shortTermCancellationPolicy: shortTermRentCancelationPolicyType,
        })
        : cancellation_policy_value_object_1.CancellationPolicyVO.create(rentType, {
            longTermCancellationPolicy: enums_1.LongTermRentCancellationPolicyType.FORFEIT,
        });
    const shortTermRentBookingType = rentType === enums_1.ApartmentRentPeriodType.SHORT_TERM
        ? rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(enums_1.ShortTermRentBookingType.REQUEST)
        : undefined;
    const shortTermRentPaymentType = rentType === enums_1.ApartmentRentPeriodType.SHORT_TERM
        ? short_term_rent_payment_type_value_object_1.ShortTermRentPaymentTypeVO.create(shortTermRentPaymentTypeInput !== null && shortTermRentPaymentTypeInput !== void 0 ? shortTermRentPaymentTypeInput : enums_1.ShortTermRentPaymentType.FULL)
        : undefined;
    const contract = new contract_entity_1.ContractEntity({
        id: uuid_value_object_1.UUID.generate(),
        props: {
            contractRequestId: uuid_value_object_1.UUID.generate(),
            apartmentAdId: uuid_value_object_1.UUID.generate(),
            apartmentRentPeriodType: rentType,
            details: new contract_details_value_object_1.ContractDetailsVO({
                arrivalDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(date_util_1.DateUtil.parse(arrivalDate).toISOString()),
                departureDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(date_util_1.DateUtil.parse(departureDate).toISOString()),
                rules: apartment_rules_value_object_1.ApartmentRulesVO.create({
                    allowedWithPets: true,
                    allowedWithChildren: true,
                    allowedToSmoke: true,
                    allowedToHangingOut: true,
                }),
            }),
            isExistUnpaidTransactions: true,
            isPending: false,
            isFined: withFine,
            isTemporary: false,
            landlordId: uuid_value_object_1.UUID.generate(),
            status: contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.CREATED),
            tenantId: uuid_value_object_1.UUID.generate(),
            costAndCurrency: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost }),
            cancellationPolicy,
            shortTermRentBookingType,
            shortTermRentPaymentType,
            paymentData: null,
            baseContractApartmentAdData: new base_contract_apartment_ad_data_value_object_1.BaseContractApartmentAdDataVO({
                title: 'Cool apartment',
                address: {
                    city: 'Алма-Ата',
                    country: 'KZ',
                    street: 'Веселая',
                    houseNumber: '600',
                    geoPoint: {
                        lat: 43.2178,
                        lng: 76.9022,
                    },
                },
            }),
            guests: new apartment_guests_value_object_1.ApartmentGuestsVO({
                numberOfAdult: 1,
                numberOfChildren: 0,
                numberOfPets: 2,
            }),
            rentPeriodVersion: new rent_period_version_entity_1.RentPeriodVersionEntity({
                id: uuid_value_object_1.UUID.generate(),
                props: {
                    version: 1,
                    shortTermRentMonth: [0, 1],
                    middleTermRentMonth: [1, 3],
                    longTermRentMonth: [11],
                },
                createdAt: date_value_object_1.DateVO.now(),
                updatedAt: date_value_object_1.DateVO.now(),
                deletedAt: undefined,
            }),
        },
        createdAt: date_value_object_1.DateVO.now(),
        updatedAt: date_value_object_1.DateVO.now(),
        deletedAt: undefined,
    });
    return contract;
};
exports.contractRentalStrategyFactory = contractRentalStrategyFactory;
//# sourceMappingURL=contract-rental-strategy.factory.js.map