"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'payment_invoices';
async function up(knex) {
    return knex.schema.raw(`UPDATE ${tableName} SET "customerReference" = '1' WHERE "customerReference" = ' '`);
}
exports.up = up;
async function down(knex) {
    return knex.schema.raw(`UPDATE ${tableName} SET "customerReference" = ' ' WHERE "customerReference" = '1'`);
}
exports.down = down;
//# sourceMappingURL=20230214114902_rewrite-mocked-customer-reference-in-innopay-invoices-table.js.map