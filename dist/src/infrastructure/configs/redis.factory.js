"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfigFactory = void 0;
const config_1 = require("@nestjs/config");
exports.redisConfigFactory = {
    useFactory: (configService) => {
        return {
            port: configService.get('redis.common.port'),
            host: configService.get('redis.common.host'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=redis.factory.js.map