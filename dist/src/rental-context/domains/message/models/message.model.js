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
var MessageModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const user_model_1 = require("../../user/models/user.model");
const message_orm_entity_1 = require("../../../../infrastructure/database/entities/message.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const file_key_helper_1 = require("../../../../libs/utils/file-key.helper");
const get_cf_signed_url_1 = require("../../../../libs/utils/get-cf-signed-url");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../domain/types");
const system_message_data_model_1 = require("./sub-models/system-message-data.model");
const transaction_meta_model_1 = require("./sub-models/transaction-meta.model");
let MessageModel = MessageModel_1 = class MessageModel extends model_base_1.ModelBase {
    constructor(message) {
        super(message);
    }
    static create(props) {
        var _a, _b, _c, _d, _e, _f;
        const payload = new MessageModel_1(props);
        payload.chatId = props.chatId;
        payload.contractData = props.contractData ? system_message_data_model_1.SystemMessageDataModel.create(props.contractData) : undefined;
        payload.mediaUrl = props.fileKey ? (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(props.fileKey, 'private')) : undefined;
        payload.mediaName = (_a = props.fileName) !== null && _a !== void 0 ? _a : undefined;
        payload.mediaWeight = (_b = props.fileWeight) !== null && _b !== void 0 ? _b : undefined;
        payload.senderId = props.senderId;
        payload.status = props.status;
        payload.systemMessageType = (_c = props.systemMessageType) !== null && _c !== void 0 ? _c : undefined;
        payload.transactionsMeta = ((_e = (_d = props.contractData) === null || _d === void 0 ? void 0 : _d.transactionsMeta) === null || _e === void 0 ? void 0 : _e.length)
            ? props.contractData.transactionsMeta.map((i) => transaction_meta_model_1.TransactionMetaModel.create(i))
            : [];
        payload.text = (_f = props.text) !== null && _f !== void 0 ? _f : undefined;
        payload.type = props.type;
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MessageModel.prototype, "chatId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MessageModel.prototype, "senderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.MessageType),
    __metadata("design:type", String)
], MessageModel.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.MessageStatus),
    __metadata("design:type", String)
], MessageModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MessageModel.prototype, "text", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MessageModel.prototype, "mediaUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MessageModel.prototype, "mediaName", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], MessageModel.prototype, "mediaWeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.SystemMessageType, { nullable: true }),
    __metadata("design:type", String)
], MessageModel.prototype, "systemMessageType", void 0);
__decorate([
    (0, graphql_1.Field)(() => system_message_data_model_1.SystemMessageDataModel, { nullable: true }),
    __metadata("design:type", system_message_data_model_1.SystemMessageDataModel)
], MessageModel.prototype, "contractData", void 0);
__decorate([
    (0, graphql_1.Field)(() => [transaction_meta_model_1.TransactionMetaModel]),
    __metadata("design:type", Array)
], MessageModel.prototype, "transactionsMeta", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserModel)
], MessageModel.prototype, "sender", void 0);
MessageModel = MessageModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [message_orm_entity_1.MessageOrmEntity])
], MessageModel);
exports.MessageModel = MessageModel;
//# sourceMappingURL=message.model.js.map