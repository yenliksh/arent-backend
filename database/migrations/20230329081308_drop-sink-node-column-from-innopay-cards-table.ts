import type { Knex } from 'knex';

const tableName = 'innopay_cards';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('sinkNode');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('sinkNode', 50).notNullable().defaultTo('GPE');
  });
}
