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
exports.InnopayCardRepository = void 0;
const innopay_card_entity_1 = require("../../domains/innopay-card/domain/entities/innopay-card.entity");
const innopay_card_orm_entity_1 = require("../../../infrastructure/database/entities/innopay-card.orm-entity");
const innopay_users_orm_entity_1 = require("../../../infrastructure/database/entities/innopay-users.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const innopay_card_orm_mapper_1 = require("./innopay-card.orm-mapper");
let InnopayCardRepository = class InnopayCardRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new innopay_card_orm_mapper_1.InnopayCardOrmMapper(innopay_card_entity_1.InnopayCardEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx).findOne(where).withGraphFetched({ innopayUser: true });
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx).where(where).withGraphFetched({ innopayUser: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const card = await innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx).findById(id);
        if (!card) {
            return card;
        }
        return this.mapper.toDomainEntity(card, trxId);
    }
    async findManyByUserId(userId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx)
            .withGraphFetched({ innopayUser: true }, { joinOperation: 'innerJoin' })
            .modifyGraph('innopayUser', (builder) => {
            builder.where('userId', userId);
        });
        return found.length
            ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId)))
            : [];
    }
    async isCardExist({ cardId, userId, appointmentType, }, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const foundCardQuery = innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx)
            .findById(cardId)
            .joinRelated('innopayUser')
            .where('innopayUser.userId', userId);
        if (appointmentType) {
            foundCardQuery.where('appointmentType', appointmentType);
        }
        const foundCard = await foundCardQuery;
        return !!foundCard;
    }
    async save(entity, incomingTrxId) {
        entity.validate();
        const [trxId, isOwnTrx] = incomingTrxId ? [incomingTrxId, false] : [await this.unitOfWork.start(), true];
        const trx = this.unitOfWork.getTrx(trxId);
        try {
            const result = await innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity, trxId), {
                insertMissing: true,
            });
            if (isOwnTrx) {
                await this.unitOfWork.commit(trxId);
            }
            return new uuid_value_object_1.UUID(result.id);
        }
        catch (err) {
            if (isOwnTrx) {
                await this.unitOfWork.rollback(trxId);
            }
            throw err;
        }
    }
    async delete(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await innopay_card_orm_entity_1.InnopayCardOrmEntity.startTransaction();
        try {
            await innopay_card_orm_entity_1.InnopayCardOrmEntity.query(trx).delete().where('id', entity.id.value);
            if (!trxId) {
                await trx.commit();
                await trx.executionPromise;
            }
            return entity;
        }
        catch (err) {
            if (!trxId) {
                await trx.rollback();
            }
            throw err;
        }
    }
    async findCreditingInnopayUser(userId) {
        const query = innopay_users_orm_entity_1.InnopayUsersOrmEntity.query().findOne({ userId, isCrediting: true });
        return query;
    }
    async findCreditingInnopayUserByCnpUserId(cnpUserId) {
        const query = innopay_users_orm_entity_1.InnopayUsersOrmEntity.query().findOne({ cnpUserId, isCrediting: true });
        return query;
    }
    async saveInnopayUser(entity) {
        const trx = await innopay_users_orm_entity_1.InnopayUsersOrmEntity.startTransaction();
        try {
            const result = await innopay_users_orm_entity_1.InnopayUsersOrmEntity.query(trx).insert(entity);
            await trx.commit();
            await trx.executionPromise;
            return result;
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
        return where;
    }
};
InnopayCardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], InnopayCardRepository);
exports.InnopayCardRepository = InnopayCardRepository;
//# sourceMappingURL=innopay-card.repository.js.map