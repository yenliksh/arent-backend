"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'contracts';
async function up(knex) {
    return knex.schema.alterTable(tableName, (t) => {
        t.uuid('nextPaymentTransactionId')
            .unique()
            .references('id')
            .inTable('payment_transactions')
            .onUpdate('cascade')
            .onDelete('set null');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable(tableName, (t) => {
        t.dropColumn('nextPaymentTransactionId');
    });
}
exports.down = down;
//# sourceMappingURL=20221014124241_add-next-payment-transaction-id-field-to-contracts-table.js.map