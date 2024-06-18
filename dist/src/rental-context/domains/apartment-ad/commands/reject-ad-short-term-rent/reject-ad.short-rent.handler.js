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
exports.RejectAdShortTermRentHandler = void 0;
const apartment_ad_rejected_event_1 = require("../../../../../modules/notifications/services/apartment-ad-rejected/apartment-ad-rejected.event");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const reject_ad_short_rent_command_1 = require("./reject-ad-short-rent.command");
let RejectAdShortTermRentHandler = class RejectAdShortTermRentHandler {
    constructor(apartmentAdRepository, eventEmitter) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.eventEmitter = eventEmitter;
    }
    async execute(command) {
        const { apartmentAdId, declineReason } = command;
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);
        if (!apartmentAd) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Apartment ad not found'));
        }
        apartmentAd.rejectShortTermRent(declineReason);
        const result = await this.apartmentAdRepository.save(apartmentAd);
        this.eventEmitter.emit(apartment_ad_rejected_event_1.ApartmentAdRejectedEvent.eventName, apartment_ad_rejected_event_1.ApartmentAdRejectedEvent.create({ recipientId: apartmentAd.landlordId }));
        return (0, oxide_ts_1.Ok)(result);
    }
};
RejectAdShortTermRentHandler = __decorate([
    (0, cqrs_1.CommandHandler)(reject_ad_short_rent_command_1.RejectAdShortTermRentCommand),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        event_emitter_1.EventEmitter2])
], RejectAdShortTermRentHandler);
exports.RejectAdShortTermRentHandler = RejectAdShortTermRentHandler;
//# sourceMappingURL=reject-ad.short-rent.handler.js.map