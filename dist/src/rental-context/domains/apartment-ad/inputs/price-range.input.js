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
exports.PriceRangeInput = void 0;
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let PriceRangeInput = class PriceRangeInput {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(minimal_unit_helper_1.toSmallestUnitTransformer, { toClassOnly: true }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Number)
], PriceRangeInput.prototype, "min", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(minimal_unit_helper_1.toSmallestUnitTransformer, { toClassOnly: true }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Number)
], PriceRangeInput.prototype, "max", void 0);
PriceRangeInput = __decorate([
    (0, graphql_1.InputType)()
], PriceRangeInput);
exports.PriceRangeInput = PriceRangeInput;
//# sourceMappingURL=price-range.input.js.map