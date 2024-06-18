import type { Knex } from 'knex';

const tableName = 'contract_cancelations';

export async function up(knex: Knex) {
  const currencyTypes = ['KZT', 'USD', 'RUB'];

  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();

    t.uuid('contractId')
      .index()
      .notNullable()
      .references('id')
      .inTable('contracts')
      .onDelete('cascade')
      .onUpdate('cascade');

    t.uuid('triggerUserId')
      .references('id')
      .inTable('users')
      .onDelete('set null')
      .onUpdate('cascade');

    t.string('cancelationDate').notNullable();
    t.string('checkOutDate').notNullable();

    t.bigint('refundsAmountToSenderCost').unsigned().notNullable();
    t.enum('refundsAmountToSenderCurrency', currencyTypes).notNullable();

    t.bigint('transferAmountToRecipientCost').unsigned().notNullable();
    t.enum('transferAmountToRecipientCurrency', currencyTypes).notNullable();

    t.bigint('transferAmountToPlatformCost').unsigned().notNullable();
    t.enum('transferAmountToPlatformCurrency', currencyTypes).notNullable();

    t.bigint('withdrawalAmountFromSenderCost').unsigned().notNullable();
    t.enum('withdrawalAmountFromSenderCurrency', currencyTypes).notNullable();

    t.bigint('withdrawalAmountFromRecipientCost').unsigned().notNullable();
    t.enum('withdrawalAmountFromRecipientCurrency', currencyTypes).notNullable();

    t.boolean('isFine').notNullable();

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
