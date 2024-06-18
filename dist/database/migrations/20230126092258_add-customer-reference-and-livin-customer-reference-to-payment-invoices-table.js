"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'payment_invoices';
async function up(knex) {
    await knex.schema.alterTable(tableName, (t) => {
        t.string('customerReference').defaultTo(' ').notNullable();
        t.string('livinCustomerReference');
    });
    return knex.schema.alterTable(tableName, (t) => {
        t.string('customerReference').alter();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable(tableName, (t) => {
        t.dropColumn('customerReference');
        t.dropColumn('livinCustomerReference');
    });
}
exports.down = down;
//# sourceMappingURL=20230126092258_add-customer-reference-and-livin-customer-reference-to-payment-invoices-table.js.map