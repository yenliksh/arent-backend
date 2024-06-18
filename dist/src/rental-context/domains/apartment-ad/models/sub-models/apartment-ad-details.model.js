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
var ApartmentAdDetailsModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdDetailsModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdDetailsModel = ApartmentAdDetailsModel_1 = class ApartmentAdDetailsModel {
    constructor(model) {
        Object.assign(this, model);
    }
    static create(props) {
        return new ApartmentAdDetailsModel_1(props);
    }
    static getDetailsProps({ numberOfGuests, numberOfRooms, }) {
        if (numberOfGuests == null || numberOfRooms == null) {
            return;
        }
        return {
            numberOfGuests,
            numberOfRooms,
        };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApartmentAdDetailsModel.prototype, "numberOfGuests", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApartmentAdDetailsModel.prototype, "numberOfRooms", void 0);
ApartmentAdDetailsModel = ApartmentAdDetailsModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [ApartmentAdDetailsModel])
], ApartmentAdDetailsModel);
exports.ApartmentAdDetailsModel = ApartmentAdDetailsModel;
//# sourceMappingURL=apartment-ad-details.model.js.map