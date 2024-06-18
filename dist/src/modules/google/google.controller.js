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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_i18n_1 = require("nestjs-i18n");
const google_places_dto_1 = require("./google-places/google-places.dto");
const google_places_service_1 = require("./google-places/google-places.service");
let GoogleController = class GoogleController {
    constructor(googlePlacesService) {
        this.googlePlacesService = googlePlacesService;
    }
    async getPlaces({ lang }, dto) {
        return this.googlePlacesService.getLocation(dto.address, lang);
    }
    async getAddress({ lang }, dto) {
        return this.googlePlacesService.getPlaceDetails(dto.placeId, lang);
    }
    async getAddressByCoords({ lang }, dto) {
        return this.googlePlacesService.getPlaceDetailsByCoords(dto.lat, dto.lng, lang);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get places',
    }),
    (0, common_1.Get)('places'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, nestjs_i18n_1.I18n)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nContext, google_places_dto_1.GetPlacesDto]),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "getPlaces", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get details',
    }),
    (0, common_1.Get)('placeDetails'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_i18n_1.I18n)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nContext, google_places_dto_1.GetPlaceDetailsDto]),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "getAddress", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get details by coords',
    }),
    (0, common_1.Get)('placeDetailsByCoords'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_i18n_1.I18n)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nContext, google_places_dto_1.GetPlaceDetailsByCoordsDto]),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "getAddressByCoords", null);
GoogleController = __decorate([
    (0, common_1.Controller)('v1/google'),
    (0, swagger_1.ApiTags)('Google'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UsePipes)(),
    __metadata("design:paramtypes", [google_places_service_1.GooglePlacesService])
], GoogleController);
exports.GoogleController = GoogleController;
//# sourceMappingURL=google.controller.js.map