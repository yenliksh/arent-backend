"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'messages';
async function up(knex) {
    const messageType = ['TEXT', 'MEDIA', 'SYSTEM'];
    const systemMessageType = [
        'OFFER_REJECTED',
        'OFFER_REJECTED_BY_SYSTEM',
        'BOOKING_CONCLUDED',
        'BOOKING_CREATED',
        'OFFER_SENDING',
        'INSTANT_BOOKING',
        'TEMPORARY_BOOKING_REVOKE',
    ];
    const messageStatus = ['SENT', 'WAITING', 'FAILED'];
    return knex.schema.createTable(tableName, (t) => {
        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        t.uuid('chatId').index().references('id').inTable('chats').onUpdate('cascade').onDelete('cascade');
        t.uuid('senderId').references('id').inTable('users').onUpdate('cascade').onDelete('set null');
        t.enum('status', messageStatus).defaultTo(messageStatus[0]).notNullable();
        t.enum('type', messageType).notNullable();
        t.string('text', 2000);
        t.string('fileKey');
        t.string('fileName');
        t.float('fileWeight');
        t.enum('systemMessageType', systemMessageType);
        t.json('contractData');
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
        t.timestamp('deletedAt');
        t.check(`("type" = 'TEXT' AND "text" IS NOT NULL AND "fileKey" IS NULL AND "fileName" IS NULL AND "fileWeight" IS NULL and "systemMessageType" IS NULL AND "contractData" IS NULL)
      OR ("type" = 'MEDIA' AND "text" IS NULL AND "fileKey" IS NOT NULL AND "fileName" IS NOT NULL AND "fileWeight" IS NOT NULL and "systemMessageType" IS NULL AND "contractData" IS NULL)
      OR ("type" = 'SYSTEM' AND "text" IS NULL AND "fileKey" IS NULL AND "fileName" IS NULL AND "fileWeight" IS NULL AND "systemMessageType" IS NOT NULL AND "contractData" IS NOT NULL)`);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable(tableName);
}
exports.down = down;
//# sourceMappingURL=20220718113338_create-messages-table.js.map