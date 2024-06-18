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
exports.SendRequest = exports.GuestsInput = void 0;
const openapi = require("@nestjs/swagger");
const enums_1 = require("../../../../../infrastructure/enums");
const validators_1 = require("../../../../../infrastructure/validators");
const is_date_before_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-date-before.decorator");
const is_future_date_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-future-date.decorator");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let GuestsInput = class GuestsInput {
    static _OPENAPI_METADATA_FACTORY() {
        return { numberOfChildren: { required: true, type: () => Number, minimum: 0 }, numberOfAdult: { required: true, type: () => Number, minimum: 0 }, numberOfPets: { required: true, type: () => Number, minimum: 0 } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GuestsInput.prototype, "numberOfChildren", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GuestsInput.prototype, "numberOfAdult", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GuestsInput.prototype, "numberOfPets", void 0);
GuestsInput = __decorate([
    (0, graphql_1.InputType)()
], GuestsInput);
exports.GuestsInput = GuestsInput;
let SendRequest = class SendRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { apartmentAdId: { required: true, type: () => String }, apartmentRentPeriodType: { required: true, enum: require("../../../../../infrastructure/enums").ApartmentRentPeriodType }, arrivalDate: { required: false, type: () => String }, departureDate: { required: false, type: () => String }, guests: { required: true, type: () => require("./send-request.request.dto").GuestsInput }, rentBookingType: { required: false, enum: require("../../../../../infrastructure/enums").ShortTermRentBookingType }, comment: { required: false, type: () => String }, cardId: { required: false, type: () => String }, rentPaymentType: { required: false, enum: require("../../../../../infrastructure/enums").ShortTermRentPaymentType } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SendRequest.prototype, "apartmentAdId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(enums_1.ApartmentRentPeriodType),
    (0, graphql_1.Field)(() => enums_1.ApartmentRentPeriodType),
    __metadata("design:type", String)
], SendRequest.prototype, "apartmentRentPeriodType", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, is_date_before_decorator_1.IsDateBefore)('departureDate'),
    (0, is_future_date_decorator_1.IsFutureDate)(),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'only for short term rent period' }),
    __metadata("design:type", String)
], SendRequest.prototype, "arrivalDate", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'only for short term rent period' }),
    __metadata("design:type", String)
], SendRequest.prototype, "departureDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => GuestsInput),
    (0, graphql_1.Field)(() => GuestsInput),
    __metadata("design:type", GuestsInput)
], SendRequest.prototype, "guests", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(enums_1.ShortTermRentBookingType),
    (0, graphql_1.Field)(() => enums_1.ShortTermRentBookingType, { nullable: true, description: 'only for short term rent period' }),
    __metadata("design:type", String)
], SendRequest.prototype, "rentBookingType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SendRequest.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.rentBookingType === enums_1.ShortTermRentBookingType.INSTANT),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'only for instant booking' }),
    __metadata("design:type", String)
], SendRequest.prototype, "cardId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(enums_1.ShortTermRentPaymentType),
    (0, graphql_1.Field)(() => enums_1.ShortTermRentPaymentType, { nullable: true, description: 'only for short term rent period' }),
    __metadata("design:type", String)
], SendRequest.prototype, "rentPaymentType", void 0);
SendRequest = __decorate([
    (0, graphql_1.InputType)()
], SendRequest);
exports.SendRequest = SendRequest;
//# sourceMappingURL=send-request.request.dto.js.map