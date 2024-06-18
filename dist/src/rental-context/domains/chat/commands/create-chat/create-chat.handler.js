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
exports.CreateChatHandler = void 0;
const contract_request_repository_1 = require("../../../../domain-repositories/contract-request/contract-request.repository");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const chat_entity_1 = require("../../domain/entities/chat.entity");
const types_1 = require("../../domain/types");
const message_entity_1 = require("../../../message/domain/entities/message.entity");
const types_2 = require("../../../message/domain/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const create_chat_command_1 = require("./create-chat.command");
let CreateChatHandler = class CreateChatHandler {
    constructor(contractRepository, contractRequestRepository, messageRepository, chatRepository) {
        this.contractRepository = contractRepository;
        this.contractRequestRepository = contractRequestRepository;
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
    }
    async execute(command) {
        const { trxId } = command;
        const { contractId, systemMessageType, transactionsMeta } = command.props;
        const [contract, contractRequest] = await Promise.all([
            this.contractRepository.findOneById(contractId.value, trxId),
            this.contractRequestRepository.findOneByContractId(contractId.value, trxId),
        ]);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        const tenantId = contract.tenantIdOrFail;
        const landlordId = contract.landlordIdOrFail;
        const chat = chat_entity_1.ChatEntity.create({
            contractId: contract.id,
            members: [
                {
                    memberId: landlordId,
                    role: types_1.UserChatRole.LANDLORD,
                },
                {
                    memberId: tenantId,
                    role: types_1.UserChatRole.TENANT,
                },
            ],
        });
        await this.chatRepository.save(chat, trxId);
        const lastMessage = await this.sendSystemMessage({
            chatId: chat.id,
            contract,
            comment: contractRequest === null || contractRequest === void 0 ? void 0 : contractRequest.comment,
            systemMessageType,
            transactionsMeta,
        }, trxId);
        chat.setLastMessageId(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.id);
        await this.chatRepository.save(chat, trxId);
        return (0, oxide_ts_1.Ok)(chat.id);
    }
    async sendSystemMessage({ chatId, comment, contract, systemMessageType, transactionsMeta, }, trxId) {
        const message = message_entity_1.MessageEntity.create({
            chatId,
            senderId: contract.tenantIdOrFail,
            type: types_2.MessageType.SYSTEM,
            system: {
                type: systemMessageType,
                contractData: { ...contract.systemMessageData, comment, transactionsMeta },
            },
        });
        await this.messageRepository.save(message, trxId);
        return message;
    }
};
CreateChatHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_chat_command_1.CreateChatCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        contract_request_repository_1.ContractRequestRepository,
        message_repository_1.MessageRepository,
        chat_repository_1.ChatRepository])
], CreateChatHandler);
exports.CreateChatHandler = CreateChatHandler;
//# sourceMappingURL=create-chat.handler.js.map