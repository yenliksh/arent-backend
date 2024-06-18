import type { Knex } from 'knex';

const tableName = 'typeorm_metadata';

export async function up(knex: Knex) {
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

export async function down(knex: Knex) {
  const drop_table_raw = `DROP TABLE "${tableName}"`;

  return knex.raw(drop_table_raw);
}
