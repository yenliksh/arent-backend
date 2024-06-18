"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSubscriptionResolver = void 0;
const pub_sub_service_1 = require("../../../../modules/graphql-subscriptions/pub-sub.service");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../chat/domain/types");
const message_model_1 = require("../models/message.model");
let MessageSubscriptionResolver = class MessageSubscriptionResolver {
    constructor(pubSubService) {
        this.pubSubService = pubSubService;
    }
    newMessage(_userChatRole) {
        return this.pubSubService.asyncIterator(pub_sub_service_1.PubSubTrigger.NEW_MESSAGE);
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => message_model_1.MessageModel, {
        name: pub_sub_service_1.PubSubTrigger.NEW_MESSAGE,
        filter: (payload, variables, context) => payload.chatMembers[context.user.id] === variables.userChatRole,
        resolve: async (payload) => {
            var _a;
            const ormEntity = {
                ...payload.message,
                contractData: payload.message.contractData
                    ? {
                        ...payload.message.contractData,
                        transactionsMeta: (_a = payload.message.contractData.transactionsMeta) === null || _a === void 0 ? void 0 : _a.map((meta) => ({
                            ...meta,
                            startDate: meta.startDate.toISOString(),
                            endDate: meta.endDate.toISOString(),
                            withdrawFundsDate: meta.withdrawFundsDate.toISOString(),
                        })),
                    }
                    : undefined,
            };
            return message_model_1.MessageModel.create(ormEntity);
        },
    }),
    __param(0, (0, graphql_1.Args)('userChatRole', { type: () => types_1.UserChatRole })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageSubscriptionResolver.prototype, "newMessage", null);
MessageSubscriptionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [pub_sub_service_1.PubSubService])
], MessageSubscriptionResolver);
exports.MessageSubscriptionResolver = MessageSubscriptionResolver;
//# sourceMappingURL=message.subscription.resolver.js.map