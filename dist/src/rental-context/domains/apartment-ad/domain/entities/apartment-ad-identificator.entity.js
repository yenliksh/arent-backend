"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdIdentificatorEntity = void 0;
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const illegal_operation_exception_1 = require("../../../../../libs/exceptions/illegal-operation.exception");
class ApartmentAdIdentificatorEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ apartmentId, titleSeo, slug, keywordsSeo, descriptionSeo, }) {
        const props = {
            apartmentId,
            titleSeo,
            keywordsSeo,
            descriptionSeo,
            slug,
        };
        const id = uuid_value_object_1.UUID.generate();
        const apartmentAd = new ApartmentAdIdentificatorEntity({ id, props });
        return apartmentAd;
    }
    adminEditH1MetaTag(h1) {
        this.props.keywordsSeo = h1;
        return this;
    }
    adminEditTitleMetaTag(title) {
        this.props.titleSeo = title;
        return this;
    }
    adminEditDescriptionMetaTag(description) {
        this.props.descriptionSeo = description;
        return this;
    }
    validate() {
        const { apartmentId } = this.props;
        if (!apartmentId) {
            throw new illegal_operation_exception_1.IllegalOperationException('Apartment should have apartment id');
        }
    }
}
exports.ApartmentAdIdentificatorEntity = ApartmentAdIdentificatorEntity;
//# sourceMappingURL=apartment-ad-identificator.entity.js.map