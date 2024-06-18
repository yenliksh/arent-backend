"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintOrmMapper = void 0;
const user_complaint_value_object_1 = require("../../domains/user-complaint/domain/value-objects/user-complaint.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
class UserComplaintOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        const props = entity.getPropsCopy();
        const { type, reason } = props.complaint.unpack();
        const ormProps = {
            senderUserId: props.senderUserId.value,
            recipientUserId: props.recipientUserId.value,
            type,
            reason,
            isViewed: props.isViewed,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity) {
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const props = {
            senderUserId: new uuid_value_object_1.UUID(ormEntity.senderUserId),
            recipientUserId: new uuid_value_object_1.UUID(ormEntity.recipientUserId),
            complaint: user_complaint_value_object_1.UserComplaintVO.create(ormEntity.type, ormEntity.reason),
            isViewed: ormEntity.isViewed,
        };
        return { id, props };
    }
}
exports.UserComplaintOrmMapper = UserComplaintOrmMapper;
//# sourceMappingURL=user-complaint.orm-mapper.js.map