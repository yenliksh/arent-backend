import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "btree_gist"');
}

export async function down(knex: Knex) {
  return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
