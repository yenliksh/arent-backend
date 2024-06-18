import type { Knex } from 'knex';

const tableName = 'chat_members';

export async function up(knex: Knex) {
  const userChatRoles = ['TENANT', 'LANDLORD'];
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.uuid('chatId')
      .index()
      .notNullable()
      .references('id')
      .inTable('chats')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.uuid('memberId')
      .index()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('cascade')
      .onDelete('cascade');

    t.enum('role', userChatRoles).notNullable();

    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.timestamp('deletedAt');

    t.unique(['chatId', 'memberId']);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
