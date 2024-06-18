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
var ApartmentAdSlugResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdSlugResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdSlugResponse = ApartmentAdSlugResponse_1 = class ApartmentAdSlugResponse {
    static create(props) {
        const payload = new ApartmentAdSlugResponse_1();
        payload.titleSeo = props.titleSeo;
        payload.adSearchId = props.adSearchId;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { titleSeo: { required: true, type: () => String }, adSearchId: { required: false, type: () => Number } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdSlugResponse.prototype, "titleSeo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ApartmentAdSlugResponse.prototype, "adSearchId", void 0);
ApartmentAdSlugResponse = ApartmentAdSlugResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ApartmentAdSlugResponse);
exports.ApartmentAdSlugResponse = ApartmentAdSlugResponse;
//# sourceMappingURL=apartment-ad-slug-response.dto.js.map