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
exports.UserComplaintRepository = void 0;
const user_complaint_entity_1 = require("../../domains/user-complaint/domain/entities/user-complaint.entity");
const user_complaint_orm_entity_1 = require("../../../infrastructure/database/entities/user-complaint.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const user_complaint_orm_mapper_1 = require("./user-complaint.orm-mapper");
let UserComplaintRepository = class UserComplaintRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new user_complaint_orm_mapper_1.UserComplaintOrmMapper(user_complaint_entity_1.UserComplaintEntity));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}) {
        const where = this.prepareQuery(params);
        const found = await user_complaint_orm_entity_1.UserComplaintOrmEntity.query().findOne(where);
        return found ? this.mapper.toDomainEntity(found) : undefined;
    }
    async findMany(params = {}) {
        const where = this.prepareQuery(params);
        const found = await user_complaint_orm_entity_1.UserComplaintOrmEntity.query().where(where);
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
    }
    async findOneById(id) {
        const apartmentAdComplaint = await user_complaint_orm_entity_1.UserComplaintOrmEntity.query().findById(id);
        if (!apartmentAdComplaint) {
            return apartmentAdComplaint;
        }
        return this.mapper.toDomainEntity(apartmentAdComplaint);
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await user_complaint_orm_entity_1.UserComplaintOrmEntity.startTransaction();
        try {
            const result = await user_complaint_orm_entity_1.UserComplaintOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
        const trx = await user_complaint_orm_entity_1.UserComplaintOrmEntity.startTransaction();
        try {
            await user_complaint_orm_entity_1.UserComplaintOrmEntity.query(trx).delete().where('id', entity.id.value);
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
        if (params.senderUserId) {
            where.senderUserId = params.senderUserId.value;
        }
        if (params.recipientUserId) {
            where.recipientUserId = params.recipientUserId.value;
        }
        return where;
    }
};
UserComplaintRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], UserComplaintRepository);
exports.UserComplaintRepository = UserComplaintRepository;
//# sourceMappingURL=user-complaint.repository.js.map