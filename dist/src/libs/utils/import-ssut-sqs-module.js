"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importSsutSqsModule = void 0;
const nestjs_sqs_1 = require("@ssut/nestjs-sqs");
const AWS = require("aws-sdk");
const importSsutSqsModule = (options) => {
    AWS.config.update({
        region: process.env.SQS_AWS_REGION_NAME,
        accessKeyId: process.env.SQS_AWS_ACCESS_KEY,
        secretAccessKey: process.env.SQS_AWS_SECRET_ACCESS_KEY,
    });
    return nestjs_sqs_1.SqsModule.register(options);
};
exports.importSsutSqsModule = importSsutSqsModule;
//# sourceMappingURL=import-ssut-sqs-module.js.map