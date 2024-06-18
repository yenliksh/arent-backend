"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const contract_bulls_module_1 = require("../contract/bulls/contract-bulls.module");
const unit_of_work_module_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work.module");
const graphql_subscriptions_module_1 = require("../../../modules/graphql-subscriptions/graphql-subscriptions.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const accept_request_service_1 = require("./commands/accept-request/accept-request.service");
const reject_request_service_1 = require("./commands/reject-request/reject-request.service");
const send_request_email_service_1 = require("./commands/send-request-email/send-request-email.service");
const send_request_status_email_service_1 = require("./commands/send-request-status-email/send-request-status-email.service");
const send_request_service_1 = require("./commands/send-request/send-request.service");
const find_contract_request_for_landlord_service_1 = require("./queries/find-contract-request-for-landlord/find-contract-request-for-landlord.service");
const find_contract_request_service_1 = require("./queries/find-contract-request/find-contract-request.service");
const contract_request_mutation_resolver_1 = require("./resolvers/contract-request.mutation.resolver");
const contract_request_query_resolver_1 = require("./resolvers/contract-request.query.resolver");
const contract_request_resolver_1 = require("./resolvers/contract-request.resolver");
const graphqlResolvers = [
    contract_request_mutation_resolver_1.ContractRequestMutationGraphqlResolver,
    contract_request_query_resolver_1.ContractRequestQueryGraphqlResolver,
    contract_request_resolver_1.ContractRequestGraphqlResolver,
];
const commands = [
    send_request_service_1.SendRequestService,
    accept_request_service_1.AcceptRequestService,
    reject_request_service_1.RejectRequestService,
    send_request_email_service_1.SendRequestEmailService,
    send_request_status_email_service_1.SendBookingRequestStatusEmailService,
];
const queries = [find_contract_request_service_1.FindContractRequestService, find_contract_request_for_landlord_service_1.FindContractRequestForLandlordService];
let ContractRequestModule = class ContractRequestModule {
};
ContractRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            unit_of_work_module_1.UnitOfWorkModule,
            rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule,
            graphql_subscriptions_module_1.GraphqlSubscriptionsModule,
            contract_bulls_module_1.ContractBullsModule,
        ],
        providers: [...graphqlResolvers, ...commands, ...queries],
    })
], ContractRequestModule);
exports.ContractRequestModule = ContractRequestModule;
//# sourceMappingURL=contract-request.module.js.map