"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityRequestsAdminModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const user_identity_requests_typeorm_repository_1 = require("./repositories/user-identity-requests.typeorm-repository");
const user_identity_requests_admin_controller_1 = require("./user-identity-requests-admin.controller");
const user_identity_requests_admin_service_1 = require("./user-identity-requests-admin.service");
let UserIdentityRequestsAdminModule = class UserIdentityRequestsAdminModule {
};
UserIdentityRequestsAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([user_identity_requests_typeorm_repository_1.UserIdentityRequestsTypeormRepository])],
        controllers: [user_identity_requests_admin_controller_1.UserIdentityRequestsAdminController],
        providers: [user_identity_requests_admin_service_1.UserIdentityRequestsAdminService],
    })
], UserIdentityRequestsAdminModule);
exports.UserIdentityRequestsAdminModule = UserIdentityRequestsAdminModule;
//# sourceMappingURL=user-identity-requests-admin.module.js.map