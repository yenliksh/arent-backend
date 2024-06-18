"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatOrmMapper = void 0;
const chat_member_entity_1 = require("../../domains/chat/domain/entities/chat-member.entity");
const chat_member_orm_entity_1 = require("../../../infrastructure/database/entities/chat-member.orm-entity");
const contract_orm_entity_1 = require("../../../infrastructure/database/entities/contract.orm-entity");
const enums_1 = require("../../../infrastructure/enums");
const date_value_object_1 = require("../../../libs/ddd/domain/value-objects/date.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
const common_1 = require("@nestjs/common");
class ChatOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        var _a;
        const props = entity.getPropsCopy();
        const ormProps = {
            contractId: props.contractId.value,
            lastMessageId: props.lastMessageId ? (_a = props.lastMessageId) === null || _a === void 0 ? void 0 : _a.value : undefined,
            lastOfferMessageId: props.lastOfferMessageId ? props.lastOfferMessageId.value : undefined,
            members: props.members
                ? props.members.map((member) => {
                    var _a, _b;
                    const memberProps = member.getPropsCopy();
                    return chat_member_orm_entity_1.ChatMemberOrmEntity.create({
                        id: memberProps.id.value,
                        chatId: props.id.value,
                        memberId: memberProps.memberId.value,
                        role: memberProps.role,
                        lastReadMessageId: (_a = memberProps.lastReadMessageId) === null || _a === void 0 ? void 0 : _a.value,
                        createdAt: memberProps.createdAt.value,
                        updatedAt: memberProps.updatedAt.value,
                        deletedAt: (_b = memberProps.deletedAt) === null || _b === void 0 ? void 0 : _b.value,
                    });
                })
                : undefined,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity, trxId) {
        var _a;
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const trx = trxId ? (_a = this.unitOfWork) === null || _a === void 0 ? void 0 : _a.getTrx(trxId) : undefined;
        const [members, contract] = await Promise.all([
            chat_member_orm_entity_1.ChatMemberOrmEntity.query(trx).where({ chatId: ormEntity.id }),
            contract_orm_entity_1.ContractOrmEntity.query(trx).select('status').findById(ormEntity.contractId),
        ]);
        if (!contract) {
            throw new common_1.NotFoundException('Chat mast have relation with contract');
        }
        const activeChatContractStatus = [enums_1.ContractStatus.REJECTED, enums_1.ContractStatus.COMPLETED];
        const props = {
            contractId: new uuid_value_object_1.UUID(ormEntity.contractId),
            lastMessageId: ormEntity.lastMessageId ? new uuid_value_object_1.UUID(ormEntity.lastMessageId) : undefined,
            lastOfferMessageId: ormEntity.lastOfferMessageId ? new uuid_value_object_1.UUID(ormEntity.lastOfferMessageId) : undefined,
            isActive: !activeChatContractStatus.includes(contract.status),
            members: members.map((member) => new chat_member_entity_1.ChatMemberEntity({
                id: new uuid_value_object_1.UUID(member.id),
                props: {
                    chatId: id,
                    memberId: new uuid_value_object_1.UUID(member.memberId),
                    role: member.role,
                    lastReadMessageId: member.lastReadMessageId ? new uuid_value_object_1.UUID(member.lastReadMessageId) : undefined,
                },
                createdAt: new date_value_object_1.DateVO(member.createdAt),
                updatedAt: new date_value_object_1.DateVO(member.updatedAt),
                deletedAt: member.deletedAt ? new date_value_object_1.DateVO(member.deletedAt) : null,
            })),
        };
        return { id, props };
    }
}
exports.ChatOrmMapper = ChatOrmMapper;
//# sourceMappingURL=chat.orm-mapper.js.map