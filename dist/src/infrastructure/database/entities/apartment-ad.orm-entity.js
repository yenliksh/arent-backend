"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const apartment_ad_complaint_orm_entity_1 = require("./apartment-ad-complaint.orm-entity");
const contract_request_orm_entity_1 = require("./contract-request.orm-entity");
const contract_orm_entity_1 = require("./contract.orm-entity");
const innopay_card_orm_entity_1 = require("./innopay-card.orm-entity");
const long_term_rent_orm_entity_1 = require("./long-term-rent.orm-entity");
const short_term_rent_orm_entity_1 = require("./short-term-rent.orm-entity");
const user_orm_entity_1 = require("./user.orm-entity");
class ApartmentAdOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ApartmentAdOrmEntity.fromJson(data);
    }
}
exports.ApartmentAdOrmEntity = ApartmentAdOrmEntity;
ApartmentAdOrmEntity.tableName = 'apartment_ads';
ApartmentAdOrmEntity.relationMappings = () => {
    return {
        longTermRent: {
            relation: objection_1.Model.HasOneRelation,
            modelClass: long_term_rent_orm_entity_1.LongTermRentOrmEntity,
            join: {
                from: `${ApartmentAdOrmEntity.tableName}.id`,
                to: `${long_term_rent_orm_entity_1.LongTermRentOrmEntity.tableName}.apartmentAdId`,
            },
        },
        shortTermRent: {
            relation: objection_1.Model.HasOneRelation,
            modelClass: short_term_rent_orm_entity_1.ShortTermRentOrmEntity,
            join: {
                from: `${ApartmentAdOrmEntity.tableName}.id`,
                to: `${short_term_rent_orm_entity_1.ShortTermRentOrmEntity.tableName}.apartmentAdId`,
            },
        },
        landlord: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: user_orm_entity_1.UserOrmEntity,
            join: {
                from: `${ApartmentAdOrmEntity.tableName}.landlordId`,
                to: `${user_orm_entity_1.UserOrmEntity.tableName}.id`,
            },
        },
        innopayCard: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: innopay_card_orm_entity_1.InnopayCardOrmEntity,
            join: {
                from: `${ApartmentAdOrmEntity.tableName}.innopayCardId`,
                to: `${innopay_card_orm_entity_1.InnopayCardOrmEntity.tableName}.id`,
            },
        },
        contractRequests: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: contract_request_orm_entity_1.ContractRequestOrmEntity,
            join: {
                from: `${ApartmentAdOrmEntity.tableName}.id`,
                to: `${contract_request_orm_entity_1.ContractRequestOrmEntity.tableName}.apartmentAdId`,
            },
        },
        contracts: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: contract_orm_entity_1.ContractOrmEntity,
            join: {
                from: `${ApartmentAdOrmEntity.tableName}.id`,
                to: `${contract_orm_entity_1.ContractOrmEntity.tableName}.apartmentAdId`,
            },
        },
        apartmentAdComplaints: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: apartment_ad_complaint_orm_entity_1.ApartmentAdComplaintOrmEntity,
            join: {
                from: `${ApartmentAdOrmEntity.tableName}.id`,
                to: `${apartment_ad_complaint_orm_entity_1.ApartmentAdComplaintOrmEntity.tableName}.apartmentAdId`,
            },
        },
    };
};
//# sourceMappingURL=apartment-ad.orm-entity.js.map