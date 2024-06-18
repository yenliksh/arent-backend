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
exports.ShortTermSwitchRentBookingTypeService = void 0;
const short_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
let ShortTermSwitchRentBookingTypeService = class ShortTermSwitchRentBookingTypeService {
    constructor(apartmentAdRepository, shortTermRentDocumentRepository) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
    }
    async handle(dto, userId) {
        const { id } = dto;
        const apartmentAd = await this.apartmentAdRepository.findOne({ id: new uuid_value_object_1.UUID(id), landlordId: new uuid_value_object_1.UUID(userId) });
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        apartmentAd.switchRentBookingType();
        const result = await this.apartmentAdRepository.save(apartmentAd);
        await this.shortTermRentDocumentRepository.update(apartmentAd);
        return (0, oxide_ts_1.Ok)(result);
    }
};
ShortTermSwitchRentBookingTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository])
], ShortTermSwitchRentBookingTypeService);
exports.ShortTermSwitchRentBookingTypeService = ShortTermSwitchRentBookingTypeService;
//# sourceMappingURL=short-term-switch-rent-booking-type.service.js.map