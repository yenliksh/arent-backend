import type { Knex } from 'knex';

const tableName = 'long_term_rents';

export async function up(knex: Knex) {
  const currencyTypes = ['KZT', 'USD', 'RUB'];
  const cancellationPolicy = ['FORFEIT'];

  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.bigint('cost').unsigned().notNullable();
    t.enum('currency', currencyTypes).defaultTo(currencyTypes[0]).notNullable();
    t.specificType('status', 'varchar[]').defaultTo("{'DRAFT'}").notNullable();
    t.text('declineReason');
    t.boolean('isApproved').defaultTo(false);
    t.specificType('ownershipDocuments', 'varchar[]');

    t.uuid('apartmentAdId')
      .unique()
      .index()
      .references('id')
      .inTable('apartment_ads')
      .onDelete('cascade')
      .onUpdate('cascade')
      .notNullable();

    t.enum('cancellationPolicy', cancellationPolicy).defaultTo(cancellationPolicy[0]);

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
