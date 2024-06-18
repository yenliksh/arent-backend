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
exports.ApartmentsTitlesUpdateHandler = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const my_apartment_ad_service_1 = require("../../queries/my-apartment-ad/my-apartment-ad.service");
const get_converted_slug_1 = require("../../../../../libs/utils/get-converted-slug");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const apartments_titles_update_command_1 = require("./apartments-titles-update.command");
let ApartmentsTitlesUpdateHandler = class ApartmentsTitlesUpdateHandler {
    constructor(findMyApartmentAdService, apartmentAdIdentificatorRepository) {
        this.findMyApartmentAdService = findMyApartmentAdService;
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
    }
    async execute() {
        const allApartments = await this.findMyApartmentAdService.handleAll();
        if (allApartments.isErr()) {
            throw allApartments.unwrapErr();
        }
        const allApartmentsArray = allApartments.unwrap();
        if (allApartmentsArray.length < 1)
            return (0, oxide_ts_1.Ok)(true);
        allApartmentsArray.forEach(async (ap) => {
            if (ap.description) {
                const apartmentIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(ap.id);
                const apartmentIdentificatorProps = apartmentIdentificator === null || apartmentIdentificator === void 0 ? void 0 : apartmentIdentificator.getPropsCopy();
                const convertedTitle = (0, get_converted_slug_1.getConvertedSlug)(ap.description.name);
                const slug = `${apartmentIdentificatorProps === null || apartmentIdentificatorProps === void 0 ? void 0 : apartmentIdentificatorProps.adSearchId}-${convertedTitle}`;
                await this.apartmentAdIdentificatorRepository.updateByApartmentId(ap.id, ap.description.name, slug);
            }
        });
        return (0, oxide_ts_1.Ok)(true);
    }
};
ApartmentsTitlesUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(apartments_titles_update_command_1.ApartmentsTitleUpdateCommand),
    __metadata("design:paramtypes", [my_apartment_ad_service_1.MyApartmentAdService,
        apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository])
], ApartmentsTitlesUpdateHandler);
exports.ApartmentsTitlesUpdateHandler = ApartmentsTitlesUpdateHandler;
//# sourceMappingURL=apartments-titles-update.handler.js.map