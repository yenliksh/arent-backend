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
exports.ApproveAdLongTermRentHandler = void 0;
const apartment_ad_identificator_repository_1 = require("../../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const long_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const get_converted_slug_1 = require("../../../../../libs/utils/get-converted-slug");
const apartment_ad_approved_event_1 = require("../../../../../modules/notifications/services/apartment-ad-approved/apartment-ad-approved.event");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const aprove_ad_long_term_rent_command_1 = require("./aprove.ad-long-term-rent.command");
let ApproveAdLongTermRentHandler = class ApproveAdLongTermRentHandler {
    constructor(apartmentAdRepository, longTermRentDocumentRepository, apartmentAdIdentificatorRepository, eventEmitter) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
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
        apartmentAd.approveLongTermRent();
        const apartmentSeoProps = apartmentIdentificator.getPropsCopy();
        const convertedTitle = (0, get_converted_slug_1.getConvertedSlug)(apartmentSeoProps.titleSeo || '');
        const slug = `${apartmentSeoProps.adSearchId}-${convertedTitle}`;
        if (apartmentAd.isLongTermRent) {
            await this.longTermRentDocumentRepository.save(apartmentAd, slug);
        }
        await this.apartmentAdIdentificatorRepository.updateByApartmentId(apartmentAd.id.value, apartmentSeoProps.titleSeo, slug);
        const result = await this.apartmentAdRepository.save(apartmentAd);
        this.eventEmitter.emit(apartment_ad_approved_event_1.ApartmentAdApprovedEvent.eventName, apartment_ad_approved_event_1.ApartmentAdApprovedEvent.create({ recipientId: apartmentAd.landlordId }));
        return (0, oxide_ts_1.Ok)(result);
    }
};
ApproveAdLongTermRentHandler = __decorate([
    (0, cqrs_1.CommandHandler)(aprove_ad_long_term_rent_command_1.ApproveAdLongTermRentCommand),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository,
        event_emitter_1.EventEmitter2])
], ApproveAdLongTermRentHandler);
exports.ApproveAdLongTermRentHandler = ApproveAdLongTermRentHandler;
//# sourceMappingURL=aprove-ad-long-term-rent.handler.js.map