"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesFactory = void 0;
const config_1 = require("@nestjs/config");
exports.sesFactory = {
    useFactory: (configService) => {
        return {
            accessKeyId: configService.get('ses.accessKey'),
            secretAccessKey: configService.get('ses.secretAccessKey'),
            region: configService.get('ses.region'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=ses.factory.js.map