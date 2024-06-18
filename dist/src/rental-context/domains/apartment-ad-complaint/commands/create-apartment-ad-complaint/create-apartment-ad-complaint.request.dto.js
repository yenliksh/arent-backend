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
exports.CreateApartmentAdComplaintRequest = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../domain/types");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateApartmentAdComplaintRequest = class CreateApartmentAdComplaintRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { apartmentAdId: { required: true, type: () => String }, cause: { required: true, enum: require("../../domain/types").AdComplaintType, isArray: true }, reason: { required: false, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentAdId' }),
    __metadata("design:type", String)
], CreateApartmentAdComplaintRequest.prototype, "apartmentAdId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, graphql_1.Field)(() => [types_1.AdComplaintType], {
        description: 'complaintType',
    }),
    __metadata("design:type", Array)
], CreateApartmentAdComplaintRequest.prototype, "cause", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'reason' }),
    __metadata("design:type", String)
], CreateApartmentAdComplaintRequest.prototype, "reason", void 0);
CreateApartmentAdComplaintRequest = __decorate([
    (0, graphql_1.InputType)()
], CreateApartmentAdComplaintRequest);
exports.CreateApartmentAdComplaintRequest = CreateApartmentAdComplaintRequest;
//# sourceMappingURL=create-apartment-ad-complaint.request.dto.js.map