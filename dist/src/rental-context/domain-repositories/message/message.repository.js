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
exports.MessageRepository = void 0;
const types_1 = require("../../domains/message/domain/types");
const message_orm_entity_1 = require("../../../infrastructure/database/entities/message.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const message_entity_1 = require("../../domains/message/domain/entities/message.entity");
const message_orm_mapper_1 = require("./message.orm-mapper");
let MessageRepository = class MessageRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new message_orm_mapper_1.MessageOrmMapper(message_entity_1.MessageEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}) {
        const where = this.prepareQuery(params);
        const found = await message_orm_entity_1.MessageOrmEntity.query().findOne(where);
        return found ? this.mapper.toDomainEntity(found) : undefined;
    }
    async findMany(params = {}) {
        const where = this.prepareQuery(params);
        const found = await message_orm_entity_1.MessageOrmEntity.query().where(where);
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const message = await message_orm_entity_1.MessageOrmEntity.query(trx).findById(id);
        if (!message) {
            return message;
        }
        return this.mapper.toDomainEntity(message, trxId);
    }
    async findLastForChat(chatId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const message = await message_orm_entity_1.MessageOrmEntity.query(trx).where({ chatId }).orderBy('createdAt', 'DESC').limit(1).first();
        if (!message) {
            return message;
        }
        return this.mapper.toDomainEntity(message, trxId);
    }
    async findLastOfferForChat(chatId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const message = await message_orm_entity_1.MessageOrmEntity.query(trx)
            .where({ chatId, type: types_1.MessageType.SYSTEM, systemMessageType: types_1.SystemMessageType.OFFER_SENDING })
            .orderBy('createdAt', 'DESC')
            .limit(1)
            .first();
        if (!message) {
            return message;
        }
        return this.mapper.toDomainEntity(message, trxId);
    }
    async findLastOfArray(messageIds, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const message = await message_orm_entity_1.MessageOrmEntity.query(trx)
            .findByIds(messageIds)
            .orderBy('createdAt', 'DESC')
            .limit(1)
            .first();
        if (!message) {
            return message;
        }
        return this.mapper.toDomainEntity(message, trxId);
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await message_orm_entity_1.MessageOrmEntity.startTransaction();
        try {
            const result = await message_orm_entity_1.MessageOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
        await message_orm_entity_1.MessageOrmEntity.query().delete().where('id', entity.id.value);
        return entity;
    }
    prepareQuery(params) {
        const where = {};
        if (params.id) {
            where.id = params.id.value;
        }
        if (params.createdAt) {
            where.createdAt = params.createdAt.value;
        }
        if (params.chatId) {
            where.chatId = params.chatId.value;
        }
        if (params.senderId) {
            where.senderId = params.senderId.value;
        }
        if (params.type) {
            where.type = params.type;
        }
        return where;
    }
};
MessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], MessageRepository);
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=message.repository.js.map