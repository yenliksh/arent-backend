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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageRequest = void 0;
const openapi = require("@nestjs/swagger");
const validators_1 = require("../../../../../infrastructure/validators");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const types_1 = require("../../domain/types");
const send_message_type_validator_1 = require("../../validators/send-message-type.validator");
let SendMessageRequest = class SendMessageRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, chatId: { required: true, type: () => String }, type: { required: true, enum: require("../../domain/types").MessageType }, text: { required: false, type: () => String, minLength: 1, maxLength: 2000 }, mediaUrl: { required: false, type: () => String }, mediaName: { required: false, type: () => String }, mediaWeight: { required: false, type: () => Number, minimum: 1 } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SendMessageRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SendMessageRequest.prototype, "chatId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(send_message_type_validator_1.SendMessageTypeValidator),
    (0, graphql_1.Field)(() => types_1.MessageType, {
        description: "Without SYSTEM (only TEXT or MEDIA) becourse Only the system can send system messages, so they're not here",
    }),
    __metadata("design:type", String)
], SendMessageRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.type === types_1.MessageType.TEXT),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Length)(1, 2000),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SendMessageRequest.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.type === types_1.MessageType.MEDIA),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.UrlValidator),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SendMessageRequest.prototype, "mediaUrl", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.type === types_1.MessageType.MEDIA),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SendMessageRequest.prototype, "mediaName", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.type === types_1.MessageType.MEDIA),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsPositive)(),
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], SendMessageRequest.prototype, "mediaWeight", void 0);
SendMessageRequest = __decorate([
    (0, graphql_1.InputType)()
], SendMessageRequest);
exports.SendMessageRequest = SendMessageRequest;
//# sourceMappingURL=send-message.request.dto.js.map