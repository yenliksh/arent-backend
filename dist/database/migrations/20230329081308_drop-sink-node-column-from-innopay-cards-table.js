"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'innopay_cards';
async function up(knex) {
    return knex.schema.alterTable(tableName, (t) => {
        t.dropColumn('sinkNode');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable(tableName, (t) => {
        t.string('sinkNode', 50).notNullable().defaultTo('GPE');
    });
}
exports.down = down;
//# sourceMappingURL=20230329081308_drop-sink-node-column-from-innopay-cards-table.js.map