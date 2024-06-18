import type { Knex } from 'knex';

const tableName = 'short_term_rent_locked_dates';

export async function up(knex: Knex) {
  await knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.uuid('shortTermRentId')
      .index()
      .references('id')
      .inTable('short_term_rents')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.string('startDate', 16);
    t.string('endDate', 16);

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
