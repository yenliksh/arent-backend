"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdIdentificatorOrmMapper = void 0;
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
class ApartmentAdIdentificatorOrmMapper extends orm_mapper_base_1.OrmMapper {
    toDomainProps(ormEntity) {
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const apartmentId = new uuid_value_object_1.UUID(ormEntity.apartmentId);
        const props = {
            apartmentId,
            adSearchId: ormEntity.adSearchId,
            titleSeo: ormEntity.titleSeo,
            keywordsSeo: ormEntity.keywordsSeo,
            descriptionSeo: ormEntity.descriptionSeo,
        };
        return Promise.resolve({ id, props });
    }
    async toOrmProps(entity) {
        const props = entity.getPropsCopy();
        const ormProps = {
            apartmentId: props.apartmentId.value,
            titleSeo: props.titleSeo,
            keywordsSeo: props.keywordsSeo,
            descriptionSeo: props.descriptionSeo,
        };
        return ormProps;
    }
}
exports.ApartmentAdIdentificatorOrmMapper = ApartmentAdIdentificatorOrmMapper;
//# sourceMappingURL=apartment-ad-identificator.orm-mapper.js.map