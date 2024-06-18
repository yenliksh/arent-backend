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
exports.ApartmentAdIdentificatorRepository = void 0;
const apartment_ad_identificator_entity_1 = require("../../domains/apartment-ad/domain/entities/apartment-ad-identificator.entity");
const apartment_ad_identificator_orm_entity_1 = require("../../../infrastructure/database/entities/apartment-ad-identificator.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const apartment_ad_identificator_orm_mapper_1 = require("./apartment-ad-identificator.orm-mapper");
let ApartmentAdIdentificatorRepository = class ApartmentAdIdentificatorRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new apartment_ad_identificator_orm_mapper_1.ApartmentAdIdentificatorOrmMapper(apartment_ad_identificator_entity_1.ApartmentAdIdentificatorEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.startTransaction();
        try {
            const result = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const found = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query()
            .findOne(where)
            .withGraphFetched({ longTermRent: true, shortTermRent: true });
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const where = this.prepareQuery(params);
        const found = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query(trx)
            .where(where)
            .withGraphFetched({ longTermRent: true, shortTermRent: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    async findOneById(id) {
        const apartmentAd = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().findOne({ id });
        if (!apartmentAd) {
            return apartmentAd;
        }
        return this.mapper.toDomainEntity(apartmentAd);
    }
    async findOneBySearchId(id) {
        const apartmentAd = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().findOne({ adSearchId: id });
        if (!apartmentAd) {
            return apartmentAd;
        }
        return this.mapper.toDomainEntity(apartmentAd);
    }
    async findOneByApartmentId(id) {
        const apartmentAd = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().findOne({ apartmentId: id });
        if (!apartmentAd) {
            return;
        }
        return this.mapper.toDomainEntity(apartmentAd);
    }
    async findByApartmentId(id) {
        const apartmentAds = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().where({ apartmentId: id });
        if (!apartmentAds) {
            return;
        }
        const result = [];
        apartmentAds.forEach((ap) => {
            this.mapper.toDomainEntity(ap).then((el) => {
                result.push(el);
            });
        });
        return result;
    }
    async findManyByApartmentIds(ids) {
        const apartmentAds = [];
        ids.forEach(async (id) => {
            const apAd = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().findOne({ apartmentId: id });
            if (!apAd)
                return;
            apartmentAds.push(apAd);
        });
        return apartmentAds;
    }
    async updateByApartmentId(id, titleSeo, slug) {
        const apartmentAd = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query()
            .update({ titleSeo, slug })
            .where({ apartmentId: id });
        if (!apartmentAd) {
            return;
        }
        return true;
    }
    async delete(entity, trxId) {
        entity.validate();
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.startTransaction();
        try {
            await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query(trx).delete().where('id', entity.id.value);
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
    async deleteByApartmentId(id) {
        const apartmentAd = await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().delete().where({ apartmentId: id });
        if (!apartmentAd) {
            return;
        }
        return true;
    }
    async deleteAll() {
        await apartment_ad_identificator_orm_entity_1.ApartmentAdIdentificatorOrmEntity.query().delete().where({});
        return true;
    }
    prepareQuery(params) {
        const where = {};
        if (params.id) {
            where.id = params.id.value;
        }
        if (params.apartmentId) {
            where.apartmentId = params.apartmentId.value;
        }
        return where;
    }
};
ApartmentAdIdentificatorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], ApartmentAdIdentificatorRepository);
exports.ApartmentAdIdentificatorRepository = ApartmentAdIdentificatorRepository;
//# sourceMappingURL=apartment-ad-identificator.repository.js.map