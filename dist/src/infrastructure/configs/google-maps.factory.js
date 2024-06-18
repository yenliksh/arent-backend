"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleMapsFactory = void 0;
const config_1 = require("@nestjs/config");
exports.googleMapsFactory = {
    useFactory: (configService) => {
        return {
            key: configService.get('googleMaps.apiKey'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=google-maps.factory.js.map