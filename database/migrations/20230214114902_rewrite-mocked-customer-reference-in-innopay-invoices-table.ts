import type { Knex } from 'knex';

const tableName = 'payment_invoices';

export async function up(knex: Knex) {
  return knex.schema.raw(`UPDATE ${tableName} SET "customerReference" = '1' WHERE "customerReference" = ' '`);
}

export async function down(knex: Knex) {
  return knex.schema.raw(`UPDATE ${tableName} SET "customerReference" = ' ' WHERE "customerReference" = '1'`);
}
