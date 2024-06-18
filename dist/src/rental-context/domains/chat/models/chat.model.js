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
var ChatModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const apartment_ad_media_model_1 = require("../../apartment-ad/models/sub-models/apartment-ad-media.model");
const contract_model_1 = require("../../contract/models/contract.model");
const chat_orm_entity_1 = require("../../../../infrastructure/database/entities/chat.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const graphql_1 = require("@nestjs/graphql");
const message_model_1 = require("../../message/models/message.model");
const user_model_1 = require("../../user/models/user.model");
const apartment_ad_ids_model_1 = require("./sub-models/apartment-ad-ids.model");
let ChatModel = ChatModel_1 = class ChatModel extends model_base_1.ModelBase {
    constructor(chat) {
        super(chat);
    }
    static create(props) {
        const payload = new ChatModel_1(props);
        payload.contractId = props.contractId;
        payload.lastOfferMessageId = props.lastOfferMessageId;
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ChatModel.prototype, "contractId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ChatModel.prototype, "lastOfferMessageId", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => [user_model_1.UserModel]),
    __metadata("design:type", Array)
], ChatModel.prototype, "members", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => contract_model_1.ContractChatModel),
    __metadata("design:type", contract_model_1.ContractChatModel)
], ChatModel.prototype, "contract", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => [apartment_ad_media_model_1.ApartmentAdMediaModel], { nullable: true }),
    __metadata("design:type", Array)
], ChatModel.prototype, "apartmentAdPhotos", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => message_model_1.MessageModel, { nullable: true }),
    __metadata("design:type", message_model_1.MessageModel)
], ChatModel.prototype, "lastMessage", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ChatModel.prototype, "unreadMessageCount", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => Boolean),
    __metadata("design:type", Boolean)
], ChatModel.prototype, "isActive", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_ids_model_1.ApartmentAdIdsModel),
    __metadata("design:type", apartment_ad_ids_model_1.ApartmentAdIdsModel)
], ChatModel.prototype, "apartmentAdIds", void 0);
ChatModel = ChatModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [chat_orm_entity_1.ChatOrmEntity])
], ChatModel);
exports.ChatModel = ChatModel;
//# sourceMappingURL=chat.model.js.map