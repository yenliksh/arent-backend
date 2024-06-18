"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPanelModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const apartment_identificator_module_1 = require("./apartment-identificaator/apartment-identificator.module");
let UserPanelModule = class UserPanelModule {
};
UserPanelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.user'),
                    password: configService.get('database.password'),
                    database: configService.get('database.dbName'),
                    entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
                    synchronize: false,
                    logging: true,
                }),
                inject: [config_1.ConfigService],
            }),
            apartment_identificator_module_1.ApartmentIdentificatorModule,
        ],
    })
], UserPanelModule);
exports.UserPanelModule = UserPanelModule;
//# sourceMappingURL=user-panel.module.js.map