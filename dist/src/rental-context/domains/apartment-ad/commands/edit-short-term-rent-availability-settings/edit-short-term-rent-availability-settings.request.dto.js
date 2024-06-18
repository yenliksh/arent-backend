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
exports.EditShortTermRentAvailabilitySettingsRequest = exports.LockedDateInput = void 0;
const openapi = require("@nestjs/swagger");
const validators_1 = require("../../../../../infrastructure/validators");
const is_date_before_or_equal_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-date-before-or-equal.decorator");
const is_future_date_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-future-date.decorator");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let LockedDateInput = class LockedDateInput {
    static _OPENAPI_METADATA_FACTORY() {
        return { startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, is_date_before_or_equal_decorator_1.IsDateBeforeOrEqual)('endDate', { message: 'startDate must be a greater than endDate' }),
    (0, is_future_date_decorator_1.IsFutureDate)({ message: 'startDate must be a future date' }),
    (0, graphql_1.Field)(() => String, { description: 'iso date ex. YYYY-MM-DD' }),
    __metadata("design:type", String)
], LockedDateInput.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, is_future_date_decorator_1.IsFutureDate)({ message: 'endDate must be a future date' }),
    (0, graphql_1.Field)(() => String, { description: 'iso date ex. YYYY-MM-DD' }),
    __metadata("design:type", String)
], LockedDateInput.prototype, "endDate", void 0);
LockedDateInput = __decorate([
    (0, graphql_1.InputType)()
], LockedDateInput);
exports.LockedDateInput = LockedDateInput;
let EditShortTermRentAvailabilitySettingsRequest = class EditShortTermRentAvailabilitySettingsRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, bookingAccessInMonths: { required: true, type: () => Number, minimum: 1, maximum: 12 }, lockedDates: { required: true, type: () => [require("./edit-short-term-rent-availability-settings.request.dto").LockedDateInput] } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentId' }),
    __metadata("design:type", String)
], EditShortTermRentAvailabilitySettingsRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EditShortTermRentAvailabilitySettingsRequest.prototype, "bookingAccessInMonths", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => LockedDateInput),
    (0, class_validator_1.ValidateNested)(),
    (0, graphql_1.Field)(() => [LockedDateInput]),
    __metadata("design:type", Array)
], EditShortTermRentAvailabilitySettingsRequest.prototype, "lockedDates", void 0);
EditShortTermRentAvailabilitySettingsRequest = __decorate([
    (0, graphql_1.InputType)()
], EditShortTermRentAvailabilitySettingsRequest);
exports.EditShortTermRentAvailabilitySettingsRequest = EditShortTermRentAvailabilitySettingsRequest;
//# sourceMappingURL=edit-short-term-rent-availability-settings.request.dto.js.map