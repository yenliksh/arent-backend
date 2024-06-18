"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleModule = void 0;
const google_maps_factory_1 = require("../../infrastructure/configs/google-maps.factory");
const common_1 = require("@nestjs/common");
const src_1 = require("../../third-parties/google-maps/src");
const google_places_service_1 = require("./google-places/google-places.service");
const google_controller_1 = require("./google.controller");
let GoogleModule = class GoogleModule {
};
GoogleModule = __decorate([
    (0, common_1.Module)({
        imports: [src_1.GoogleMapsModule.forRootAsync(google_maps_factory_1.googleMapsFactory)],
        controllers: [google_controller_1.GoogleController],
        providers: [google_places_service_1.GooglePlacesService],
        exports: [google_places_service_1.GooglePlacesService],
    })
], GoogleModule);
exports.GoogleModule = GoogleModule;
//# sourceMappingURL=google.module.js.map