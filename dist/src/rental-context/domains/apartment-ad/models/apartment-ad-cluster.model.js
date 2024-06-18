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
var ApartmentAdClusterModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdClusterModel = void 0;
const types_1 = require("../domain/types");
const file_key_helper_1 = require("../../../../libs/utils/file-key.helper");
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdClusterModel = ApartmentAdClusterModel_1 = class ApartmentAdClusterModel {
    static create(props) {
        const payload = new ApartmentAdClusterModel_1();
        const photo = props.photo;
        const title = props.title;
        const assignObject = {
            id: props.id,
            title,
            apartmentType: props.apartmentType,
            photo: (0, file_key_helper_1.prependDomainUrlToFileKey)(photo),
            cost: (0, minimal_unit_helper_1.toMinorUnitString)(props.cost),
            currency: props.currency,
            lat: props.geoPoint.lat,
            lng: props.geoPoint.lon,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdClusterModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdClusterModel.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.ApartmentType),
    __metadata("design:type", String)
], ApartmentAdClusterModel.prototype, "apartmentType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdClusterModel.prototype, "photo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ApartmentAdClusterModel.prototype, "lat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ApartmentAdClusterModel.prototype, "lng", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdClusterModel.prototype, "cost", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.CurrencyType, { defaultValue: types_1.CurrencyType.KZT, description: 'does not need specify in MPV' }),
    __metadata("design:type", String)
], ApartmentAdClusterModel.prototype, "currency", void 0);
ApartmentAdClusterModel = ApartmentAdClusterModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ApartmentAdClusterModel);
exports.ApartmentAdClusterModel = ApartmentAdClusterModel;
//# sourceMappingURL=apartment-ad-cluster.model.js.map