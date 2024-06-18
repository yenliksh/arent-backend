import type { Knex } from 'knex';

const tableName = 'payment_invoices';

export async function up(knex: Knex) {
  await knex.schema.alterTable(tableName, (t) => {
    t.string('customerReference').defaultTo(' ').notNullable();

    t.string('livinCustomerReference');
  });

  return knex.schema.alterTable(tableName, (t) => {
    t.string('customerReference').alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('customerReference');

    t.dropColumn('livinCustomerReference');
  });
}
