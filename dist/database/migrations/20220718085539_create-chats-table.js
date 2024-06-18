"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'chats';
async function up(knex) {
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.uuid('contractId')
            .index()
            .unique()
            .notNullable()
            .references('id')
            .inTable('contracts')
            .onUpdate('cascade')
            .onDelete('cascade');
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
//# sourceMappingURL=20220718085539_create-chats-table.js.map