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
var ApartmentAdIdentificatorResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdIdentificatorResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdIdentificatorResponse = ApartmentAdIdentificatorResponse_1 = class ApartmentAdIdentificatorResponse {
    static create(props) {
        const payload = new ApartmentAdIdentificatorResponse_1();
        payload.apartmentId = props.apartmentId;
        payload.keywordsSeo = props.keywordsSeo || '';
        payload.titleSeo = props.titleSeo || '';
        payload.descriptionSeo = props.descriptionSeo || '';
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { apartmentId: { required: true, type: () => String }, keywordsSeo: { required: false, type: () => String }, titleSeo: { required: false, type: () => String }, descriptionSeo: { required: false, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdIdentificatorResponse.prototype, "apartmentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdIdentificatorResponse.prototype, "keywordsSeo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdIdentificatorResponse.prototype, "titleSeo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdIdentificatorResponse.prototype, "descriptionSeo", void 0);
ApartmentAdIdentificatorResponse = ApartmentAdIdentificatorResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ApartmentAdIdentificatorResponse);
exports.ApartmentAdIdentificatorResponse = ApartmentAdIdentificatorResponse;
//# sourceMappingURL=apartment-ad-identificator.response.dto.js.map