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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let LocationInput = class LocationInput {
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsLatitude)(),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LocationInput.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsLongitude)(),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LocationInput.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsPositive)(),
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], LocationInput.prototype, "radiusInKm", void 0);
LocationInput = __decorate([
    (0, graphql_1.InputType)()
], LocationInput);
exports.LocationInput = LocationInput;
//# sourceMappingURL=location.input.js.map