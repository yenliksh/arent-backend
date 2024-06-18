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
var ApartmentGuestsModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentGuestsModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let ApartmentGuestsModel = ApartmentGuestsModel_1 = class ApartmentGuestsModel {
    static create(props) {
        var _a, _b, _c;
        const payload = new ApartmentGuestsModel_1();
        const assignObject = {
            numberOfAdult: (_a = props.numberOfAdult) !== null && _a !== void 0 ? _a : 0,
            numberOfChildren: (_b = props.numberOfChildren) !== null && _b !== void 0 ? _b : 0,
            numberOfPets: (_c = props.numberOfPets) !== null && _c !== void 0 ? _c : 0,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApartmentGuestsModel.prototype, "numberOfChildren", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApartmentGuestsModel.prototype, "numberOfAdult", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApartmentGuestsModel.prototype, "numberOfPets", void 0);
ApartmentGuestsModel = ApartmentGuestsModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ApartmentGuestsModel);
exports.ApartmentGuestsModel = ApartmentGuestsModel;
//# sourceMappingURL=apartment-guests.model.js.map