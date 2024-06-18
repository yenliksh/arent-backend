"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const contract_bulls_module_1 = require("../contract/bulls/contract-bulls.module");
const graphql_subscriptions_module_1 = require("../../../modules/graphql-subscriptions/graphql-subscriptions.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const mark_message_as_read_handler_1 = require("./commands/mark-message-as-read/mark-message-as-read.handler");
const push_system_message_handler_1 = require("./commands/push-system-message/push-system-message.handler");
const send_message_handler_1 = require("./commands/send-message/send-message.handler");
const chat_messages_service_1 = require("./queries/chat-messages/chat-messages.service");
const find_message_service_1 = require("./queries/find-message/find-message.service");
const message_mutation_resolver_1 = require("./resolvers/message.mutation.resolver");
const message_query_resolver_1 = require("./resolvers/message.query.resolver");
const message_resolver_1 = require("./resolvers/message.resolver");
const message_subscription_resolver_1 = require("./resolvers/message.subscription.resolver");
const graphqlResolvers = [
    message_mutation_resolver_1.MessageMutationGraphqlResolver,
    message_query_resolver_1.MessageQueryGraphqlResolver,
    message_subscription_resolver_1.MessageSubscriptionResolver,
    message_resolver_1.MessageGraphqlResolver,
];
const commands = [send_message_handler_1.SendMessageHandler, mark_message_as_read_handler_1.MarkMessageAsReadHandler, push_system_message_handler_1.PushSystemMessageHandler];
const queries = [chat_messages_service_1.ChatMessagesService, find_message_service_1.FindMessageService];
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, graphql_subscriptions_module_1.GraphqlSubscriptionsModule, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule, contract_bulls_module_1.ContractBullsModule],
        providers: [...graphqlResolvers, ...commands, ...queries],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map