import type { Knex } from 'knex';

const tableName = 'innopay_cards';

export async function up(knex: Knex) {
  const types = ['CHARGE_OFF', 'CREDITING'];

  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.integer('cnpCardId').notNullable();
    t.string('panMasked', 4).notNullable();
    t.string('cardHolder').notNullable();
    t.string('sinkNode', 50).notNullable();
    t.string('cardType', 25).notNullable();
    t.enum('appointmentType', types).notNullable().defaultTo(types[0]);
    t.uuid('innopayId')
      .notNullable()
      .references('id')
      .inTable('innopay_users')
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
