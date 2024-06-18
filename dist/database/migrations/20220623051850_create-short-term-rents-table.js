"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'short_term_rents';
async function up(knex) {
    const currencyTypes = ['KZT', 'USD', 'RUB'];
    const rentBookingType = ['REQUEST', 'INSTANT'];
    const cancellationPolicy = ['FLEXIBLE', 'MODERATE', 'INFLEXIBLE', 'STRICT'];
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.bigint('cost').unsigned().notNullable();
        t.enum('currency', currencyTypes).defaultTo(currencyTypes[0]).notNullable();
        t.specificType('status', 'varchar[]').defaultTo("{'DRAFT'}").notNullable();
        t.text('declineReason');
        t.boolean('isApproved').defaultTo(false);
        t.integer('bookingAccessInMonths').defaultTo(3);
        t.uuid('apartmentAdId')
            .unique()
            .index()
            .references('id')
            .inTable('apartment_ads')
            .onDelete('cascade')
            .onUpdate('cascade')
            .notNullable();
        t.enum('rentBookingType', rentBookingType).defaultTo(rentBookingType[0]).notNullable();
        t.enum('cancellationPolicy', cancellationPolicy);
        t.string('arrivalTime');
        t.string('departureTime');
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
//# sourceMappingURL=20220623051850_create-short-term-rents-table.js.map