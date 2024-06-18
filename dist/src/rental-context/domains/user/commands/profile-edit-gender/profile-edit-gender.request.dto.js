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
exports.ProfileEditGenderRequest = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const types_1 = require("../../domain/types");
let ProfileEditGenderRequest = class ProfileEditGenderRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { gender: { required: true, enum: require("../../domain/types").GenderType } };
    }
};
__decorate([
    (0, class_validator_1.IsEnum)(types_1.GenderType),
    (0, graphql_1.Field)(() => types_1.GenderType),
    __metadata("design:type", String)
], ProfileEditGenderRequest.prototype, "gender", void 0);
ProfileEditGenderRequest = __decorate([
    (0, graphql_1.InputType)()
], ProfileEditGenderRequest);
exports.ProfileEditGenderRequest = ProfileEditGenderRequest;
//# sourceMappingURL=profile-edit-gender.request.dto.js.map