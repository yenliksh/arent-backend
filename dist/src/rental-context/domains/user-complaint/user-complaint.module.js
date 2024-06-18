"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const admin_set_viewed_user_complaint_handler_1 = require("./commands/admins/admin-set-viewed-user-complaint.handler");
const create_user_complaint_handler_1 = require("./commands/create-user-complaint/create-user-complaint.handler");
const user_complaint_mutation_resolver_1 = require("./resolvers/user-complaint.mutation.resolver");
const commands = [create_user_complaint_handler_1.CreateUserComplaintHandler, admin_set_viewed_user_complaint_handler_1.AdminViewedUserComplaintHandler];
const graphqlResolvers = [user_complaint_mutation_resolver_1.UserComplaintGraphqlResolver];
let UserComplaintModule = class UserComplaintModule {
};
UserComplaintModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule],
        providers: [...commands, ...graphqlResolvers],
    })
], UserComplaintModule);
exports.UserComplaintModule = UserComplaintModule;
//# sourceMappingURL=user-complaint.module.js.map