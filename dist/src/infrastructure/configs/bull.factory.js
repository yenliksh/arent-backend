"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bullConfigFactory = void 0;
const config_1 = require("@nestjs/config");
exports.bullConfigFactory = {
    useFactory: (configService) => {
        return {
            redis: {
                port: configService.get('redis.common.port'),
                host: configService.get('redis.common.host'),
            },
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=bull.factory.js.map