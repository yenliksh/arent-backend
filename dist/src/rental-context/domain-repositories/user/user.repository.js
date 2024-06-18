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
exports.UserRepository = void 0;
const apartment_ad_orm_entity_1 = require("../../../infrastructure/database/entities/apartment-ad.orm-entity");
const user_orm_entity_1 = require("../../../infrastructure/database/entities/user.orm-entity");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const user_entity_1 = require("../../domains/user/domain/entities/user.entity");
const user_orm_mapper_1 = require("./user.orm-mapper");
let UserRepository = class UserRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new user_orm_mapper_1.UserOrmMapper(user_entity_1.UserEntity));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}) {
        const where = this.prepareQuery(params);
        const found = await user_orm_entity_1.UserOrmEntity.query().findOne(where);
        return found ? this.mapper.toDomainEntity(found) : undefined;
    }
    async findMany(params = {}) {
        const where = this.prepareQuery(params);
        const found = await user_orm_entity_1.UserOrmEntity.query().where(where);
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findOneById(id, trxId) {
        const [trx, isOwnTrx] = trxId
            ? [this.unitOfWork.getTrx(trxId), false]
            : [await user_orm_entity_1.UserOrmEntity.startTransaction(), true];
        try {
            const user = await user_orm_entity_1.UserOrmEntity.query(trx).findById(id);
            if (isOwnTrx) {
                await trx.commit();
                await trx.executionPromise;
            }
            return user ? this.mapper.toDomainEntity(user, trxId) : undefined;
        }
        catch (err) {
            if (isOwnTrx) {
                await trx.rollback();
            }
            throw err;
        }
    }
    async findOneByEmail(email) {
        const found = await user_orm_entity_1.UserOrmEntity.query().findOne('email', email);
        if (!found) {
            return found;
        }
        return this.mapper.toDomainEntity(found);
    }
    async findByApartmentAdId(apartmentAdId, trxId) {
        const [trx, isOwnTrx] = trxId
            ? [this.unitOfWork.getTrx(trxId), false]
            : [await user_orm_entity_1.UserOrmEntity.startTransaction(), true];
        try {
            const apartmentAdSubQuery = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(trx).findById(apartmentAdId);
            const user = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.relatedQuery('landlord', trx).for(apartmentAdSubQuery).limit(1).first();
            if (isOwnTrx) {
                await trx.commit();
                await trx.executionPromise;
            }
            return user ? this.mapper.toDomainEntity(user, trxId) : undefined;
        }
        catch (err) {
            if (isOwnTrx) {
                await trx.rollback();
            }
            throw err;
        }
    }
    async existsByEmail(email) {
        const found = await user_orm_entity_1.UserOrmEntity.query().findOne('email', email);
        if (found) {
            return true;
        }
        return false;
    }
    async existsByPhone(phone) {
        const found = await user_orm_entity_1.UserOrmEntity.query().findOne('phone', phone);
        if (found) {
            return true;
        }
        return false;
    }
    async findOneByPhone(email) {
        const found = await user_orm_entity_1.UserOrmEntity.query().findOne('phone', email);
        if (!found) {
            return found;
        }
        return this.mapper.toDomainEntity(found);
    }
    async save(entity, trxId) {
        const [trx, isOwnTrx] = trxId
            ? [this.unitOfWork.getTrx(trxId), false]
            : [await user_orm_entity_1.UserOrmEntity.startTransaction(), true];
        try {
            const result = await user_orm_entity_1.UserOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
                insertMissing: true,
            });
            if (isOwnTrx) {
                await trx.commit();
                await trx.executionPromise;
            }
            return new uuid_value_object_1.UUID(result.id);
        }
        catch (err) {
            if (isOwnTrx) {
                await trx.rollback();
            }
            throw err;
        }
    }
    async delete(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await user_orm_entity_1.UserOrmEntity.startTransaction();
        try {
            await user_orm_entity_1.UserOrmEntity.query(trx).delete().where('id', entity.id.value);
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
        if (params.email) {
            where.email = params.email.value;
        }
        if (params.phone) {
            where.phone = params.phone.value;
        }
        return where;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map