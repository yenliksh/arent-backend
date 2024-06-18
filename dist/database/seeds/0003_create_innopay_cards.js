"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const types_1 = require("../../src/rental-context/domains/innopay-card/domain/types");
const faker_1 = require("@faker-js/faker");
const innopay_card_orm_entity_1 = require("../../src/infrastructure/database/entities/innopay-card.orm-entity");
const innopay_users_orm_entity_1 = require("../../src/infrastructure/database/entities/innopay-users.orm-entity");
const user_orm_entity_1 = require("../../src/infrastructure/database/entities/user.orm-entity");
const uuid_1 = require("uuid");
async function seed(knex) {
    const isProd = process.env.NODE_ENV === 'production';
    const recordsCount = await knex(innopay_users_orm_entity_1.InnopayUsersOrmEntity.tableName).count();
    if (isProd || recordsCount[0].count !== '0') {
        return;
    }
    faker_1.faker.setLocale('ru');
    const phoneNumbers = new Array(10).fill(undefined).map((_, index) => `+79${index > 9 ? index : '0' + index}5553535`);
    const userIds = await user_orm_entity_1.UserOrmEntity.query(knex).select('id', 'firstName', 'lastName').whereIn('phone', phoneNumbers);
    const innopayUsers = await Promise.all(userIds.map(({ id: userId }) => {
        return {
            id: (0, uuid_1.v4)(),
            userId,
            cnpUserId: faker_1.faker.datatype.number({
                min: 10000,
                max: 99999,
            }),
            isCrediting: true,
            updatedAt: new Date(),
            createdAt: new Date(),
        };
    }));
    const innopayCards = await Promise.all(innopayUsers.map(({ id: innopayId, userId }) => {
        const user = userIds.find((i) => i.id === userId);
        return {
            id: (0, uuid_1.v4)(),
            innopayId,
            cnpCardId: faker_1.faker.datatype.number({
                min: 10000,
                max: 99999,
            }),
            cardType: types_1.InnopayCardType.VISA,
            appointmentType: types_1.InnopayAppointmentCardType.CREDITING,
            panMasked: faker_1.faker.datatype
                .number({
                min: 1000,
                max: 9999,
            })
                .toString(),
            cardHolder: user ? `${user.firstName} ${user.lastName}` : `${faker_1.faker.name.findName} ${faker_1.faker.name.lastName}`,
            updatedAt: new Date(),
            createdAt: new Date(),
        };
    }));
    await knex(innopay_users_orm_entity_1.InnopayUsersOrmEntity.tableName).insert(innopayUsers);
    return knex(innopay_card_orm_entity_1.InnopayCardOrmEntity.tableName).insert(innopayCards);
}
exports.seed = seed;
//# sourceMappingURL=0003_create_innopay_cards.js.map