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
exports.RentPeriodVersionRepository = void 0;
const rent_period_version_orm_entity_1 = require("../../../infrastructure/database/entities/rent-period-version.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const rent_period_version_entity_1 = require("../../domains/rent-period-version/domain/rent-period-version.entity");
const rent_period_version_orm_mapper_1 = require("./rent-period-version.orm-mapper");
let RentPeriodVersionRepository = class RentPeriodVersionRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new rent_period_version_orm_mapper_1.RentPeriodVersionOrmMapper(rent_period_version_entity_1.RentPeriodVersionEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const found = await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query(trx).findOne(where);
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}) {
        const where = this.prepareQuery(params);
        const found = await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query().where(where);
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findOneById(id) {
        const rentPeriodVersion = await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query().findById(id);
        if (!rentPeriodVersion) {
            return rentPeriodVersion;
        }
        return this.mapper.toDomainEntity(rentPeriodVersion);
    }
    async findLast(trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const lastRentPeriodVersion = await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query(trx)
            .orderBy([{ column: 'version', order: 'DESC' }])
            .limit(1)
            .first();
        if (!lastRentPeriodVersion) {
            return lastRentPeriodVersion;
        }
        return this.mapper.toDomainEntity(lastRentPeriodVersion, trxId);
    }
    async save(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.startTransaction();
        try {
            const result = await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
        await rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.query().delete().where('id', entity.id.value);
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
        if (params.version) {
            where.version = params.version;
        }
        return where;
    }
};
RentPeriodVersionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], RentPeriodVersionRepository);
exports.RentPeriodVersionRepository = RentPeriodVersionRepository;
//# sourceMappingURL=rent-period-version.repository.js.map