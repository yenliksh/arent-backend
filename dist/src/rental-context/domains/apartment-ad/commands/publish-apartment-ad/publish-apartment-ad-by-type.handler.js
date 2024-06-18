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
exports.PublishApartmentAdByTypeHandler = void 0;
const long_term_rent_is_rented_problem_1 = require("../../problems/long-term-rent-is-rented.problem");
const long_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const enums_1 = require("../../../../../infrastructure/enums");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const publish_apartment_ad_by_type_command_1 = require("./publish-apartment-ad-by-type.command");
let PublishApartmentAdByTypeHandler = class PublishApartmentAdByTypeHandler {
    constructor(apartmentAdRepository, longTermRentDocumentRepository, shortTermRentDocumentRepository) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
    }
    async execute(command) {
        const { apartmentAdId, periodType } = command;
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        if (apartmentAd.longTermRentIsRented && periodType === enums_1.ApartmentRentPeriodType.LONG_TERM) {
            return (0, oxide_ts_1.Err)(new long_term_rent_is_rented_problem_1.LongTermRentIsRentedProblem());
        }
        apartmentAd.publish(periodType);
        const result = await this.apartmentAdRepository.save(apartmentAd);
        await this.saveToElasticsearch(periodType, apartmentAd);
        return (0, oxide_ts_1.Ok)(result);
    }
    async saveToElasticsearch(periodType, apartmentAd) {
        if (periodType === enums_1.ApartmentRentPeriodType.LONG_TERM && apartmentAd.isLongTermRent) {
            await this.longTermRentDocumentRepository.save(apartmentAd);
        }
        if (periodType === enums_1.ApartmentRentPeriodType.SHORT_TERM && apartmentAd.isShortTermRent) {
            await this.shortTermRentDocumentRepository.save(apartmentAd);
        }
    }
};
PublishApartmentAdByTypeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(publish_apartment_ad_by_type_command_1.PublishApartmentAdByTypeCommand),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository])
], PublishApartmentAdByTypeHandler);
exports.PublishApartmentAdByTypeHandler = PublishApartmentAdByTypeHandler;
//# sourceMappingURL=publish-apartment-ad-by-type.handler.js.map