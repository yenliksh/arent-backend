"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdComplaintOrmMapper = void 0;
const ad_complaint_value_object_1 = require("../../domains/apartment-ad-complaint/domain/value-objects/ad-complaint.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
class ApartmentAdComplaintOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        const props = entity.getPropsCopy();
        const { type, reason } = props.complaint.unpack();
        const ormProps = {
            userId: props.userId.value,
            apartmentAdId: props.apartmentAdId.value,
            type: type,
            reason,
            isViewed: props.isViewed,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity) {
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const props = {
            userId: new uuid_value_object_1.UUID(ormEntity.userId),
            apartmentAdId: new uuid_value_object_1.UUID(ormEntity.apartmentAdId),
            complaint: ad_complaint_value_object_1.AdComplaintVO.create(ormEntity.type, ormEntity.reason),
            isViewed: ormEntity.isViewed,
        };
        return { id, props };
    }
}
exports.ApartmentAdComplaintOrmMapper = ApartmentAdComplaintOrmMapper;
//# sourceMappingURL=apartment-ad-complaint.orm-mapper.js.map