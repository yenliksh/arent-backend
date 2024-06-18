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
var ApartmentAdAddressModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdAddressModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdAddressModel = ApartmentAdAddressModel_1 = class ApartmentAdAddressModel {
    constructor(model) {
        Object.assign(this, model);
    }
    static create(props) {
        return new ApartmentAdAddressModel_1(props);
    }
    static getAddressProps({ country, city, street, region, houseNumber, lat, lng, }) {
        if (!country || !city || !street || !houseNumber || !lat || !lng) {
            return;
        }
        return {
            country,
            city,
            region,
            street,
            houseNumber,
            lat,
            lng,
        };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdAddressModel.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdAddressModel.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ApartmentAdAddressModel.prototype, "region", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdAddressModel.prototype, "street", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdAddressModel.prototype, "houseNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ApartmentAdAddressModel.prototype, "lat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ApartmentAdAddressModel.prototype, "lng", void 0);
ApartmentAdAddressModel = ApartmentAdAddressModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [ApartmentAdAddressModel])
], ApartmentAdAddressModel);
exports.ApartmentAdAddressModel = ApartmentAdAddressModel;
//# sourceMappingURL=apartment-ad-address.model.js.map