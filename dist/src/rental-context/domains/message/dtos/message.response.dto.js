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
var MessageResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const message_model_1 = require("../models/message.model");
const chat_is_not_active_problem_1 = require("../problems/chat-is-not-active.problem");
let MessageResponse = MessageResponse_1 = class MessageResponse {
    static create(props) {
        const payload = new MessageResponse_1();
        payload.message = message_model_1.MessageModel.create(props);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: false, type: () => require("../models/message.model").MessageModel }, problem: { required: false, type: () => require("../problems/chat-is-not-active.problem").ChatIsNotActiveProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => message_model_1.MessageModel, { nullable: true }),
    __metadata("design:type", message_model_1.MessageModel)
], MessageResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => chat_is_not_active_problem_1.ChatIsNotActiveProblem, { nullable: true }),
    __metadata("design:type", chat_is_not_active_problem_1.ChatIsNotActiveProblem)
], MessageResponse.prototype, "problem", void 0);
MessageResponse = MessageResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], MessageResponse);
exports.MessageResponse = MessageResponse;
//# sourceMappingURL=message.response.dto.js.map