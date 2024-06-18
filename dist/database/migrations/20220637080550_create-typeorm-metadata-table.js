"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'typeorm_metadata';
async function up(knex) {
    const create_table_raw = `
    CREATE TABLE IF NOT EXISTS "${tableName}" (
      "type" varchar(255) NOT NULL,
      "database" varchar(255) DEFAULT NULL,
      "schema" varchar(255) DEFAULT NULL,
      "table" varchar(255) DEFAULT NULL,
      "name" varchar(255) DEFAULT NULL,
      "value" text
    )`;
    return knex.raw(create_table_raw);
}
exports.up = up;
async function down(knex) {
    const drop_table_raw = `DROP TABLE "${tableName}"`;
    return knex.raw(drop_table_raw);
}
exports.down = down;
//# sourceMappingURL=20220637080550_create-typeorm-metadata-table.js.map