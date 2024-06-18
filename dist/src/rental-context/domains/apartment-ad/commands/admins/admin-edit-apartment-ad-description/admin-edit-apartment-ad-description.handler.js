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
exports.AdminEditApartmentAdDescriptionHandler = void 0;
const apartment_ad_repository_1 = require("../../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const admin_edit_apartment_ad_description_command_1 = require("./admin-edit-apartment-ad-description.command");
let AdminEditApartmentAdDescriptionHandler = class AdminEditApartmentAdDescriptionHandler {
    constructor(apartmentAdRepository) {
        this.apartmentAdRepository = apartmentAdRepository;
    }
    async execute(command) {
        const { apartmentAdId, name, descriptionText } = command;
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        if (!name && !descriptionText) {
            return (0, oxide_ts_1.Err)(new common_1.BadRequestException('at least one field must be filled'));
        }
        if (descriptionText) {
            apartmentAd.adminEditDescriptionText(descriptionText);
        }
        if (name) {
            apartmentAd.adminEditDescriptionName(name);
        }
        const result = await this.apartmentAdRepository.save(apartmentAd);
        return (0, oxide_ts_1.Ok)(result);
    }
};
AdminEditApartmentAdDescriptionHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_edit_apartment_ad_description_command_1.AdminEditApartmentAdDescriptionCommand),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository])
], AdminEditApartmentAdDescriptionHandler);
exports.AdminEditApartmentAdDescriptionHandler = AdminEditApartmentAdDescriptionHandler;
//# sourceMappingURL=admin-edit-apartment-ad-description.handler.js.map