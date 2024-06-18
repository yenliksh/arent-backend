"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snsFactory = void 0;
const config_1 = require("@nestjs/config");
exports.snsFactory = {
    useFactory: (configService) => {
        return {
            accessKeyId: configService.get('sns.accessKey'),
            secretAccessKey: configService.get('sns.secretAccessKey'),
            region: configService.get('sns.region'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=sns.factory.js.map