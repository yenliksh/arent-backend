"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const apartment_ad_orm_entity_1 = require("./apartment-ad.orm-entity");
const contract_orm_entity_1 = require("./contract.orm-entity");
class ContractRequestOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ContractRequestOrmEntity.fromJson(data);
    }
}
exports.ContractRequestOrmEntity = ContractRequestOrmEntity;
ContractRequestOrmEntity.tableName = 'contract_requests';
ContractRequestOrmEntity.relationMappings = () => {
    return {
        apartmentAd: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: apartment_ad_orm_entity_1.ApartmentAdOrmEntity,
            join: {
                from: `${ContractRequestOrmEntity.tableName}.apartmentAdId`,
                to: `${apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName}.id`,
            },
        },
        contract: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: contract_orm_entity_1.ContractOrmEntity,
            join: {
                from: `${ContractRequestOrmEntity.tableName}.id`,
                to: `${contract_orm_entity_1.ContractOrmEntity.tableName}.contractRequestId`,
            },
        },
    };
};
//# sourceMappingURL=contract-request.orm-entity.js.map