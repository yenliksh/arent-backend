"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'temporary_payment_transactions';
async function up(knex) {
    const currencyTypes = ['KZT', 'USD', 'RUB'];
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.uuid('contractId')
            .index()
            .notNullable()
            .references('id')
            .inTable('contracts')
            .onDelete('cascade')
            .onUpdate('cascade');
        t.bigint('totalAmountPayable').unsigned().notNullable();
        t.bigint('totalAmountToBeTransferred').unsigned().notNullable();
        t.bigint('totalRevenue').unsigned().notNullable();
        t.bigint('cost').unsigned().notNullable();
        t.bigint('taxAmount').unsigned().notNullable();
        t.float('recipientTaxRate').notNullable();
        t.float('senderTaxRate').notNullable();
        t.timestamp('withdrawFundsDate').notNullable();
        t.timestamp('startDate').notNullable();
        t.timestamp('endDate').notNullable();
        t.integer('rentDays').notNullable();
        t.enum('currency', currencyTypes).defaultTo(currencyTypes[0]).notNullable();
        t.boolean('isFirst').notNullable().defaultTo(false);
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
//# sourceMappingURL=20221220075106_create-temporary-payment-transactions-table.js.map