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
exports.DateRangeInput = void 0;
const validators_1 = require("../../../../infrastructure/validators");
const is_date_before_or_equal_decorator_1 = require("../../../../infrastructure/validators/decorators/is-date-before-or-equal.decorator");
const is_future_date_decorator_1 = require("../../../../infrastructure/validators/decorators/is-future-date.decorator");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let DateRangeInput = class DateRangeInput {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, is_date_before_or_equal_decorator_1.IsDateBeforeOrEqual)('endDate'),
    (0, is_future_date_decorator_1.IsFutureDate)({ message: 'startDate is not future' }),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'must be date ex. YYYY-MM-DD' }),
    __metadata("design:type", String)
], DateRangeInput.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, is_future_date_decorator_1.IsFutureDate)({ message: 'endDate is not future' }),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'must be date ex. YYYY-MM-DD' }),
    __metadata("design:type", String)
], DateRangeInput.prototype, "endDate", void 0);
DateRangeInput = __decorate([
    (0, graphql_1.InputType)()
], DateRangeInput);
exports.DateRangeInput = DateRangeInput;
//# sourceMappingURL=date-range.input.js.map