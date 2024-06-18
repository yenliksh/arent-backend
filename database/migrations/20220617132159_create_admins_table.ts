import type { Knex } from 'knex';

const tableName = 'admins';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.string('firstName', 320).notNullable();
    t.string('lastName', 320).notNullable();
    t.string('login', 32).notNullable().unique().index();
    t.string('password', 64).notNullable();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
