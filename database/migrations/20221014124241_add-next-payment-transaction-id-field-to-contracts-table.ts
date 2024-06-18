import type { Knex } from 'knex';

const tableName = 'contracts';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.uuid('nextPaymentTransactionId')
      .unique()
      .references('id')
      .inTable('payment_transactions')
      .onUpdate('cascade')
      .onDelete('set null');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('nextPaymentTransactionId');
  });
}
