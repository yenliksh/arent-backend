import type { Knex } from 'knex';

const tableName = 'payment_invoices';

export async function up(knex: Knex) {
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

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
