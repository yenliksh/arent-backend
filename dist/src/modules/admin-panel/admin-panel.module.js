"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const admin_module_1 = require("./admins/admin.module");
const apartment_ad_complaint_module_1 = require("./apartment-ad-complaints/apartment-ad-complaint.module");
const apartment_ad_admin_module_1 = require("./apartment-ads/apartment-ad-admin.module");
const chat_member_admin_module_1 = require("./chat-members/chat-member-admin.module");
const chat_admin_module_1 = require("./chats/chat-admin.module");
const contract_admin_module_1 = require("./contracts/contract-admin.module");
const long_term_rent_requests_admin_module_1 = require("./long-term-rents-requests/long-term-rent-requests-admin.module");
const long_term_rent_admin_module_1 = require("./long-term-rents/long-term-rent-admin.module");
const message_admin_module_1 = require("./messages/message-admin.module");
const short_term_rent_requests_admin_module_1 = require("./short-term-rents-requests/short-term-rent-requests-admin.module");
const short_term_rent_admin_module_1 = require("./short-term-rents/short-term-rent-admin.module");
const user_complaint_module_1 = require("./user-complaints/user-complaint.module");
const user_identity_requests_admin_module_1 = require("./user-identity-requests/user-identity-requests-admin.module");
const user_admin_module_1 = require("./users/user-admin.module");
let AdminPanelModule = class AdminPanelModule {
};
AdminPanelModule = __decorate([
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
            admin_module_1.AdminModule,
            user_admin_module_1.UserAdminModule,
            short_term_rent_requests_admin_module_1.ShortTermRentRequestsAdminModule,
            long_term_rent_requests_admin_module_1.LongTermRentRequestsAdminModule,
            user_identity_requests_admin_module_1.UserIdentityRequestsAdminModule,
            apartment_ad_admin_module_1.ApartmentAdAdminModule,
            short_term_rent_admin_module_1.ShortTermRentAdminModule,
            long_term_rent_admin_module_1.LongTermRentAdminModule,
            apartment_ad_complaint_module_1.ApartmentAdComplaintModule,
            user_complaint_module_1.UserComplaintModule,
            chat_admin_module_1.ChatAdminModule,
            message_admin_module_1.MessageAdminModule,
            contract_admin_module_1.ContractAdminModule,
            chat_member_admin_module_1.ChatMemberAdminModule,
        ],
    })
], AdminPanelModule);
exports.AdminPanelModule = AdminPanelModule;
//# sourceMappingURL=admin-panel.module.js.map