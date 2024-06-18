"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReversingInnopayTransactionOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
class ReversingInnopayTransactionOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ReversingInnopayTransactionOrmEntity.fromJson(data);
    }
}
exports.ReversingInnopayTransactionOrmEntity = ReversingInnopayTransactionOrmEntity;
ReversingInnopayTransactionOrmEntity.tableName = 'reversing_innopay_transactions';
//# sourceMappingURL=reversing-innopay-transaction.orm-entity.js.map