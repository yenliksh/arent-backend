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
var GeoPointModel_1, BaseContractAddressDataModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContractAddressDataModel = exports.GeoPointModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let GeoPointModel = GeoPointModel_1 = class GeoPointModel {
    static create(props) {
        const payload = new GeoPointModel_1();
        Object.assign(payload, props);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], GeoPointModel.prototype, "lat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], GeoPointModel.prototype, "lng", void 0);
GeoPointModel = GeoPointModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], GeoPointModel);
exports.GeoPointModel = GeoPointModel;
let BaseContractAddressDataModel = BaseContractAddressDataModel_1 = class BaseContractAddressDataModel {
    static create(props) {
        const payload = new BaseContractAddressDataModel_1();
        const assignObject = {
            city: props.city,
            country: props.country,
            houseNumber: props.houseNumber,
            street: props.street,
            region: props.region,
            geoPoint: GeoPointModel.create({
                lat: props.geoPoint.lat,
                lng: props.geoPoint.lng,
            }),
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseContractAddressDataModel.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseContractAddressDataModel.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseContractAddressDataModel.prototype, "street", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseContractAddressDataModel.prototype, "houseNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseContractAddressDataModel.prototype, "region", void 0);
__decorate([
    (0, graphql_1.Field)(() => GeoPointModel),
    __metadata("design:type", GeoPointModel)
], BaseContractAddressDataModel.prototype, "geoPoint", void 0);
BaseContractAddressDataModel = BaseContractAddressDataModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], BaseContractAddressDataModel);
exports.BaseContractAddressDataModel = BaseContractAddressDataModel;
//# sourceMappingURL=base-contract-address-data.model.js.map