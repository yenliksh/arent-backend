"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReversingInnopayTransactionOrmMapper = void 0;
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
class ReversingInnopayTransactionOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        const { customerReference, isReversed } = entity.getPropsCopy();
        const ormProps = {
            customerReference,
            isReversed,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity) {
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const props = {
            customerReference: ormEntity.customerReference,
            isReversed: ormEntity.isReversed,
        };
        return { id, props };
    }
}
exports.ReversingInnopayTransactionOrmMapper = ReversingInnopayTransactionOrmMapper;
//# sourceMappingURL=reversing-innopay-transaction.orm-mapper.js.map