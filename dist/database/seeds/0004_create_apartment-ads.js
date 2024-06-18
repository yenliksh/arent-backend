"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const types_1 = require("../../src/rental-context/domains/apartment-ad/domain/types");
const faker_1 = require("@faker-js/faker");
const apartment_ad_orm_entity_1 = require("../../src/infrastructure/database/entities/apartment-ad.orm-entity");
const innopay_card_orm_entity_1 = require("../../src/infrastructure/database/entities/innopay-card.orm-entity");
const innopay_users_orm_entity_1 = require("../../src/infrastructure/database/entities/innopay-users.orm-entity");
const long_term_rent_orm_entity_1 = require("../../src/infrastructure/database/entities/long-term-rent.orm-entity");
const short_term_rent_locked_dates_orm_entity_1 = require("../../src/infrastructure/database/entities/short-term-rent-locked-dates.orm-entity");
const short_term_rent_orm_entity_1 = require("../../src/infrastructure/database/entities/short-term-rent.orm-entity");
const user_orm_entity_1 = require("../../src/infrastructure/database/entities/user.orm-entity");
const enums_1 = require("../../src/infrastructure/enums");
const constants_1 = require("../../src/rental-context/constants");
const uuid_1 = require("uuid");
const private_images_1 = require("../mock/private_images");
const public_images_1 = require("../mock/public_images");
async function seed(knex) {
    const isProd = process.env.NODE_ENV === 'production';
    const recordsCount = await knex(apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName).count();
    if (isProd || recordsCount[0].count !== '0') {
        return;
    }
    faker_1.faker.setLocale('ru');
    const phoneNumbers = new Array(10).fill(undefined).map((_, index) => `+79${index > 9 ? index : '0' + index}5553535`);
    const userIds = await user_orm_entity_1.UserOrmEntity.query(knex).select('id').whereIn('phone', phoneNumbers);
    const apartmentsAmountPerUser = 10;
    const generateApartmentAd = async (landlordId) => {
        const rentPeriodType = Object.keys(types_1.RentPeriodType)[faker_1.faker.datatype.number({ min: 0, max: 2 })];
        const apartmentType = Object.keys(types_1.ApartmentType)[faker_1.faker.datatype.number({ min: 0, max: 6 })];
        let longTermRent = undefined;
        let shortTermRent = undefined;
        const userInnopaySubQuery = innopay_users_orm_entity_1.InnopayUsersOrmEntity.query(knex).where('userId', landlordId);
        const innopayCard = await innopay_card_orm_entity_1.InnopayCardOrmEntity.query(knex).for(userInnopaySubQuery).first();
        const apartmentAdId = (0, uuid_1.v4)();
        if (rentPeriodType === types_1.RentPeriodType.LONG_TERM || rentPeriodType === types_1.RentPeriodType.ALL) {
            const status = Object.keys(types_1.ApartmentAdStatusType)[faker_1.faker.datatype.number({ min: 1, max: 4 })];
            let isApproved = false;
            if (status === types_1.ApartmentAdStatusType.PUBLISHED || status === types_1.ApartmentAdStatusType.PAUSED) {
                isApproved = true;
            }
            longTermRent = {
                id: (0, uuid_1.v4)(),
                cost: Math.round(Number(faker_1.faker.finance.amount(constants_1.SHORT_RENT_PERIOD_MIN_COST / constants_1.MINIMAL_UNIT_FACTOR, 9999999))) *
                    constants_1.MINIMAL_UNIT_FACTOR,
                currency: types_1.CurrencyType.KZT,
                apartmentAdId,
                status: [status],
                isApproved,
                cancellationPolicy: enums_1.LongTermRentCancellationPolicyType.FORFEIT,
                ownershipDocuments: private_images_1.userIdentityDocuments,
                updatedAt: new Date(),
                createdAt: new Date(),
            };
        }
        if (rentPeriodType === types_1.RentPeriodType.SHORT_TERM || rentPeriodType === types_1.RentPeriodType.ALL) {
            const status = Object.keys(types_1.ApartmentAdStatusType)[faker_1.faker.datatype.number({ min: 1, max: 4 })];
            let isApproved = false;
            if (status === types_1.ApartmentAdStatusType.PUBLISHED || status === types_1.ApartmentAdStatusType.PAUSED) {
                isApproved = true;
            }
            const cancellationPolicy = Object.keys(enums_1.ShortTermRentCancellationPolicyType)[faker_1.faker.datatype.number({ min: 0, max: 3 })];
            const shortTermRentId = (0, uuid_1.v4)();
            const randomNumberOfAmountLockedDates = faker_1.faker.datatype.number({ min: 0, max: 1 });
            const lockedDates = new Array(randomNumberOfAmountLockedDates)
                .fill(undefined)
                .map(() => {
                return {
                    id: (0, uuid_1.v4)(),
                    updatedAt: new Date(),
                    createdAt: new Date(),
                    shortTermRentId,
                    startDate: faker_1.faker.date.between('2022-10-01', '2022-10-05').toISOString().slice(0, 10),
                    endDate: faker_1.faker.date.between('2022-10-06', '2022-10-10').toISOString().slice(0, 10),
                };
            });
            shortTermRent = {
                id: shortTermRentId,
                cost: Math.round(Number(faker_1.faker.finance.amount(constants_1.LONG_RENT_PERIOD_MIN_COST / constants_1.MINIMAL_UNIT_FACTOR, 9999999))) *
                    constants_1.MINIMAL_UNIT_FACTOR,
                currency: types_1.CurrencyType.KZT,
                apartmentAdId,
                status: [status],
                isApproved,
                lockedDates,
                bookingAccessInMonths: faker_1.faker.datatype.number({ min: 1, max: 12 }),
                updatedAt: new Date(),
                createdAt: new Date(),
                rentBookingType: enums_1.ShortTermRentBookingType.REQUEST,
                cancellationPolicy,
                arrivalTime: '12:00',
                departureTime: '10:00',
            };
        }
        const [lat, lng] = faker_1.faker.address.nearbyGPSCoordinate([43.222, 76.8512], 20, true);
        return {
            id: apartmentAdId,
            landlordId,
            rentPeriodType,
            apartmentType,
            longTermRent,
            shortTermRent,
            numberOfGuests: faker_1.faker.datatype.number({ min: 1, max: 8 }),
            numberOfRooms: faker_1.faker.datatype.number({ min: 0, max: 8 }),
            country: 'KZ',
            city: 'Алма-Ата',
            street: faker_1.faker.address.streetName(),
            houseNumber: faker_1.faker.address.buildingNumber(),
            lat: Number(lat),
            lng: Number(lng),
            timezone: 'Asia/Almaty',
            media: {
                photos: new Array(5).fill(undefined).map((_, order) => ({
                    order,
                    fileKey: public_images_1.apartmentImages[faker_1.faker.datatype.number({ min: 0, max: public_images_1.apartmentImages.length - 1 })],
                })),
                videos: [],
            },
            description: {
                name: faker_1.faker.random.words(4),
                description: faker_1.faker.random.words(30),
                remoteView: faker_1.faker.datatype.boolean(),
                selfCheckIn: faker_1.faker.datatype.boolean(),
                freeParking: faker_1.faker.datatype.boolean(),
                workSpace: faker_1.faker.datatype.boolean(),
                quite: faker_1.faker.datatype.boolean(),
                forFamily: faker_1.faker.datatype.boolean(),
            },
            rules: {
                allowedWithPets: faker_1.faker.datatype.boolean(),
                allowedWithChildren: faker_1.faker.datatype.boolean(),
                allowedToSmoke: faker_1.faker.datatype.boolean(),
                allowedToHangingOut: faker_1.faker.datatype.boolean(),
            },
            legalCapacityType: types_1.LegalCapacityType.INDIVIDUAL,
            defaultPaymentMethod: enums_1.PaymentMethod.INNOPAY,
            innopayCardId: innopayCard === null || innopayCard === void 0 ? void 0 : innopayCard.id,
            updatedAt: new Date(),
            createdAt: new Date(),
        };
    };
    const apartmentAds = await Promise.all(userIds.flatMap(({ id: landlordId }) => new Array(apartmentsAmountPerUser).fill(undefined).map(() => generateApartmentAd(landlordId))));
    await knex(apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName).insert(apartmentAds.map(({ longTermRent: _l, shortTermRent: _s, ...rest }) => rest));
    const longTermRents = apartmentAds.map((i) => i.longTermRent).filter((i) => i);
    const shortTermRents = apartmentAds
        .map((i) => {
        const { shortTermRent } = i || {};
        if (!shortTermRent) {
            return null;
        }
        const { lockedDates: _, ...rest } = shortTermRent;
        return rest;
    })
        .filter((i) => i);
    const shortTermRentsLockedDates = apartmentAds
        .flatMap((i) => { var _a; return (_a = i.shortTermRent) === null || _a === void 0 ? void 0 : _a.lockedDates; })
        .filter((i) => i);
    await knex(short_term_rent_orm_entity_1.ShortTermRentOrmEntity.tableName).insert(shortTermRents);
    await knex(long_term_rent_orm_entity_1.LongTermRentOrmEntity.tableName).insert(longTermRents);
    return knex(short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.tableName).insert(shortTermRentsLockedDates);
}
exports.seed = seed;
//# sourceMappingURL=0004_create_apartment-ads.js.map