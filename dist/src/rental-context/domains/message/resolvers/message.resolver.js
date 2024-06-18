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
exports.MessageGraphqlResolver = void 0;
const user_dataloader_1 = require("../../../../infrastructure/dataloader/user.dataloader");
const dataloader_1 = require("../../../../libs/dataloader");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
const message_model_1 = require("../models/message.model");
const user_model_1 = require("../../user/models/user.model");
let MessageGraphqlResolver = class MessageGraphqlResolver {
    async sender(message, senderLoader) {
        const { senderId } = message;
        if (!senderId) {
            return null;
        }
        const result = await senderLoader.load(senderId);
        return user_model_1.UserModel.create(result);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.UserModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(user_dataloader_1.UserOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_model_1.MessageModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], MessageGraphqlResolver.prototype, "sender", null);
MessageGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(() => message_model_1.MessageModel)
], MessageGraphqlResolver);
exports.MessageGraphqlResolver = MessageGraphqlResolver;
//# sourceMappingURL=message.resolver.js.map