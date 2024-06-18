"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectionClientFactory = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
const objection_1 = require("objection");
const pg = require("pg");
pg.types.setTypeParser(20, 'text', parseInt);
const OBJECTION_CLIENT_PROVIDER_NAME = 'OBJECTION_CLIENT_PROVIDER_NAME';
exports.ObjectionClientFactory = {
    provide: OBJECTION_CLIENT_PROVIDER_NAME,
    useFactory: (configService) => {
        const knex = (0, knex_1.default)({
            client: 'pg',
            debug: configService.get('nodeEnv') === 'development',
            connection: {
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                user: configService.get('database.user'),
                password: configService.get('database.password'),
                database: configService.get('database.dbName'),
            },
        });
        const logger = new common_1.Logger('ObjectionFactoryInit');
        knex
            .raw('SELECT 1')
            .debug(false)
            .then(() => {
            logger.log('PostgreSQL connected');
        })
            .catch((e) => {
            logger.error('PostgreSQL not connected');
            logger.error(e);
        });
        objection_1.Model.knex(knex);
        return knex;
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=objection-client.factory.js.map