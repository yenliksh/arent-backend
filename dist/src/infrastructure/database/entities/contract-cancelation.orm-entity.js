"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCancelationOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const contract_orm_entity_1 = require("./contract.orm-entity");
class ContractCancelationOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ContractCancelationOrmEntity.fromJson(data);
    }
}
exports.ContractCancelationOrmEntity = ContractCancelationOrmEntity;
ContractCancelationOrmEntity.tableName = 'contract_cancelations';
ContractCancelationOrmEntity.relationMappings = () => {
    return {
        contract: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: contract_orm_entity_1.ContractOrmEntity,
            join: {
                from: `${ContractCancelationOrmEntity.tableName}.contractId`,
                to: `${contract_orm_entity_1.ContractOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=contract-cancelation.orm-entity.js.map