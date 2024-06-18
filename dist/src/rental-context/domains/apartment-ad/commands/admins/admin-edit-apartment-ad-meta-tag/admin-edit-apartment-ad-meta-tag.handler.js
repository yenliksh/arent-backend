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
exports.AdminEditApartmentAdMetaTagHandler = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const admin_edit_apartment_ad_meta_tag_command_1 = require("./admin-edit-apartment-ad-meta-tag.command");
let AdminEditApartmentAdMetaTagHandler = class AdminEditApartmentAdMetaTagHandler {
    constructor(apartmentAdIdentificatorRepository) {
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
    }
    async execute(command) {
        const { apartmentAdId, h1, title, description } = command;
        const apartmentAdIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentAdId);
        if (!apartmentAdIdentificator) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad identificator not found'));
        }
        if (!h1 && !title && !description) {
            return (0, oxide_ts_1.Err)(new common_1.BadRequestException('at least one field must be filled'));
        }
        if (h1) {
            apartmentAdIdentificator.adminEditH1MetaTag(h1);
        }
        if (title) {
            apartmentAdIdentificator.adminEditTitleMetaTag(title);
        }
        if (description) {
            apartmentAdIdentificator.adminEditDescriptionMetaTag(description);
        }
        const result = await this.apartmentAdIdentificatorRepository.save(apartmentAdIdentificator);
        return (0, oxide_ts_1.Ok)(result);
    }
};
AdminEditApartmentAdMetaTagHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_edit_apartment_ad_meta_tag_command_1.AdminEditApartmentAdMetatagCommand),
    __metadata("design:paramtypes", [apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository])
], AdminEditApartmentAdMetaTagHandler);
exports.AdminEditApartmentAdMetaTagHandler = AdminEditApartmentAdMetaTagHandler;
//# sourceMappingURL=admin-edit-apartment-ad-meta-tag.handler.js.map