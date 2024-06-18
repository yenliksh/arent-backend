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
exports.ContractRepository = void 0;
const types_1 = require("../../domains/payment-transaction/domain/types");
const chat_orm_entity_1 = require("../../../infrastructure/database/entities/chat.orm-entity");
const contract_orm_entity_1 = require("../../../infrastructure/database/entities/contract.orm-entity");
const payment_transaction_orm_entity_1 = require("../../../infrastructure/database/entities/payment-transaction.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../infrastructure/enums");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const exceptions_1 = require("../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const contract_entity_1 = require("../../domains/contract/domain/entities/contract.entity");
const contract_orm_mapper_1 = require("./contract.orm-mapper");
let ContractRepository = class ContractRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new contract_orm_mapper_1.ContractOrmMapper(contract_entity_1.ContractEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await contract_orm_entity_1.ContractOrmEntity.query(trx).findOne(where).withGraphFetched({ contractCancelation: true });
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}) {
        const where = this.prepareQuery(params);
        const found = await contract_orm_entity_1.ContractOrmEntity.query().where(where).withGraphFetched({ contractCancelation: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findCompletedPastContracts() {
        const found = await contract_orm_entity_1.ContractOrmEntity.query()
            .where(`${contract_orm_entity_1.ContractOrmEntity.tableName}.status`, enums_1.ContractStatus.CONCLUDED)
            .andWhere(`${contract_orm_entity_1.ContractOrmEntity.tableName}.departureDate`, '<', 'NOW()')
            .innerJoinRelated({ transactions: true })
            .where((builder) => {
            builder
                .where('transactions.status', '!=', types_1.PaymentTransactionStatus.CASH_IN_WAITING)
                .andWhere('transactions.status', '!=', types_1.PaymentTransactionStatus.CASH_OUT_WAITING);
        })
            .withGraphFetched({ contractCancelation: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findOneByPaymentTransactionId(paymentTransactionId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const paymentTransactionSubQuery = payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).findById(paymentTransactionId);
        const contract = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.relatedQuery('contract', trx)
            .for(paymentTransactionSubQuery)
            .withGraphFetched({ contractCancelation: true })
            .limit(1)
            .first();
        return contract ? this.mapper.toDomainEntity(contract, trxId) : undefined;
    }
    async findManyByPaymentTransactionIds(paymentTransactionIds, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const paymentTransactionsSubQuery = payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query(trx).findByIds(paymentTransactionIds);
        const contracts = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.relatedQuery('contract', trx)
            .for(paymentTransactionsSubQuery)
            .withGraphFetched({ contractCancelation: true });
        return contracts.length ? Promise.all(contracts.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const contract = await contract_orm_entity_1.ContractOrmEntity.query(trx).findById(id).withGraphFetched({ contractCancelation: true });
        if (!contract) {
            return contract;
        }
        return this.mapper.toDomainEntity(contract, trxId);
    }
    async findOneByLandlordAndChatId(chatId, landlordId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const chatSubQuery = chat_orm_entity_1.ChatOrmEntity.query(trx).findById(chatId);
        const contract = await chat_orm_entity_1.ChatOrmEntity.relatedQuery('contract', trx)
            .for(chatSubQuery)
            .findOne({ landlordId })
            .withGraphFetched({ contractCancelation: true });
        if (!contract) {
            return contract;
        }
        return this.mapper.toDomainEntity(contract, trxId);
    }
    async findOneByTenantAndChatId(chatId, tenantId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const chatSubQuery = chat_orm_entity_1.ChatOrmEntity.query(trx).findById(chatId);
        const contract = await chat_orm_entity_1.ChatOrmEntity.relatedQuery('contract', trx)
            .for(chatSubQuery)
            .findOne({ tenantId })
            .withGraphFetched({ contractCancelation: true });
        if (!contract) {
            return contract;
        }
        return this.mapper.toDomainEntity(contract, trxId);
    }
    async findOneByMemberAndChatId(chatId, userId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const chatSubQuery = chat_orm_entity_1.ChatOrmEntity.query(trx).findById(chatId);
        const contract = await chat_orm_entity_1.ChatOrmEntity.relatedQuery('contract', trx)
            .for(chatSubQuery)
            .findOne((builder) => {
            builder.where({ tenantId: userId }).orWhere({ landlordId: userId });
        })
            .withGraphFetched({ contractCancelation: true });
        if (!contract) {
            return contract;
        }
        return this.mapper.toDomainEntity(contract, trxId);
    }
    async findManyForReject({ apartmentAdId, apartmentRentPeriodType, from, to, trxId, }) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const contractsQb = contract_orm_entity_1.ContractOrmEntity.query(trx)
            .where({ apartmentAdId, status: enums_1.ContractStatus.CREATED })
            .withGraphFetched({ contractCancelation: true });
        if (apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            if (!from || !to) {
                throw new exceptions_1.ArgumentInvalidException('From and to date required');
            }
            this.intersectionDates(contractsQb, from, to);
        }
        const contracts = await contractsQb;
        if (!contracts) {
            return contracts;
        }
        return Promise.all(contracts.map((contract) => this.mapper.toDomainEntity(contract, trxId)));
    }
    async findOneActiveByCardId(tenantInnopayCardId) {
        const found = await contract_orm_entity_1.ContractOrmEntity.query()
            .findOne({ tenantInnopayCardId })
            .whereNotIn('status', [enums_1.ContractStatus.COMPLETED, enums_1.ContractStatus.REJECTED])
            .withGraphFetched({ contractCancelation: true });
        return found ? this.mapper.toDomainEntity(found) : undefined;
    }
    async findByCustomerReference(customerReference, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await contract_orm_entity_1.ContractOrmEntity.query(trx)
            .findOne({ customerReference })
            .withGraphFetched({ contractCancelation: true });
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await contract_orm_entity_1.ContractOrmEntity.startTransaction();
        try {
            const result = await contract_orm_entity_1.ContractOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
    async saveMany(entities, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await contract_orm_entity_1.ContractOrmEntity.startTransaction();
        try {
            const ormEntities = await Promise.all(entities.map((i) => this.mapper.toOrmEntity(i)));
            const results = await contract_orm_entity_1.ContractOrmEntity.query(trx).upsertGraph(ormEntities, {
                insertMissing: true,
            });
            if (!trxId) {
                await trx.commit();
                await trx.executionPromise;
            }
            return results.map((i) => new uuid_value_object_1.UUID(i.id));
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
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await contract_orm_entity_1.ContractOrmEntity.startTransaction();
        try {
            await contract_orm_entity_1.ContractOrmEntity.query(trx).delete().where('id', entity.id.value);
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
    async checkApartmentIsFree({ apartmentAdId, apartmentRentPeriodType, trxId, from, to, selfContractId, }) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const foundContractQb = contract_orm_entity_1.ContractOrmEntity.query(trx)
            .where({ apartmentAdId })
            .andWhereNot({ status: enums_1.ContractStatus.REJECTED })
            .andWhereNot({ status: enums_1.ContractStatus.CREATED })
            .select('id');
        if (selfContractId) {
            foundContractQb.andWhereNot({ id: selfContractId });
        }
        const intersectionDatesQbMapper = {
            [enums_1.ApartmentRentPeriodType.SHORT_TERM]: () => this.intersectionDates(foundContractQb, from, to),
            [enums_1.ApartmentRentPeriodType.LONG_TERM]: () => foundContractQb.where('departureDate', '>', from),
        };
        intersectionDatesQbMapper[apartmentRentPeriodType]();
        const result = await foundContractQb;
        return !result.length;
    }
    async findManyActiveContracts(apartmentAdId) {
        const found = await contract_orm_entity_1.ContractOrmEntity.query()
            .where('apartmentAdId', apartmentAdId)
            .whereIn('status', [enums_1.ContractStatus.CONCLUDED, enums_1.ContractStatus.CREATED, enums_1.ContractStatus.OFFERING])
            .withGraphFetched({ contractCancelation: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findManyActiveContractsByUserId(userId, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await contract_orm_entity_1.ContractOrmEntity.query(trx)
            .whereIn('status', [enums_1.ContractStatus.CONCLUDED, enums_1.ContractStatus.CREATED, enums_1.ContractStatus.OFFERING])
            .andWhere((builder) => {
            builder.where('landlordId', userId).orWhere('tenantId', userId);
        })
            .withGraphFetched({ contractCancelation: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    prepareQuery(params) {
        var _a, _b;
        const where = {};
        if (params.id) {
            where.id = params.id.value;
        }
        if (params.createdAt) {
            where.createdAt = params.createdAt.value;
        }
        if (params.tenantId) {
            where.tenantId = params.tenantId.value;
        }
        if (params.landlordId) {
            where.landlordId = params.landlordId.value;
        }
        if (params.apartmentAdId) {
            where.apartmentAdId = params.apartmentAdId.value;
        }
        if (params.apartmentRentPeriodType) {
            where.apartmentRentPeriodType = params.apartmentRentPeriodType;
        }
        if (params.status) {
            where.status = params.status.value;
        }
        if ((_a = params.details) === null || _a === void 0 ? void 0 : _a.arrivalDate) {
            where.arrivalDate = params.details.arrivalDate.value;
        }
        if ((_b = params.details) === null || _b === void 0 ? void 0 : _b.departureDate) {
            where.departureDate = params.details.departureDate.value;
        }
        if (params.shortTermRentBookingType) {
            where.rentBookingType = params.shortTermRentBookingType.value;
        }
        return where;
    }
    intersectionDates(qb, from, to) {
        qb.andWhere((builder) => {
            builder
                .whereRaw(`(TIMESTAMP '${from}', TIMESTAMP '${to}') OVERLAPS ("arrivalDate", "departureDate")`)
                .orWhere((builder) => {
                builder
                    .where({ apartmentRentPeriodType: enums_1.ApartmentRentPeriodType.LONG_TERM })
                    .andWhere('arrivalDate', '<=', to);
            });
        });
    }
};
ContractRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], ContractRepository);
exports.ContractRepository = ContractRepository;
//# sourceMappingURL=contract.repository.js.map