import type { Knex } from 'knex';

const tableName = 'innopay_users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.integer('cnpUserId').notNullable().unique();
    t.boolean('isCrediting').notNullable().defaultTo(false);
    t.uuid('userId')
      .notNullable()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
