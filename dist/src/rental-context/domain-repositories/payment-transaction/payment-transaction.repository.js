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
exports.PaymentTransactionRepository = void 0;
const types_1 = require("../../domains/payment-transaction/domain/types");
const payment_transaction_orm_entity_1 = require("../../../infrastructure/database/entities/payment-transaction.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const payment_transaction_entity_1 = require("../../domains/payment-transaction/domain/entities/payment-transaction.entity");
const payment_transaction_orm_mapper_1 = require("./payment-transaction.orm-mapper");
let PaymentTransactionRepository = class PaymentTransactionRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new payment_transaction_orm_mapper_1.PaymentTransactionOrmMapper(payment_transaction_entity_1.PaymentTransactionEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).findOne(where).withGraphFetched({ invoices: true });
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).where(where).withGraphFetched({ invoices: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).findById(id).withGraphFetched({ invoices: true });
        if (!found) {
            return found;
        }
        return this.mapper.toDomainEntity(found, trxId);
    }
    async findNextCashIn(contractId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx)
            .findOne({ contractId, status: types_1.PaymentTransactionStatus.CASH_IN_WAITING })
            .orderBy('withdrawFundsDate', 'ASC')
            .withGraphFetched({ invoices: true });
        if (!found) {
            return found;
        }
        return this.mapper.toDomainEntity(found, trxId);
    }
    async findActualCashInWaitingIds(trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const founds = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx)
            .where({ isRecurring: true })
            .where({ status: types_1.PaymentTransactionStatus.CASH_IN_WAITING })
            .where('withdrawFundsDate', '<', 'NOW()')
            .withGraphFetched({ contract: true }, { joinOperation: 'innerJoin' })
            .modifyGraph('contract', (builder) => builder.where({ isPending: false }))
            .select('id');
        if (!founds) {
            return founds;
        }
        return founds.map((found) => new uuid_value_object_1.UUID(found.id));
    }
    async findActualCashOutWaitingIds(trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const founds = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx)
            .where({ status: types_1.PaymentTransactionStatus.CASH_OUT_WAITING })
            .where((mainBuilder) => {
            mainBuilder
                .where((builder) => {
                builder.where({ isRecurring: true }).where('startDate', '<=', 'NOW()');
            })
                .orWhere((builder) => {
                builder
                    .where({ isRecurring: false })
                    .whereRaw(`"startDate" <= NOW() - INTERVAL '${payment_transaction_entity_1.PaymentTransactionEntity.CASH_OUT_AFTER_ARRIVAL_DAYS} day'`);
            });
        })
            .withGraphFetched({ contract: true }, { joinOperation: 'innerJoin' })
            .modifyGraph('contract', (builder) => builder.where({ isPending: false }))
            .select('id');
        if (!founds) {
            return founds;
        }
        return founds.map((found) => new uuid_value_object_1.UUID(found.id));
    }
    async findContractFirstPayment(contractId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).findOne({ isRecurring: false, contractId });
        if (!found) {
            return found;
        }
        return this.mapper.toDomainEntity(found, trxId);
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.startTransaction();
        try {
            const result = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
                insertMissing: true,
                noDelete: true,
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
        const [trx, isOwnTrx] = trxId
            ? [this.unitOfWork.getTrx(trxId), false]
            : [await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.startTransaction(), true];
        try {
            await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).delete().where('id', entity.id.value);
            if (isOwnTrx) {
                await trx.commit();
                await trx.executionPromise;
            }
            return entity;
        }
        catch (err) {
            if (isOwnTrx) {
                await trx.rollback();
            }
            throw err;
        }
    }
    async deleteByContractId(contractId, trxId) {
        const [trx, isOwnTrx] = trxId
            ? [this.unitOfWork.getTrx(trxId), false]
            : [await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.startTransaction(), true];
        try {
            const paymentTransactionSubQuery = payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).where({ contractId });
            await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.relatedQuery('invoices', trx).for(paymentTransactionSubQuery).delete();
            await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).delete().where({ contractId });
            if (isOwnTrx) {
                await trx.commit();
                await trx.executionPromise;
            }
        }
        catch (err) {
            if (isOwnTrx) {
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
        if (params.contractId) {
            where.contractId = params.contractId.value;
        }
        if (params.status) {
            where.status = params.status;
        }
        if (params.withdrawFundsDate) {
            where.withdrawFundsDate = params.withdrawFundsDate.value;
        }
        if (params.totalAmountPayable) {
            where.totalAmountPayable = params.totalAmountPayable.cost;
        }
        return where;
    }
};
PaymentTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], PaymentTransactionRepository);
exports.PaymentTransactionRepository = PaymentTransactionRepository;
//# sourceMappingURL=payment-transaction.repository.js.map