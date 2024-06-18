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
exports.GooglePlacesService = void 0;
const common_1 = require("@nestjs/common");
const src_1 = require("../../../third-parties/google-maps/src");
let GooglePlacesService = class GooglePlacesService {
    constructor(googleMapsService) {
        this.googleMapsService = googleMapsService;
    }
    async getLocation(input, language) {
        const resp = await this.googleMapsService.placeAutocomplete(input, language);
        return resp;
    }
    async getPlaceDetails(placeId, language) {
        try {
            const resp = await this.googleMapsService.placeById(placeId, language);
            return resp;
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
    async getPlaceDetailsByCoords(lat, lng, language) {
        try {
            const resp = await this.googleMapsService.placeByCoords(lat, lng, language);
            return resp;
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
};
GooglePlacesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [src_1.GoogleMapsService])
], GooglePlacesService);
exports.GooglePlacesService = GooglePlacesService;
//# sourceMappingURL=google-places.service.js.map