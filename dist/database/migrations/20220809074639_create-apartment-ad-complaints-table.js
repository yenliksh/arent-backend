"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'apartment_ad_complaints';
async function up(knex) {
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.uuid('userId').index().references('id').inTable('users').onUpdate('cascade').onDelete('cascade');
        t.uuid('apartmentAdId').index().references('id').inTable('apartment_ads').onUpdate('cascade').onDelete('cascade');
        t.specificType('type', 'varchar[]').notNullable();
        t.text('reason').nullable();
        t.boolean('isViewed').defaultTo(false);
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
//# sourceMappingURL=20220809074639_create-apartment-ad-complaints-table.js.map