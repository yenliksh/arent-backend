import type { Knex } from 'knex';

const tableName = 'apartment_identificator';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.increments('adSearchId');
    t.uuid('apartmentId').notNullable();
    t.string('slug');
    t.string('titleSeo');
    t.string('descriptionSeo');
    t.string('keywordsSeo');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
