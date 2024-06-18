"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const contract_orm_entity_1 = require("./contract.orm-entity");
const innopay_users_orm_entity_1 = require("./innopay-users.orm-entity");
class InnopayCardOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return InnopayCardOrmEntity.fromJson(data);
    }
}
exports.InnopayCardOrmEntity = InnopayCardOrmEntity;
InnopayCardOrmEntity.tableName = 'innopay_cards';
InnopayCardOrmEntity.relationMappings = () => {
    return {
        innopayUser: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: innopay_users_orm_entity_1.InnopayUsersOrmEntity,
            join: {
                from: `${InnopayCardOrmEntity.tableName}.innopayId`,
                to: `${innopay_users_orm_entity_1.InnopayUsersOrmEntity.tableName}.id`,
            },
        },
        contracts: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: contract_orm_entity_1.ContractOrmEntity,
            join: {
                from: `${InnopayCardOrmEntity.tableName}.id`,
                to: `${contract_orm_entity_1.ContractOrmEntity.tableName}.tenantInnopayCardId`,
            },
        },
    };
};
//# sourceMappingURL=innopay-card.orm-entity.js.map