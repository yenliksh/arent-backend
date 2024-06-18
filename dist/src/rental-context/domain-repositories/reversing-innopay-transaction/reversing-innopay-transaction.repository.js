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
exports.ReversingInnopayTransactionRepository = void 0;
const reversing_innopay_transaction_entity_1 = require("../../domains/innopay-transaction/domain/entities/reversing-innopay-transaction.entity");
const reversing_innopay_transaction_orm_entity_1 = require("../../../infrastructure/database/entities/reversing-innopay-transaction.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const reversing_innopay_transaction_orm_mapper_1 = require("./reversing-innopay-transaction.orm-mapper");
let ReversingInnopayTransactionRepository = class ReversingInnopayTransactionRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new reversing_innopay_transaction_orm_mapper_1.ReversingInnopayTransactionOrmMapper(reversing_innopay_transaction_entity_1.ReversingInnopayTransactionEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await reversing_innopay_transaction_orm_entity_1.ReversingInnopayTransactionOrmEntity.query(trx).findOne(where);
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}) {
        const where = this.prepareQuery(params);
        const found = await reversing_innopay_transaction_orm_entity_1.ReversingInnopayTransactionOrmEntity.query().where(where);
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findOneById(id) {
        const found = await reversing_innopay_transaction_orm_entity_1.ReversingInnopayTransactionOrmEntity.query().findById(id);
        if (!found) {
            return found;
        }
        return this.mapper.toDomainEntity(found);
    }
    async findByCustomerReference(customerReference) {
        const found = await reversing_innopay_transaction_orm_entity_1.ReversingInnopayTransactionOrmEntity.query().findOne({ customerReference });
        if (!found) {
            return found;
        }
        return this.mapper.toDomainEntity(found);
    }
    async save(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await reversing_innopay_transaction_orm_entity_1.ReversingInnopayTransactionOrmEntity.startTransaction();
        try {
            const result = await reversing_innopay_transaction_orm_entity_1.ReversingInnopayTransactionOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
        await reversing_innopay_transaction_orm_entity_1.ReversingInnopayTransactionOrmEntity.query().delete().where('id', entity.id.value);
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
        return where;
    }
};
ReversingInnopayTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], ReversingInnopayTransactionRepository);
exports.ReversingInnopayTransactionRepository = ReversingInnopayTransactionRepository;
//# sourceMappingURL=reversing-innopay-transaction.repository.js.map