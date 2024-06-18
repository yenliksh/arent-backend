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
exports.ApproveAdShortTermRentHandler = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const short_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const get_converted_slug_1 = require("../../../../../libs/utils/get-converted-slug");
const apartment_ad_approved_event_1 = require("../../../../../modules/notifications/services/apartment-ad-approved/apartment-ad-approved.event");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const aprove_ad_short_term_rent_command_1 = require("./aprove.ad-short-term-rent.command");
let ApproveAdShortTermRentHandler = class ApproveAdShortTermRentHandler {
    constructor(apartmentAdRepository, apartmentAdIdentificatorRepository, shortTermRentDocumentRepository, eventEmitter) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
        this.eventEmitter = eventEmitter;
    }
    async execute(command) {
        const { apartmentAdId } = command;
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        const apartmentIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentAd.id.value);
        if (!apartmentIdentificator) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment identificator not found'));
        }
        apartmentAd.approveShortTermRent();
        const apartmentSeoProps = apartmentIdentificator.getPropsCopy();
        const convertedTitle = (0, get_converted_slug_1.getConvertedSlug)(apartmentSeoProps.titleSeo || '');
        const slug = `${apartmentSeoProps.adSearchId}-${convertedTitle}`;
        if (apartmentAd.isShortTermRent) {
            await this.shortTermRentDocumentRepository.save(apartmentAd, slug);
        }
        await this.apartmentAdIdentificatorRepository.updateByApartmentId(apartmentAd.id.value, apartmentSeoProps.titleSeo, slug);
        const result = await this.apartmentAdRepository.save(apartmentAd);
        this.eventEmitter.emit(apartment_ad_approved_event_1.ApartmentAdApprovedEvent.eventName, apartment_ad_approved_event_1.ApartmentAdApprovedEvent.create({ recipientId: apartmentAd.landlordId }));
        return (0, oxide_ts_1.Ok)(result);
    }
};
ApproveAdShortTermRentHandler = __decorate([
    (0, cqrs_1.CommandHandler)(aprove_ad_short_term_rent_command_1.ApproveAdShortTermRentCommand),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        event_emitter_1.EventEmitter2])
], ApproveAdShortTermRentHandler);
exports.ApproveAdShortTermRentHandler = ApproveAdShortTermRentHandler;
//# sourceMappingURL=aprove-ad-short-term-rent.handler.js.map