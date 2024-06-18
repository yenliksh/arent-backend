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
exports.EditApartmentAdImportantInfoRequest = void 0;
const openapi = require("@nestjs/swagger");
const enums_1 = require("../../../../../infrastructure/enums");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let EditApartmentAdImportantInfoRequest = class EditApartmentAdImportantInfoRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, allowedWithPets: { required: true, type: () => Boolean }, allowedWithChildren: { required: true, type: () => Boolean }, allowedToSmoke: { required: true, type: () => Boolean }, allowedToHangingOut: { required: true, type: () => Boolean }, cancellationPolicy: { required: false, enum: require("../../../../../infrastructure/enums").ShortTermRentCancellationPolicyType }, rentBookingType: { required: false, enum: require("../../../../../infrastructure/enums").ShortTermRentBookingType }, arrivalTime: { required: false, type: () => String }, departureTime: { required: false, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentId' }),
    __metadata("design:type", String)
], EditApartmentAdImportantInfoRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdImportantInfoRequest.prototype, "allowedWithPets", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdImportantInfoRequest.prototype, "allowedWithChildren", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdImportantInfoRequest.prototype, "allowedToSmoke", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdImportantInfoRequest.prototype, "allowedToHangingOut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ShortTermRentCancellationPolicyType),
    (0, graphql_1.Field)(() => enums_1.ShortTermRentCancellationPolicyType, {
        nullable: true,
        description: 'only for short term rent period or all types',
    }),
    __metadata("design:type", String)
], EditApartmentAdImportantInfoRequest.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ShortTermRentBookingType),
    (0, graphql_1.Field)(() => enums_1.ShortTermRentBookingType, {
        nullable: true,
        description: 'only for short term rent period or all types',
    }),
    __metadata("design:type", String)
], EditApartmentAdImportantInfoRequest.prototype, "rentBookingType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'only for short term rent period or all types' }),
    __metadata("design:type", String)
], EditApartmentAdImportantInfoRequest.prototype, "arrivalTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'only for short term rent period or all types' }),
    __metadata("design:type", String)
], EditApartmentAdImportantInfoRequest.prototype, "departureTime", void 0);
EditApartmentAdImportantInfoRequest = __decorate([
    (0, graphql_1.InputType)()
], EditApartmentAdImportantInfoRequest);
exports.EditApartmentAdImportantInfoRequest = EditApartmentAdImportantInfoRequest;
//# sourceMappingURL=edit-apartment-ad-important-info.request.dto.js.map