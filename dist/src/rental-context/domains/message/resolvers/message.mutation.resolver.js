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
exports.MessageMutationGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const uuid_value_object_1 = require("../../../../libs/ddd/domain/value-objects/uuid.value-object");
const problem_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const graphql_1 = require("@nestjs/graphql");
const mark_message_as_read_command_1 = require("../commands/mark-message-as-read/mark-message-as-read.command");
const mark_message_as_read_request_dto_1 = require("../commands/mark-message-as-read/mark-message-as-read.request.dto");
const send_message_command_1 = require("../commands/send-message/send-message.command");
const send_message_request_dto_1 = require("../commands/send-message/send-message.request.dto");
const message_response_dto_1 = require("../dtos/message.response.dto");
const find_message_service_1 = require("../queries/find-message/find-message.service");
let MessageMutationGraphqlResolver = class MessageMutationGraphqlResolver {
    constructor(commandBus, findByIdService) {
        this.commandBus = commandBus;
        this.findByIdService = findByIdService;
    }
    async sendMessage(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(message_response_dto_1.MessageResponse, async () => {
            const result = await this.commandBus.execute(new send_message_command_1.SendMessageCommand({
                id: new uuid_value_object_1.UUID(input.id),
                chatId: new uuid_value_object_1.UUID(input.chatId),
                senderId: new uuid_value_object_1.UUID(iam.id),
                type: input.type,
                media: input.mediaUrl && input.mediaName && input.mediaWeight
                    ? { fileKey: input.mediaUrl, fileName: input.mediaName, fileWeight: input.mediaWeight }
                    : undefined,
                text: input.text ? { text: input.text } : undefined,
            }));
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return message_response_dto_1.MessageResponse.create(queryResult.unwrap());
        });
    }
    async markAsRead(iam, input) {
        const result = await this.commandBus.execute(new mark_message_as_read_command_1.MarkMessageAsReadCommand(new uuid_value_object_1.UUID(input.id), new uuid_value_object_1.UUID(iam.id)));
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return result.isOk();
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => message_response_dto_1.MessageResponse, { name: 'message__send' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, send_message_request_dto_1.SendMessageRequest]),
    __metadata("design:returntype", Promise)
], MessageMutationGraphqlResolver.prototype, "sendMessage", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'message__mark_as_read' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, mark_message_as_read_request_dto_1.MarkMessageAsReadRequest]),
    __metadata("design:returntype", Promise)
], MessageMutationGraphqlResolver.prototype, "markAsRead", null);
MessageMutationGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus, find_message_service_1.FindMessageService])
], MessageMutationGraphqlResolver);
exports.MessageMutationGraphqlResolver = MessageMutationGraphqlResolver;
//# sourceMappingURL=message.mutation.resolver.js.map