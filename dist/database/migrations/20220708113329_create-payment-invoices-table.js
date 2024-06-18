"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'payment_invoices';
async function up(knex) {
    const invoiceStatus = ['SUCCESS', 'FAILURE'];
    const invoiceTypes = ['RECEIVING', 'WITHDRAW'];
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.uuid('paymentTransactionId')
            .notNullable()
            .references('id')
            .inTable('payment_transactions')
            .onUpdate('cascade')
            .onDelete('cascade');
        t.timestamp('date').notNullable();
        t.enum('status', invoiceStatus).notNullable();
        t.enum('type', invoiceTypes).notNullable().defaultTo(invoiceTypes[0]);
        t.json('cardMeta').notNullable();
        t.uuid('refersToUserId').references('id').inTable('users').onUpdate('cascade').onDelete('set null');
        t.string('error');
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
//# sourceMappingURL=20220708113329_create-payment-invoices-table.js.map