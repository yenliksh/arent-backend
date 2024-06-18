import type { Knex } from 'knex';

const tableNames = ['chats', 'chat_members'];

export async function up(knex: Knex) {
  const chatLastMessageId = knex.schema.alterTable(tableNames[0], (t) => {
    t.uuid('lastMessageId')
      .index()
      .unique()
      .references('id')
      .inTable('messages')
      .onUpdate('cascade')
      .onDelete('set null');

    t.uuid('lastOfferMessageId')
      .unique()
      .references('id')
      .inTable('messages')
      .onUpdate('cascade')
      .onDelete('set null');
  });

  const chatMembersLastReadMessageId = knex.schema.alterTable(tableNames[1], (t) => {
    t.uuid('lastReadMessageId')
    .index()
    .references('id')
    .inTable('messages')
    .onUpdate('cascade')
    .onDelete('restrict');
  });

  return Promise.all([chatLastMessageId, chatMembersLastReadMessageId]);
}

export async function down(knex: Knex) {
  const removeChatLastMessageId = knex.schema.alterTable(tableNames[0], (t) => {
    t.dropColumn('lastMessageId');
    t.dropColumn('lastOfferMessageId');
  });

  const removeChatMembersLastReadMessageId = knex.schema.alterTable(tableNames[1], (t) => {
    t.dropColumn('lastReadMessageId');
  });

  return Promise.all([removeChatLastMessageId, removeChatMembersLastReadMessageId]);
}