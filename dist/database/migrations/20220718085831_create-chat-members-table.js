"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'chat_members';
async function up(knex) {
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
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable(tableName);
}
exports.down = down;
//# sourceMappingURL=20220718085831_create-chat-members-table.js.map