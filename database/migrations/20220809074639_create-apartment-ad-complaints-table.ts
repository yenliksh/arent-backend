import type { Knex } from 'knex';

const tableName = 'apartment_ad_complaints';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.uuid('userId').index().references('id').inTable('users').onUpdate('cascade').onDelete('cascade');
    t.uuid('apartmentAdId').index().references('id').inTable('apartment_ads').onUpdate('cascade').onDelete('cascade');
    t.specificType('type', 'varchar[]').notNullable();
    t.text('reason').nullable();
    t.boolean('isViewed').defaultTo(false);

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
