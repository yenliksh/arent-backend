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
exports.ChatRepository = void 0;
const chat_member_orm_entity_1 = require("../../../infrastructure/database/entities/chat-member.orm-entity");
const chat_orm_entity_1 = require("../../../infrastructure/database/entities/chat.orm-entity");
const message_orm_entity_1 = require("../../../infrastructure/database/entities/message.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const chat_entity_1 = require("../../domains/chat/domain/entities/chat.entity");
const chat_orm_mapper_1 = require("./chat.orm-mapper");
let ChatRepository = class ChatRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new chat_orm_mapper_1.ChatOrmMapper(chat_entity_1.ChatEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const where = this.prepareQuery(params);
        const found = await chat_orm_entity_1.ChatOrmEntity.query(trx).findOne(where).withGraphFetched({ members: true });
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const where = this.prepareQuery(params);
        const found = await chat_orm_entity_1.ChatOrmEntity.query(trx).where(where).withGraphFetched({ members: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const chat = await chat_orm_entity_1.ChatOrmEntity.query(trx).findById(id).withGraphFetched({ members: true });
        if (!chat) {
            return chat;
        }
        return this.mapper.toDomainEntity(chat, trxId);
    }
    async findByIdAndMemberId(id, memberId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const chatMemberSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.query(trx).where({ memberId });
        const chat = await chat_member_orm_entity_1.ChatMemberOrmEntity.relatedQuery('chat', trx).for(chatMemberSubQuery).findById(id);
        if (!chat) {
            return chat;
        }
        return this.mapper.toDomainEntity(chat, trxId);
    }
    async findByContractIdAndMemberId(contractId, memberId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const chatMemberSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.query(trx).where({ memberId });
        const chat = await chat_member_orm_entity_1.ChatMemberOrmEntity.relatedQuery('chat', trx).for(chatMemberSubQuery).findOne({ contractId });
        if (!chat) {
            return chat;
        }
        return this.mapper.toDomainEntity(chat, trxId);
    }
    async findOneByContractId(contractId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const chat = await chat_orm_entity_1.ChatOrmEntity.query(trx).findOne({ contractId }).withGraphFetched({ members: true });
        if (!chat) {
            return chat;
        }
        return this.mapper.toDomainEntity(chat, trxId);
    }
    async findOneByMessageAndMemberId(messageId, memberId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const messageSubQuery = message_orm_entity_1.MessageOrmEntity.query(trx).findById(messageId);
        const chat = await message_orm_entity_1.MessageOrmEntity.relatedQuery('chat', trx)
            .for(messageSubQuery)
            .innerJoinRelated({ members: true })
            .findOne('members.memberId', memberId);
        if (!chat) {
            return chat;
        }
        return this.mapper.toDomainEntity(chat, trxId);
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await chat_orm_entity_1.ChatOrmEntity.startTransaction();
        try {
            const result = await chat_orm_entity_1.ChatOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
                insertMissing: true,
            });
            if (!trxId) {
                await trx.commit();
                await trx.executionPromise;
            }
            return new uuid_value_object_1.UUID(result.id);
        }
        catch (err) {
            if (!trxId) {
                await trx.rollback();
            }
            throw err;
        }
    }
    async delete(entity) {
        entity.validate();
        const trx = await chat_orm_entity_1.ChatOrmEntity.startTransaction();
        try {
            await chat_orm_entity_1.ChatOrmEntity.query(trx).delete().where('id', entity.id.value);
            await trx.commit();
            await trx.executionPromise;
            return entity;
        }
        catch (err) {
            await trx.rollback();
            throw err;
        }
    }
    prepareQuery(params) {
        const where = {};
        if (params.id) {
            where.id = params.id.value;
        }
        if (params.createdAt) {
            where.createdAt = params.createdAt.value;
        }
        if (params.contractId) {
            where.contractId = params.contractId.value;
        }
        return where;
    }
};
ChatRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], ChatRepository);
exports.ChatRepository = ChatRepository;
//# sourceMappingURL=chat.repository.js.map