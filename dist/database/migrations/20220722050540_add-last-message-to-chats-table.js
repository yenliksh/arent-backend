"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableNames = ['chats', 'chat_members'];
async function up(knex) {
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
exports.up = up;
async function down(knex) {
    const removeChatLastMessageId = knex.schema.alterTable(tableNames[0], (t) => {
        t.dropColumn('lastMessageId');
        t.dropColumn('lastOfferMessageId');
    });
    const removeChatMembersLastReadMessageId = knex.schema.alterTable(tableNames[1], (t) => {
        t.dropColumn('lastReadMessageId');
    });
    return Promise.all([removeChatLastMessageId, removeChatMembersLastReadMessageId]);
}
exports.down = down;
//# sourceMappingURL=20220722050540_add-last-message-to-chats-table.js.map