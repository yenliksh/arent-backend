"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'admins';
async function up(knex) {
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.string('firstName', 320).notNullable();
        t.string('lastName', 320).notNullable();
        t.string('login', 32).notNullable().unique().index();
        t.string('password', 64).notNullable();
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
        t.timestamp('deletedAt');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable(tableName);
}
exports.down = down;
//# sourceMappingURL=20220617132159_create_admins_table.js.map