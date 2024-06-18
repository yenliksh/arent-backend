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
exports.ApartmentAdRepository = void 0;
const apartment_ad_orm_entity_1 = require("../../../infrastructure/database/entities/apartment-ad.orm-entity");
const short_term_rent_locked_dates_orm_entity_1 = require("../../../infrastructure/database/entities/short-term-rent-locked-dates.orm-entity");
const unit_of_work_1 = require("../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../infrastructure/enums");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const objection_repository_base_1 = require("../../../libs/ddd/infrastructure/database/objection.repository.base");
const common_1 = require("@nestjs/common");
const apartment_ad_entity_1 = require("../../domains/apartment-ad/domain/entities/apartment-ad.entity");
const types_1 = require("../../domains/apartment-ad/domain/types");
const apartment_ad_orm_mapper_1 = require("./apartment-ad.orm-mapper");
let ApartmentAdRepository = class ApartmentAdRepository extends objection_repository_base_1.ObjectionRepositoryBase {
    constructor(unitOfWork) {
        super(new apartment_ad_orm_mapper_1.ApartmentAdOrmMapper(apartment_ad_entity_1.ApartmentAdEntity, unitOfWork));
        this.unitOfWork = unitOfWork;
    }
    async findOne(params = {}, trxId) {
        const where = this.prepareQuery(params);
        const found = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query()
            .findOne(where)
            .withGraphFetched({ longTermRent: true, shortTermRent: true });
        return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
    }
    async findMany(params = {}, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const where = this.prepareQuery(params);
        const found = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(trx)
            .where(where)
            .withGraphFetched({ longTermRent: true, shortTermRent: true });
        return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
    }
    async findOneById(id, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const apartmentAd = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(trx)
            .findById(id)
            .withGraphFetched({ longTermRent: true, shortTermRent: true });
        if (!apartmentAd) {
            return apartmentAd;
        }
        return this.mapper.toDomainEntity(apartmentAd, trxId);
    }
    async findWithAvailable(id, rentPeriodType, arrivalDate, departureDate, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
        const apartmentAdQb = apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(trx)
            .findById(id)
            .where((builder) => builder.where({ rentPeriodType }).orWhere({ rentPeriodType: types_1.RentPeriodType.ALL }))
            .withGraphFetched({ longTermRent: true, shortTermRent: true });
        if (rentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            if (!arrivalDate || !departureDate) {
                return;
            }
            apartmentAdQb
                .innerJoinRelated({ shortTermRent: true })
                .whereRaw(`DATE_PART('year', age('${departureDate}'::date, NOW())) < 1`)
                .whereRaw(`DATE_PART('month', age('${departureDate}'::date, NOW())) < "shortTermRent"."bookingAccessInMonths"`);
            const lockedDatesSubQuery = short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.query(trx)
                .whereRaw(`(DATE '${arrivalDate}', DATE '${departureDate}') OVERLAPS ("startDate"::date, "endDate"::date)`)
                .orWhere({ startDate: departureDate })
                .orWhere({ endDate: arrivalDate });
            const lockedShortTermRent = await short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.relatedQuery('shortTermRent', trx)
                .for(lockedDatesSubQuery)
                .findOne({ apartmentAdId: id });
            if (lockedShortTermRent) {
                return;
            }
        }
        const apartmentAd = await apartmentAdQb;
        if (!apartmentAd) {
            return apartmentAd;
        }
        return this.mapper.toDomainEntity(apartmentAd, trxId);
    }
    async save(entity, trxId) {
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.startTransaction();
        try {
            const result = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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
        const trx = trxId ? this.unitOfWork.getTrx(trxId) : await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.startTransaction();
        try {
            await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query(trx).delete().where('id', entity.id.value);
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
        var _a;
        const where = {};
        if (params.id) {
            where.id = params.id.value;
        }
        if (params.createdAt) {
            where.createdAt = params.createdAt.value;
        }
        if (params.landlordId) {
            where.landlordId = params.landlordId.value;
        }
        if (params.rentPeriodType) {
            where.rentPeriodType = params.rentPeriodType.value;
        }
        if ((_a = params.paymentMethod) === null || _a === void 0 ? void 0 : _a.innopayCardId) {
            where.innopayCardId = params.paymentMethod.innopayCardId;
        }
        return where;
    }
};
ApartmentAdRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unit_of_work_1.UnitOfWork])
], ApartmentAdRepository);
exports.ApartmentAdRepository = ApartmentAdRepository;
//# sourceMappingURL=apartment-ad.repository.js.map