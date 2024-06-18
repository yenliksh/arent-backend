"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisPubSubConfigFactory = void 0;
const config_1 = require("@nestjs/config");
exports.redisPubSubConfigFactory = {
    useFactory: (configService) => {
        return {
            port: configService.get('redis.pubSub.port'),
            host: configService.get('redis.pubSub.host'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=redis-pub-sub-config.factory.js.map