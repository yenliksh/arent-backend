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
exports.ChatGraphqlResolver = void 0;
const apartment_ad_media_model_1 = require("../../apartment-ad/models/sub-models/apartment-ad-media.model");
const contract_model_1 = require("../../contract/models/contract.model");
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const contract_dataloader_1 = require("../../../../infrastructure/dataloader/contract.dataloader");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const dataloader_1 = require("../../../../libs/dataloader");
const base64_1 = require("../../../../libs/utils/base64");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
const message_model_1 = require("../../message/models/message.model");
const user_model_1 = require("../../user/models/user.model");
const apartment_ad_for_contract_dataloader_1 = require("../dataloader/apartment-ad-for-contract.dataloader");
const chat_members_dataloader_1 = require("../dataloader/chat-members.dataloader");
const is_active_chat_dataloader_1 = require("../dataloader/is-active-chat.dataloader");
const last_message_dataloader_1 = require("../dataloader/last-message.dataloader");
const unread_message_count_dataloader_1 = require("../dataloader/unread-message-count.dataloader");
const chat_model_1 = require("../models/chat.model");
const apartment_ad_ids_model_1 = require("../models/sub-models/apartment-ad-ids.model");
let ChatGraphqlResolver = class ChatGraphqlResolver {
    async members(chat, chatMemberLoader) {
        const { id, members } = chat;
        if (members) {
            return members;
        }
        const result = await chatMemberLoader.load(id);
        return result.map(user_model_1.UserModel.create);
    }
    async apartmentAdPhotos(chat, chatApartmentAdLoader) {
        var _a;
        const { contractId, apartmentAdPhotos } = chat;
        if (apartmentAdPhotos) {
            return apartmentAdPhotos;
        }
        const result = await chatApartmentAdLoader.load(contractId);
        return (((_a = result === null || result === void 0 ? void 0 : result.media) === null || _a === void 0 ? void 0 : _a.photos) || []).map(apartment_ad_media_model_1.ApartmentAdMediaModel.create);
    }
    async lastMessage(chat, chatMemberLoader) {
        const { id, lastMessage } = chat;
        if (lastMessage) {
            return lastMessage;
        }
        const result = await chatMemberLoader.load(id);
        return result ? message_model_1.MessageModel.create(result) : undefined;
    }
    async contract(chat, contractLoader) {
        const { contractId, contract } = chat;
        if (contract) {
            return contract;
        }
        const result = await contractLoader.load(contractId);
        return result ? contract_model_1.ContractChatModel.create(result) : undefined;
    }
    async unreadMessageCount(iam, chat, unreadMessageCountLoader) {
        const { id } = chat;
        const unreadMessageCountLoaderProps = {
            chatId: id,
            userId: iam.id,
        };
        const result = await unreadMessageCountLoader.load((0, base64_1.encodeBase64)(unreadMessageCountLoaderProps));
        return result !== null && result !== void 0 ? result : 0;
    }
    async isActive(chat, isActiveChatLoader) {
        const { contractId, isActive } = chat;
        if (isActive != null) {
            return isActive;
        }
        const result = await isActiveChatLoader.load(contractId);
        return result !== null && result !== void 0 ? result : false;
    }
    async apartmentAdIds(chat, chatApartmentAdLoader) {
        var _a, _b;
        const { contractId, apartmentAdIds } = chat;
        if (apartmentAdIds) {
            return apartmentAdIds;
        }
        const result = await chatApartmentAdLoader.load(contractId);
        return apartment_ad_ids_model_1.ApartmentAdIdsModel.create({
            longTermRentId: (_a = result === null || result === void 0 ? void 0 : result.longTermRent) === null || _a === void 0 ? void 0 : _a.id,
            shortTermRentId: (_b = result === null || result === void 0 ? void 0 : result.shortTermRent) === null || _b === void 0 ? void 0 : _b.id,
        });
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [user_model_1.UserModel]),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(chat_members_dataloader_1.ChatMembersLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ChatGraphqlResolver.prototype, "members", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [apartment_ad_media_model_1.ApartmentAdMediaModel]),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_for_contract_dataloader_1.ApartmentAdForContractLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ChatGraphqlResolver.prototype, "apartmentAdPhotos", null);
__decorate([
    (0, graphql_1.ResolveField)(() => message_model_1.MessageModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(last_message_dataloader_1.LastMessageLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ChatGraphqlResolver.prototype, "lastMessage", null);
__decorate([
    (0, graphql_1.ResolveField)(() => contract_model_1.ContractChatModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(contract_dataloader_1.ContractOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ChatGraphqlResolver.prototype, "contract", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Parent)()),
    __param(2, (0, dataloader_1.Loader)(unread_message_count_dataloader_1.UnreadMessageCountLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        chat_model_1.ChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ChatGraphqlResolver.prototype, "unreadMessageCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Boolean),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(is_active_chat_dataloader_1.IsActiveChatLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ChatGraphqlResolver.prototype, "isActive", null);
__decorate([
    (0, graphql_1.ResolveField)(() => apartment_ad_ids_model_1.ApartmentAdIdsModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_for_contract_dataloader_1.ApartmentAdForContractLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ChatGraphqlResolver.prototype, "apartmentAdIds", null);
ChatGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(() => chat_model_1.ChatModel)
], ChatGraphqlResolver);
exports.ChatGraphqlResolver = ChatGraphqlResolver;
//# sourceMappingURL=chat.resolver.js.map