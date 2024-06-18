"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "btree_gist"');
}
exports.up = up;
async function down(knex) {
    return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
exports.down = down;
//# sourceMappingURL=20220610095634_init.js.map