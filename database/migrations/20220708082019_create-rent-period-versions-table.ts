import type { Knex } from 'knex';

const tableName = 'rent_period_versions';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();

    t.integer('version').index().unique().notNullable();

    t.specificType('shortTermRentMonth', 'integer[]').notNullable();
    t.specificType('middleTermRentMonth', 'integer[]').notNullable();
    t.specificType('longTermRentMonth', 'integer[]').notNullable();

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  }).then(() => knex.insert({
    version: 1,
    shortTermRentMonth: [0, 1],
    middleTermRentMonth: [1, 3],
    longTermRentMonth: [11],
  }).into(tableName));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
