"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const create_chat_handler_1 = require("./commands/create-chat/create-chat.handler");
const update_last_message_handler_1 = require("./commands/update-last-message/update-last-message.handler");
const update_last_offer_message_handler_1 = require("./commands/update-last-offer-message/update-last-offer-message.handler");
const find_chat_service_1 = require("./queries/find-chat/find-chat.service");
const is_chats_exist_service_1 = require("./queries/is-chats-exist/is-chats-exist.service");
const my_chats_service_1 = require("./queries/my-chats/my-chats.service");
const chat_query_resolver_1 = require("./resolvers/chat.query.resolver");
const chat_resolver_1 = require("./resolvers/chat.resolver");
const graphqlResolvers = [chat_resolver_1.ChatGraphqlResolver, chat_query_resolver_1.ChatQueryGraphqlResolver];
const commands = [update_last_message_handler_1.UpdateLastMessageHandler, update_last_offer_message_handler_1.UpdateLastOfferMessageHandler, create_chat_handler_1.CreateChatHandler];
const queries = [my_chats_service_1.MyChatsService, find_chat_service_1.FindChatService, is_chats_exist_service_1.IsChatsExistService];
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule],
        providers: [...graphqlResolvers, ...commands, ...queries],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map