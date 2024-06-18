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
exports.ApartmentSlugUpdateHandler = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const create_apartment_ad_identificator_service_1 = require("../../commands/create-apartment-ad-identificator/create-apartment-ad-identificator.service");
const my_apartment_ad_service_1 = require("../../queries/my-apartment-ad/my-apartment-ad.service");
const long_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const get_converted_slug_1 = require("../../../../../libs/utils/get-converted-slug");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const apartment_slug_update_command_1 = require("./apartment-slug-update.command");
let ApartmentSlugUpdateHandler = class ApartmentSlugUpdateHandler {
    constructor(findMyApartmentAdService, apartmentAdRepository, apartmentAdIdentificatorRepository, longTermRentDocumentRepository, shortTermRentDocumentRepository, createApartmentAdIdentificatorService) {
        this.findMyApartmentAdService = findMyApartmentAdService;
        this.apartmentAdRepository = apartmentAdRepository;
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
        this.createApartmentAdIdentificatorService = createApartmentAdIdentificatorService;
    }
    async execute(command) {
        var _a, _b, _c, _d;
        const { apartmentAdId } = command;
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);
        if (!apartmentAd)
            return (0, oxide_ts_1.Ok)(false);
        const apartmentOrm = (await this.findMyApartmentAdService.handleById(apartmentAd.id.value)).unwrap();
        if (!apartmentOrm)
            return (0, oxide_ts_1.Ok)(false);
        await this.apartmentAdIdentificatorRepository.deleteByApartmentId(apartmentOrm.id);
        if (apartmentOrm.description)
            await this.createApartmentAdIdentificatorService.handle({
                apartmentId: apartmentOrm.id,
                titleSeo: apartmentOrm.description.name,
            });
        const apartmentIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentOrm.id);
        const apartmentSeoProps = apartmentIdentificator === null || apartmentIdentificator === void 0 ? void 0 : apartmentIdentificator.getPropsCopy();
        const convertedTitle = (0, get_converted_slug_1.getConvertedSlug)((apartmentSeoProps === null || apartmentSeoProps === void 0 ? void 0 : apartmentSeoProps.titleSeo) || '');
        const slug = `${apartmentSeoProps === null || apartmentSeoProps === void 0 ? void 0 : apartmentSeoProps.adSearchId}-${convertedTitle}`;
        if (apartmentIdentificator &&
            apartmentAd &&
            apartmentAd.isLongTermRent &&
            (((_a = apartmentAd.longTermRentStatus) === null || _a === void 0 ? void 0 : _a.isPublished) || ((_b = apartmentAd.longTermRentStatus) === null || _b === void 0 ? void 0 : _b.isPaused))) {
            await this.longTermRentDocumentRepository.delete(apartmentAd);
            await this.longTermRentDocumentRepository.save(apartmentAd, slug);
        }
        if (apartmentIdentificator &&
            apartmentAd &&
            (apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.isShortTermRent) &&
            (((_c = apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.shortTermRentStatus) === null || _c === void 0 ? void 0 : _c.isPublished) || ((_d = apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.shortTermRentStatus) === null || _d === void 0 ? void 0 : _d.isPaused))) {
            await this.shortTermRentDocumentRepository.delete(apartmentAd);
            await this.shortTermRentDocumentRepository.save(apartmentAd, slug);
        }
        return (0, oxide_ts_1.Ok)(true);
    }
};
ApartmentSlugUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(apartment_slug_update_command_1.ApartmentSlugUpdateCommand),
    __metadata("design:paramtypes", [my_apartment_ad_service_1.MyApartmentAdService,
        apartment_ad_repository_1.ApartmentAdRepository,
        apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        create_apartment_ad_identificator_service_1.CreateApartmentAdIdentificatorService])
], ApartmentSlugUpdateHandler);
exports.ApartmentSlugUpdateHandler = ApartmentSlugUpdateHandler;
//# sourceMappingURL=apartment-slug-update.handler.js.map