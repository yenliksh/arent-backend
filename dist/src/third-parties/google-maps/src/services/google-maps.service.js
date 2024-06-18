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
exports.GoogleMapsService = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const common_1 = require("@nestjs/common");
const types_1 = require("../../../../i18n/types");
const google_maps_types_1 = require("../google-maps.types");
let GoogleMapsService = class GoogleMapsService {
    constructor(options) {
        this.options = options;
        this.parseAddress = (result) => {
            var _a, _b;
            let country = '';
            let region = '';
            let city = '';
            let district = '';
            let street = '';
            let houseNumber = '';
            (_a = result.address_components) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
                if (el.types[0] === 'locality') {
                    city = el.long_name;
                }
                else if (el.types[0] === 'route') {
                    street = el.short_name;
                }
                else if (el.types[0] === 'country') {
                    country = el.short_name;
                }
                else if (el.types[0] === 'street_number') {
                    houseNumber = el.short_name;
                }
                else if (el.types[1] === 'sublocality') {
                    district = el.short_name;
                }
                else if (el.types[0] === 'administrative_area_level_1') {
                    region = el.short_name;
                }
            });
            return {
                country,
                district,
                city,
                street,
                houseNumber,
                region,
                address: street && houseNumber ? `${street} ${houseNumber}` : '',
                location: (_b = result.geometry) === null || _b === void 0 ? void 0 : _b.location,
            };
        };
        this._client = this.createClientFromOptions();
    }
    createClientFromOptions() {
        return new google_maps_services_js_1.Client({
            config: {
                params: {
                    key: this.options.key,
                },
            },
        });
    }
    get client() {
        return this._client;
    }
    get key() {
        return this.options.key;
    }
    async placeAutocomplete(input, language = types_1.Language.en) {
        const res = await this.client.placeAutocomplete({
            params: { input, key: this.key, language, components: ['country:kz'] },
        });
        return res.data.predictions.map((item) => ({
            description: item.description,
            placeId: item.place_id,
            mainText: item.structured_formatting.main_text,
            secondaryText: item.structured_formatting.secondary_text,
            mainTextMatchedSubstrings: item.structured_formatting.main_text_matched_substrings,
        }));
    }
    async placeById(placeId, language = types_1.Language.en) {
        var _a;
        const res = await this.client.placeDetails({
            params: { place_id: placeId, key: this.key, language },
        });
        return ((_a = res.data) === null || _a === void 0 ? void 0 : _a.result) ? this.parseAddress(res.data.result) : null;
    }
    async placeByCoords(lat, lng, language = types_1.Language.en) {
        var _a;
        const res = await this.client.reverseGeocode({ params: { latlng: [+lat, +lng], key: this.key, language } });
        return ((_a = res.data) === null || _a === void 0 ? void 0 : _a.results) ? this.parseAddress(res.data.results[0]) : null;
    }
};
GoogleMapsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(google_maps_types_1.GOOGLE_MAPS_OPTIONS_PROVIDER_NAME)),
    __metadata("design:paramtypes", [Object])
], GoogleMapsService);
exports.GoogleMapsService = GoogleMapsService;
//# sourceMappingURL=google-maps.service.js.map