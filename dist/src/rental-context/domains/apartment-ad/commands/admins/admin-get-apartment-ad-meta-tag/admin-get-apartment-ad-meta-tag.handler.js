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
exports.AdminGetApartmentAdMetaTagHandler = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const admin_get_apartment_ad_meta_tag_command_1 = require("./admin-get-apartment-ad-meta-tag.command");
let AdminGetApartmentAdMetaTagHandler = class AdminGetApartmentAdMetaTagHandler {
    constructor(apartmentAdIdentificatorRepository) {
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
    }
    async execute(command) {
        const { apartmentId } = command;
        const apartmentAdIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentId);
        if (!apartmentAdIdentificator) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad identificator not found'));
        }
        return (0, oxide_ts_1.Ok)(apartmentAdIdentificator);
    }
};
AdminGetApartmentAdMetaTagHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_get_apartment_ad_meta_tag_command_1.AdminGetApartmentAdMetatagCommand),
    __metadata("design:paramtypes", [apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository])
], AdminGetApartmentAdMetaTagHandler);
exports.AdminGetApartmentAdMetaTagHandler = AdminGetApartmentAdMetaTagHandler;
//# sourceMappingURL=admin-get-apartment-ad-meta-tag.handler.js.map