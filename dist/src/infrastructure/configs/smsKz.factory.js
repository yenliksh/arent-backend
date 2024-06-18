"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsKzFactory = void 0;
const config_1 = require("@nestjs/config");
exports.smsKzFactory = {
    useFactory: (configService) => {
        return {
            login: configService.get('smsCenter.login'),
            password: configService.get('smsCenter.password'),
            sender: configService.get('smsCenter.sender'),
            link: configService.get('smsCenter.link'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=smsKz.factory.js.map