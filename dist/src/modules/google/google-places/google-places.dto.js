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
exports.GetPlaceDetailsByCoordsDto = exports.GetPlaceDetailsDto = exports.GetPlacesDto = void 0;
const openapi = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud/lib/crud");
const class_validator_1 = require("class-validator");
class GetPlacesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { address: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], GetPlacesDto.prototype, "address", void 0);
exports.GetPlacesDto = GetPlacesDto;
class GetPlaceDetailsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { placeId: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], GetPlaceDetailsDto.prototype, "placeId", void 0);
exports.GetPlaceDetailsDto = GetPlaceDetailsDto;
class GetPlaceDetailsByCoordsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { lat: { required: true, type: () => String }, lng: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], GetPlaceDetailsByCoordsDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, crud_1.ApiProperty)(),
    __metadata("design:type", String)
], GetPlaceDetailsByCoordsDto.prototype, "lng", void 0);
exports.GetPlaceDetailsByCoordsDto = GetPlaceDetailsByCoordsDto;
//# sourceMappingURL=google-places.dto.js.map