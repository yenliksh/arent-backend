import type { Knex } from 'knex';

const tableName = 'chats';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.uuid('contractId')
      .index()
      .unique()
      .notNullable()
      .references('id')
      .inTable('contracts')
      .onUpdate('cascade')
      .onDelete('cascade');

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
