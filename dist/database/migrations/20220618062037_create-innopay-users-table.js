"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'innopay_users';
async function up(knex) {
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.integer('cnpUserId').notNullable().unique();
        t.boolean('isCrediting').notNullable().defaultTo(false);
        t.uuid('userId')
            .notNullable()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade');
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
//# sourceMappingURL=20220618062037_create-innopay-users-table.js.map