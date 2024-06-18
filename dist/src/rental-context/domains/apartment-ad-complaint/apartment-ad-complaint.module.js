"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdComplaintModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const admin_set_viewed_apartment_ad_complaint_handler_1 = require("./commands/admins/admin-set-viewed-apartment-ad-complaint/admin-set-viewed-apartment-ad-complaint.handler");
const create_apartment_ad_complaint_handler_1 = require("./commands/create-apartment-ad-complaint/create-apartment-ad-complaint.handler");
const apartment_ad_complaint_mutation_resolver_1 = require("./resolvers/apartment-ad-complaint.mutation.resolver");
const commands = [create_apartment_ad_complaint_handler_1.CreateApartmentAdComplaintHandler, admin_set_viewed_apartment_ad_complaint_handler_1.AdminViewedApartmentAdComplaintHandler];
const graphqlResolvers = [apartment_ad_complaint_mutation_resolver_1.ApartmentAdComplaintGraphqlResolver];
let ApartmentAdComplaintModule = class ApartmentAdComplaintModule {
};
ApartmentAdComplaintModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule],
        providers: [...commands, ...graphqlResolvers],
    })
], ApartmentAdComplaintModule);
exports.ApartmentAdComplaintModule = ApartmentAdComplaintModule;
//# sourceMappingURL=apartment-ad-complaint.module.js.map