"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Factory = void 0;
const config_1 = require("@nestjs/config");
exports.s3Factory = {
    useFactory: (configService) => {
        return {
            region: configService.get('s3.region'),
            accessKeyId: configService.get('aws.accessKey'),
            secretAccessKey: configService.get('aws.secretAccessKey'),
            publicBucket: configService.get('s3.publicBucket'),
            privateBucket: configService.get('s3.privateBucket'),
            putActionExpiresSec: configService.get('s3.putActionExpiresSec'),
            getActionExpiresSec: configService.get('s3.getActionExpiresSec'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=s3.factory.js.map