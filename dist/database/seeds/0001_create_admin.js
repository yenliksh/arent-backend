"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const crypto = require("crypto");
const faker_1 = require("@faker-js/faker");
const entities_1 = require("../../src/modules/admin-panel/admins/entities");
async function seed(knex) {
    const password = process.env.SEED_ADMIN_PASSWORD;
    const recordsCount = await knex(entities_1.AdminTypeormEntity.tableName).count();
    if (!password || recordsCount[0].count !== '0') {
        return;
    }
    faker_1.faker.setLocale('ru');
    return knex(entities_1.AdminTypeormEntity.tableName).insert({
        firstName: faker_1.faker.name.firstName(),
        lastName: faker_1.faker.name.lastName(),
        login: 'admin.arent',
        password: crypto.createHmac('sha256', password).digest('hex'),
    });
}
exports.seed = seed;
//# sourceMappingURL=0001_create_admin.js.map