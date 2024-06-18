"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path = require("path");
const bull_factory_1 = require("./infrastructure/configs/bull.factory");
const environment_config_1 = require("./infrastructure/configs/environment.config");
const graphql_config_service_1 = require("./infrastructure/configs/graphql-config.service");
const database_module_1 = require("./infrastructure/database/database.module");
const interceptors_1 = require("./infrastructure/interceptors");
const dataloader_1 = require("./libs/dataloader");
const dataloader_module_1 = require("./libs/dataloader/dataloader.module");
const admin_panel_module_1 = require("./modules/admin-panel/admin-panel.module");
const auth_module_1 = require("./modules/auth/auth.module");
const aws_module_1 = require("./modules/aws/aws.module");
const google_module_1 = require("./modules/google/google.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const user_panel_module_1 = require("./modules/user-panel/user-panel.module");
const apollo_1 = require("@nestjs/apollo");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const event_emitter_1 = require("@nestjs/event-emitter");
const graphql_1 = require("@nestjs/graphql");
const nestjs_i18n_1 = require("nestjs-i18n");
const app_controller_1 = require("./app.controller");
const rental_context_module_1 = require("./rental-context/rental-context.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useClass: graphql_config_service_1.GraphQLConfigService,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [environment_config_1.loadConfiguration],
                validationSchema: environment_config_1.validationSchema,
                validationOptions: { abortEarly: true },
            }),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                loaderOptions: {
                    path: path.join(__dirname, '../i18n/'),
                    watch: true,
                },
                resolvers: [{ use: nestjs_i18n_1.QueryResolver, options: ['lang'] }, nestjs_i18n_1.AcceptLanguageResolver],
            }),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: false,
                delimiter: '.',
                newListener: false,
                removeListener: false,
                maxListeners: 20,
                verboseMemoryLeak: true,
                ignoreErrors: false,
            }),
            bull_1.BullModule.forRootAsync(bull_factory_1.bullConfigFactory),
            dataloader_module_1.DataloaderModule,
            admin_panel_module_1.AdminPanelModule,
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            aws_module_1.AwsModule,
            google_module_1.GoogleModule,
            rental_context_module_1.RentalContextModule,
            notifications_module_1.NotificationsModule,
            user_panel_module_1.UserPanelModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.LocalizedProblemInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: dataloader_1.DataLoaderInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map