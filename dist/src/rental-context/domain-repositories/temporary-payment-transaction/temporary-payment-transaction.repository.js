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
exports.TemporaryPaymentTransactionRepository = void 0;
const temporary_payment_transaction_entity_1 = require("../../domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity");
const temporary_payment_transaction_orm_entity_1 = require("../../../infrastructure/database/entities/temporary-payment-transaction.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const temporary_payment_transaction_orm_mapper_1 = require("./temporary-payment-transaction.orm-mapper");
let TemporaryPaymentTransactionRepository = class TemporaryPaymentTransactionRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new temporary_payment_transaction_orm_mapper_1.TemporaryPaymentTransactionOrmMapper(temporary_payment_transaction_entity_1.TemporaryPaymentTransactionEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}) {
        const where = this.prepareQuery(params);
        const found = await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.query().findOne(where);
        return found ? this.mapper.toDomainEntity(found) : undefined;
    }
    async findMany(params = {}) {
        const where = this.prepareQuery(params);
        const found = await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.query().where(where);
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findByContractId(contractId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.query(trx).where({ contractId });
        return Promise.all(found.map((i) => this.mapper.toDomainEntity(i, trxId)));
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.query(trx).findById(id);
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.startTransaction();
        try {
            const result = await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
    async delete(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.startTransaction();
        try {
            await temporary_payment_transaction_orm_entity_1.TemporaryPaymentTransactionOrmEntity.query(trx).delete().where('id', entity.id.value);
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
TemporaryPaymentTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], TemporaryPaymentTransactionRepository);
exports.TemporaryPaymentTransactionRepository = TemporaryPaymentTransactionRepository;
//# sourceMappingURL=temporary-payment-transaction.repository.js.map