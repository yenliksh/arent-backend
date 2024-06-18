"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqsFactory = void 0;
const constants_1 = require("../../modules/aws/sqs/constants");
const config_1 = require("@nestjs/config");
exports.sqsFactory = {
    useFactory: (configService) => {
        return {
            accessKeyId: configService.get('sqs.accessKey'),
            secretAccessKey: configService.get('sqs.secretAccessKey'),
            region: configService.get('sqs.region'),
            queuesNames: constants_1.SQS_QUEUES_NAMES,
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=sqs.factory.js.map