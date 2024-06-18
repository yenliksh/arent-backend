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
exports.ProfileEditPersonalInfoRequest = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../domain/types");
const validators_1 = require("../../../../../infrastructure/validators");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ProfileEditPersonalInfoRequest = class ProfileEditPersonalInfoRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: false, type: () => String }, lastName: { required: false, type: () => String }, middleName: { required: false, type: () => String }, gender: { required: false, enum: require("../../domain/types").GenderType }, birthdate: { required: false, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEditPersonalInfoRequest.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEditPersonalInfoRequest.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEditPersonalInfoRequest.prototype, "middleName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(types_1.GenderType),
    (0, graphql_1.Field)(() => types_1.GenderType, { nullable: true }),
    __metadata("design:type", String)
], ProfileEditPersonalInfoRequest.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEditPersonalInfoRequest.prototype, "birthdate", void 0);
ProfileEditPersonalInfoRequest = __decorate([
    (0, graphql_1.InputType)()
], ProfileEditPersonalInfoRequest);
exports.ProfileEditPersonalInfoRequest = ProfileEditPersonalInfoRequest;
//# sourceMappingURL=profile-edit-personal-info.request.dto.js.map