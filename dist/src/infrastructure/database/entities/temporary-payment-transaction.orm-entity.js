"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryPaymentTransactionOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const contract_orm_entity_1 = require("./contract.orm-entity");
class TemporaryPaymentTransactionOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return TemporaryPaymentTransactionOrmEntity.fromJson(data);
    }
}
exports.TemporaryPaymentTransactionOrmEntity = TemporaryPaymentTransactionOrmEntity;
TemporaryPaymentTransactionOrmEntity.tableName = 'temporary_payment_transactions';
TemporaryPaymentTransactionOrmEntity.relationMappings = () => {
    return {
        contract: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: contract_orm_entity_1.ContractOrmEntity,
            join: {
                from: `${TemporaryPaymentTransactionOrmEntity.tableName}.contractId`,
                to: `${contract_orm_entity_1.ContractOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=temporary-payment-transaction.orm-entity.js.map