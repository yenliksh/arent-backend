"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const innopay_card_module_1 = require("../innopay-card/innopay-card.module");
const payment_bulls_module_1 = require("../payment-transaction/bulls/payment-bulls.module");
const graphql_subscriptions_module_1 = require("../../../modules/graphql-subscriptions/graphql-subscriptions.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const contract_bulls_module_1 = require("./bulls/contract-bulls.module");
const accept_contract_offer_service_1 = require("./commands/accept-contract-offer/accept-contract-offer.service");
const cancel_concluded_contract_handler_1 = require("./commands/cancel-concluded-contract/cancel-concluded-contract.handler");
const cancel_contract_by_admin_handler_1 = require("./commands/cancel-contract-by-admin/cancel-contract-by-admin.handler");
const cancel_contract_by_tenant_service_1 = require("./commands/cancel-contract-by-tenant/cancel-contract-by-tenant.service");
const change_tenant_payment_method_service_1 = require("./commands/change-tenant-payment-method/change-tenant-payment-method.service");
const contract_temporary_conclude_service_1 = require("./commands/contract-temporary-conclude/contract-temporary-conclude.service");
const contract_temporary_instant_conclude_service_1 = require("./commands/contract-temporary-instant-conclude/contract-temporary-instant-conclude.service");
const create_contract_after_request_handler_1 = require("./commands/create-contract-after-request/create-contract-after-request.handler");
const create_instant_booking_contract_handler_1 = require("./commands/create-instant-booking-contract/create-instant-booking-contract.handler");
const modify_contract_to_permanent_handler_1 = require("./commands/modify-contract-to-permanent/modify-contract-to-permanent.handler");
const reject_contract_offer_service_1 = require("./commands/reject-contract-offer/reject-contract-offer.service");
const reject_intersected_contracts_handler_1 = require("./commands/reject-intersected-contracts/reject-intersected-contracts.handler");
const revoke_temporary_contract_handler_1 = require("./commands/revoke-temporary-contract/revoke-temporary-contract.handler");
const send_contract_offer_email_service_1 = require("./commands/send-contract-offer-email/send-contract-offer-email.service");
const send_contract_offer_status_email_service_1 = require("./commands/send-contract-offer-status-email/send-contract-offer-status-email.service");
const send_contract_offer_service_1 = require("./commands/send-contract-offer/send-contract-offer.service");
const update_contract_payment_transaction_handler_1 = require("./commands/update-contract-payment-transaction/update-contract-payment-transaction.handler");
const contract_cron_module_1 = require("./cron/contract-cron.module");
const payment_transaction_listener_1 = require("./domain/events/payment-transaction.listener");
const find_contract_service_1 = require("./queries/find-contract/find-contract.service");
const landlord_active_rent_contracts_service_1 = require("./queries/landlord-active-rent-contracts/landlord-active-rent-contracts.service");
const landlord_contract_service_1 = require("./queries/landlord-contract/landlord-contract.service");
const tenant_contract_cancelation_info_service_1 = require("./queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.service");
const tenant_contract_payment_info_service_1 = require("./queries/tenant-contract-payment-info/tenant-contract-payment-info.service");
const tenant_contract_service_1 = require("./queries/tenant-contract/tenant-contract.service");
const tenant_long_term_rent_contracts_service_1 = require("./queries/tenant-long-term-rent-contracts/tenant-long-term-rent-contracts.service");
const tenant_short_term_rent_contracts_service_1 = require("./queries/tenant-short-term-rent-contracts/tenant-short-term-rent-contracts.service");
const contract_mutation_resolver_1 = require("./resolvers/contract.mutation.resolver");
const contract_query_resolver_1 = require("./resolvers/contract.query.resolver");
const contract_subscription_resolver_1 = require("./resolvers/contract.subscription.resolver");
const contract_chat_resolver_1 = require("./resolvers/contract/contract-chat.resolver");
const contract_landlord_resolver_1 = require("./resolvers/contract/contract-landlord.resolver");
const contract_tenant_resolver_1 = require("./resolvers/contract/contract-tenant.resolver");
const graphqlResolvers = [
    contract_mutation_resolver_1.ContractMutationGraphqlResolver,
    contract_query_resolver_1.ContractQueryGraphqlResolver,
    contract_landlord_resolver_1.ContractLandlordResolver,
    contract_tenant_resolver_1.ContractTenantResolver,
    contract_chat_resolver_1.ContractChatResolver,
    contract_subscription_resolver_1.ContractSubscriptionResolver,
];
const commands = [
    send_contract_offer_service_1.SendContractOfferService,
    accept_contract_offer_service_1.AcceptContractOfferService,
    reject_contract_offer_service_1.RejectContractOfferService,
    tenant_contract_service_1.TenantContractService,
    landlord_contract_service_1.LandlordContractService,
    change_tenant_payment_method_service_1.ChangeTenantPaymentMethodService,
    create_contract_after_request_handler_1.CreateContractAfterRequestHandler,
    tenant_contract_payment_info_service_1.TenantContractPaymentInfoService,
    update_contract_payment_transaction_handler_1.UpdateContractPaymentTransactionHandler,
    cancel_concluded_contract_handler_1.CancelConcludedContractHandler,
    cancel_contract_by_tenant_service_1.CancelContractByTenantService,
    cancel_contract_by_admin_handler_1.CancelContractByAdminHandler,
    contract_temporary_conclude_service_1.ContractTemporaryConcludeService,
    create_instant_booking_contract_handler_1.CreateInstantContractHandler,
    revoke_temporary_contract_handler_1.RevokeTemporaryContractHandler,
    modify_contract_to_permanent_handler_1.ModifyContractToPermanentHandler,
    contract_temporary_instant_conclude_service_1.ContractTemporaryInstantConcludeService,
    reject_intersected_contracts_handler_1.RejectIntersectedContractsHandler,
    send_contract_offer_status_email_service_1.SendContractOfferStatusEmailService,
    send_contract_offer_email_service_1.SendContractOfferEmailService,
];
const queries = [
    find_contract_service_1.FindContractService,
    landlord_active_rent_contracts_service_1.LandlordActiveRentContractsService,
    tenant_long_term_rent_contracts_service_1.TenantLongTermRentContractsService,
    tenant_short_term_rent_contracts_service_1.TenantShortTermRentContractsService,
    tenant_contract_cancelation_info_service_1.TenantContractCancelationInfoService,
];
const listeners = [payment_transaction_listener_1.PaymentTransactionListener];
let ContractModule = class ContractModule {
};
ContractModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_subscriptions_module_1.GraphqlSubscriptionsModule,
            cqrs_1.CqrsModule,
            rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule,
            contract_bulls_module_1.ContractBullsModule,
            payment_bulls_module_1.PaymentBullsModule,
            contract_cron_module_1.ContractCronModule,
            innopay_card_module_1.InnopayCardModule,
        ],
        providers: [...graphqlResolvers, ...commands, ...queries, ...listeners],
    })
], ContractModule);
exports.ContractModule = ContractModule;
//# sourceMappingURL=contract.module.js.map