"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'short_term_rent_locked_dates';
async function up(knex) {
    await knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.uuid('shortTermRentId')
            .index()
            .references('id')
            .inTable('short_term_rents')
            .onUpdate('cascade')
            .onDelete('cascade');
        t.string('startDate', 16);
        t.string('endDate', 16);
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
//# sourceMappingURL=20220815053144_create-locked-dates-table.js.map