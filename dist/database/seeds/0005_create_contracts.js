"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const types_1 = require("../../src/rental-context/domains/apartment-ad/domain/types");
const types_2 = require("../../src/rental-context/domains/chat/domain/types");
const types_3 = require("../../src/rental-context/domains/contract-request/domain/types");
const faker_1 = require("@faker-js/faker");
const apartment_ad_orm_entity_1 = require("../../src/infrastructure/database/entities/apartment-ad.orm-entity");
const chat_member_orm_entity_1 = require("../../src/infrastructure/database/entities/chat-member.orm-entity");
const chat_orm_entity_1 = require("../../src/infrastructure/database/entities/chat.orm-entity");
const contract_request_orm_entity_1 = require("../../src/infrastructure/database/entities/contract-request.orm-entity");
const contract_orm_entity_1 = require("../../src/infrastructure/database/entities/contract.orm-entity");
const rent_period_version_orm_entity_1 = require("../../src/infrastructure/database/entities/rent-period-version.orm-entity");
const user_orm_entity_1 = require("../../src/infrastructure/database/entities/user.orm-entity");
const enums_1 = require("../../src/infrastructure/enums");
const uuid_1 = require("uuid");
const newRecordsCount = 20;
async function seed(knex) {
    return;
    const recordsCount = await knex(contract_request_orm_entity_1.ContractRequestOrmEntity.tableName).count();
    if (recordsCount[0].count !== '0') {
        return;
    }
    faker_1.faker.setLocale('ru');
    const contractRequests = await createContractRequests(knex);
    await knex(contract_request_orm_entity_1.ContractRequestOrmEntity.tableName).insert(contractRequests);
    const contracts = await createContracts(knex, contractRequests.filter((cr) => cr.status === types_3.ContractRequestStatus.ACCEPTED));
    await knex(contract_orm_entity_1.ContractOrmEntity.tableName).insert(contracts);
    const chats = (await createChats(knex, contracts)).filter((chat) => chat !== undefined);
    await knex(chat_orm_entity_1.ChatOrmEntity.tableName).insert(chats);
    const chatMembers = (await createChatMembers(knex, chats)).filter((member) => member !== undefined);
    return Promise.all(chatMembers.map((member) => knex(chat_member_orm_entity_1.ChatMemberOrmEntity.tableName).insert(member)));
}
exports.seed = seed;
async function createContractRequests(knex) {
    const apartmentRentPeriodTypeMapper = {
        [types_1.RentPeriodType.SHORT_TERM]: enums_1.ApartmentRentPeriodType.SHORT_TERM,
        [types_1.RentPeriodType.LONG_TERM]: enums_1.ApartmentRentPeriodType.LONG_TERM,
        [types_1.RentPeriodType.ALL]: faker_1.faker.datatype.boolean()
            ? enums_1.ApartmentRentPeriodType.SHORT_TERM
            : enums_1.ApartmentRentPeriodType.LONG_TERM,
    };
    const apartmentAds = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(knex)
        .select('id', 'landlordId', 'rentPeriodType')
        .limit(newRecordsCount);
    const tenants = await user_orm_entity_1.UserOrmEntity.query(knex)
        .select('id')
        .whereNotIn('id', apartmentAds.map((apartmentAd) => apartmentAd.landlordId))
        .limit(newRecordsCount);
    const rentPeriodVersion = await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query(knex)
        .select('id')
        .orderBy([{ column: 'version', order: 'DESC' }])
        .limit(1);
    return Promise.all(new Array(newRecordsCount).fill(undefined).map((_, index) => {
        const { id: apartmentAdId, rentPeriodType } = apartmentAds[index];
        const { id: tenantId } = tenants[index];
        const apartmentRentPeriodType = apartmentRentPeriodTypeMapper[rentPeriodType];
        const arrivalDate = new Date(faker_1.faker.date.soon(60).toISOString().slice(0, 10));
        const departureDate = new Date(faker_1.faker.date.soon(60, arrivalDate).toISOString().slice(0, 10));
        return {
            id: (0, uuid_1.v4)(),
            apartmentAdId: apartmentAdId,
            tenantId,
            rentPeriodVersionId: rentPeriodVersion[0].id,
            apartmentRentPeriodType,
            status: index < newRecordsCount / 2 ? types_3.ContractRequestStatus.CREATED : types_3.ContractRequestStatus.ACCEPTED,
            comment: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM && faker_1.faker.datatype.boolean()
                ? faker_1.faker.random.words(faker_1.faker.datatype.number(15))
                : undefined,
            arrivalDate: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM ? arrivalDate : undefined,
            departureDate: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM ? departureDate : undefined,
            guests: {
                numberOfAdult: faker_1.faker.datatype.number({ min: 1, max: 5 }),
                numberOfChildren: faker_1.faker.datatype.number({ min: 1, max: 5 }),
                numberOfPets: faker_1.faker.datatype.number({ min: 1, max: 5 }),
            },
            rentBookingType: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM ? enums_1.ShortTermRentBookingType.REQUEST : undefined,
            rentPaymentType: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM ? enums_1.ShortTermRentPaymentType.FULL : undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }));
}
async function createContracts(knex, contractRequests) {
    const apartmentAdIds = contractRequests
        .map((cr) => cr.apartmentAdId)
        .filter((ad) => ad !== undefined);
    const apartmentAds = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(knex)
        .findByIds(apartmentAdIds)
        .withGraphFetched({ landlord: true, shortTermRent: true, longTermRent: true });
    return contractRequests.map((contractRequest) => {
        var _a, _b, _c, _d, _e, _f;
        const { id: contractRequestId, apartmentRentPeriodType, rentPeriodVersionId, apartmentAdId, tenantId, arrivalDate, departureDate, } = contractRequest;
        const apartmentAd = apartmentAds.find((ad) => ad.id === apartmentAdId);
        const [lat, lng] = faker_1.faker.address.nearbyGPSCoordinate([43.222, 76.8512]);
        return {
            id: (0, uuid_1.v4)(),
            contractRequestId,
            apartmentRentPeriodType,
            rentPeriodVersionId,
            status: enums_1.ContractStatus.CREATED,
            arrivalDate: arrivalDate ? new Date(arrivalDate) : undefined,
            departureDate: departureDate ? new Date(departureDate) : undefined,
            shortTermCancellationPolicy: (_a = apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.shortTermRent) === null || _a === void 0 ? void 0 : _a.cancellationPolicy,
            longTermCancellationPolicy: (_b = apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.longTermRent) === null || _b === void 0 ? void 0 : _b.cancellationPolicy,
            isPending: false,
            isFined: false,
            isTemporary: false,
            cost: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM
                ? (_d = (_c = apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.shortTermRent) === null || _c === void 0 ? void 0 : _c.cost) !== null && _d !== void 0 ? _d : 500000
                : (_f = (_e = apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.longTermRent) === null || _e === void 0 ? void 0 : _e.cost) !== null && _f !== void 0 ? _f : 5000000,
            currency: types_1.CurrencyType.KZT,
            baseApartmentAdData: {
                title: faker_1.faker.random.words(4),
                address: {
                    country: 'KZ',
                    city: 'Алма-Ата',
                    street: faker_1.faker.address.streetName(),
                    houseNumber: faker_1.faker.address.buildingNumber(),
                    geoPoint: {
                        lat: Number(lat),
                        lng: Number(lng),
                    },
                },
            },
            guests: {
                numberOfAdult: 1,
                numberOfChildren: 1,
                numberOfPets: 1,
            },
            apartmentAdId,
            tenantId,
            landlordId: apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.landlordId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });
}
async function createChats(knex, contracts) {
    return contracts.map((contract) => {
        if (!contract.tenantId || !contract.landlordId) {
            return;
        }
        const chatId = (0, uuid_1.v4)();
        return {
            id: chatId,
            contractId: contract.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });
}
async function createChatMembers(knex, chats) {
    const contracts = await contract_orm_entity_1.ContractOrmEntity.query(knex).findByIds(chats.map((chat) => chat.contractId));
    return chats.map((chat) => {
        const contract = contracts.find((contract) => contract.id === chat.contractId);
        if (!contract || !contract.tenantId || !contract.landlordId)
            return;
        return [
            {
                id: (0, uuid_1.v4)(),
                chatId: chat.id,
                memberId: contract.tenantId,
                role: types_2.UserChatRole.TENANT,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                chatId: chat.id,
                memberId: contract.landlordId,
                role: types_2.UserChatRole.LANDLORD,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    });
}
//# sourceMappingURL=0005_create_contracts.js.map