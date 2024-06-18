"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
        migrations: {
            directory: './database/migrations',
            stub: './database/migration.stub',
        },
        seeds: {
            directory: './database/seeds',
            stub: './database/seed.stub',
        },
    },
    staging: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
        migrations: {
            directory: './database/migrations',
            stub: './database/migration.stub',
        },
        seeds: {
            directory: './database/seeds',
            stub: './database/seed.stub',
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
        migrations: {
            directory: './database/migrations',
            stub: './database/migration.stub',
        },
        seeds: {
            directory: './database/seeds',
            stub: './database/seed.stub',
        },
    },
};
module.exports = config;
//# sourceMappingURL=knexfile.js.map