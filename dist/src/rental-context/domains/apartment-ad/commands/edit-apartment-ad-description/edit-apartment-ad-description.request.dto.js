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
exports.EditApartmentAdDescriptionRequest = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let EditApartmentAdDescriptionRequest = class EditApartmentAdDescriptionRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, remoteView: { required: true, type: () => Boolean }, selfCheckIn: { required: true, type: () => Boolean }, freeParking: { required: true, type: () => Boolean }, workSpace: { required: true, type: () => Boolean }, quite: { required: true, type: () => Boolean }, forFamily: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentId' }),
    __metadata("design:type", String)
], EditApartmentAdDescriptionRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EditApartmentAdDescriptionRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EditApartmentAdDescriptionRequest.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdDescriptionRequest.prototype, "remoteView", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdDescriptionRequest.prototype, "selfCheckIn", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdDescriptionRequest.prototype, "freeParking", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdDescriptionRequest.prototype, "workSpace", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdDescriptionRequest.prototype, "quite", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], EditApartmentAdDescriptionRequest.prototype, "forFamily", void 0);
EditApartmentAdDescriptionRequest = __decorate([
    (0, graphql_1.InputType)()
], EditApartmentAdDescriptionRequest);
exports.EditApartmentAdDescriptionRequest = EditApartmentAdDescriptionRequest;
//# sourceMappingURL=edit-apartment-ad-description.request.dto.js.map