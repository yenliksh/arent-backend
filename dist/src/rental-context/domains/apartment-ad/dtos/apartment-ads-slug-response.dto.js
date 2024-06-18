"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ApartmentAdsSlugResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdsSlugResponse = void 0;
const openapi = require("@nestjs/swagger");
const slug_model_1 = require("../../../../infrastructure/models/slug.model");
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdsSlugResponse = ApartmentAdsSlugResponse_1 = class ApartmentAdsSlugResponse {
    static create(props) {
        const payload = new ApartmentAdsSlugResponse_1();
        const slugs = props.apAdIds.map((el) => {
            return { id: el.id, slug: `${el.adSearchId}-${el.titleSeo}`, apartmentId: el.apartmentId };
        });
        payload.slugs = slugs;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { slugs: { required: true, type: () => [require("../../../../infrastructure/models/slug.model").SlugModel] } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => [slug_model_1.SlugModel]),
    __metadata("design:type", Array)
], ApartmentAdsSlugResponse.prototype, "slugs", void 0);
ApartmentAdsSlugResponse = ApartmentAdsSlugResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ApartmentAdsSlugResponse);
exports.ApartmentAdsSlugResponse = ApartmentAdsSlugResponse;
//# sourceMappingURL=apartment-ads-slug-response.dto.js.map