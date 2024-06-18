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
exports.EditApartmentAdAddressService = void 0;
const long_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
let EditApartmentAdAddressService = class EditApartmentAdAddressService {
    constructor(apartmentAdRepository, longTermRentDocumentRepository, shortTermRentDocumentRepository) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
    }
    async handle(dto, userId) {
        const { id, country, city, street, region, houseNumber, lat, lng } = dto;
        const apartmentAd = await this.apartmentAdRepository.findOne({ id: new uuid_value_object_1.UUID(id), landlordId: new uuid_value_object_1.UUID(userId) });
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        apartmentAd.setAddress({ country, city, street, region, houseNumber, geoPoint: { lat, lng } });
        const result = await this.apartmentAdRepository.save(apartmentAd);
        this.updateElasticsearch(apartmentAd);
        return (0, oxide_ts_1.Ok)(result);
    }
    async updateElasticsearch(apartmentAd) {
        var _a, _b;
        if (apartmentAd.isLongTermRent && ((_a = apartmentAd.longTermRentStatus) === null || _a === void 0 ? void 0 : _a.isPublished)) {
            await this.longTermRentDocumentRepository.update(apartmentAd);
        }
        if (apartmentAd.isShortTermRent && ((_b = apartmentAd.shortTermRentStatus) === null || _b === void 0 ? void 0 : _b.isPublished)) {
            await this.shortTermRentDocumentRepository.update(apartmentAd);
        }
    }
};
EditApartmentAdAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository])
], EditApartmentAdAddressService);
exports.EditApartmentAdAddressService = EditApartmentAdAddressService;
//# sourceMappingURL=edit-apartment-ad-address.service.js.map