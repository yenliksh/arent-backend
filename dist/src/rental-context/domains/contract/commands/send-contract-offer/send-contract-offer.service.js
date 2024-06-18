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
exports.SendContractOfferService = void 0;
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const contract_offer_queue_1 = require("../../bulls/queue/contract-offer.queue");
const enums_1 = require("../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const constants_1 = require("../../../../constants");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const contract_offer_already_exists_problem_1 = require("../../problems/contract-offer-already-exists.problem");
let SendContractOfferService = class SendContractOfferService {
    constructor(contractRepository, apartmentAdRepository, contractOfferQueue) {
        this.contractRepository = contractRepository;
        this.apartmentAdRepository = apartmentAdRepository;
        this.contractOfferQueue = contractOfferQueue;
    }
    async handle(dto, userId) {
        const { chatId, arrivalDate, allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets } = dto;
        const contract = await this.contractRepository.findOneByLandlordAndChatId(chatId, userId.value);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        const isLongTermArgumentValid = contract.apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM && !!arrivalDate;
        const isShortTermArgumentValid = contract.apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM && !arrivalDate;
        if (!isLongTermArgumentValid && !isShortTermArgumentValid) {
            return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException(`Invalid arguments for ${contract.apartmentRentPeriodType} rent period type`));
        }
        const apartmentAdId = contract.apartmentAdIdOrFail;
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId.value);
        if (!apartmentAd) {
            throw new common_1.NotFoundException('Apartment ad not found');
        }
        const contractUTCDates = isLongTermArgumentValid
            ? this.getContractUTCDates(apartmentAd.getTimezoneOrFail(), arrivalDate, date_util_1.DateUtil.add(arrivalDate, {
                value: contract.rentPeriodVersion.longTermRentMonth[0],
                unit: 'month',
            }).format('YYYY-MM-DD'))
            : undefined;
        const arrivalDateUTC = contractUTCDates ? contractUTCDates.arrivalDateUTC : contract.arrivalDateOrFail;
        const departureDateUTC = contractUTCDates ? contractUTCDates.departureDateUTC : contract.departureDateOrFail;
        const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
            apartmentAdId: apartmentAdId.value,
            apartmentRentPeriodType: contract.apartmentRentPeriodType,
            from: arrivalDateUTC,
            to: departureDateUTC,
        });
        if (!isApartmentFree) {
            return (0, oxide_ts_1.Err)(new contract_offer_already_exists_problem_1.ContractOfferAlreadyExistsProblem());
        }
        contract.setDates({ arrivalDate: arrivalDateUTC, departureDate: departureDateUTC });
        contract.setPending();
        await this.contractRepository.save(contract);
        this.contractOfferQueue.addSendJob({
            chatId,
            landlordId: userId.value,
            allowedToHangingOut,
            allowedToSmoke,
            allowedWithChildren,
            allowedWithPets,
        });
        return (0, oxide_ts_1.Ok)(contract.id);
    }
    getContractUTCDates(timezone, arrivalDate, departureDate) {
        const arrivalDateUTC = date_util_1.DateUtil.parseWithZone(`${arrivalDate} ${constants_1.LONG_TERM_RENT_ARRIVAL_TIME}`, timezone, true).toISOString();
        const departureDateUTC = date_util_1.DateUtil.parseWithZone(`${departureDate} ${constants_1.LONG_TERM_RENT_DEPARTURE_TIME}`, timezone, true).toISOString();
        return { arrivalDateUTC, departureDateUTC };
    }
};
SendContractOfferService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        apartment_ad_repository_1.ApartmentAdRepository,
        contract_offer_queue_1.ContractOfferQueue])
], SendContractOfferService);
exports.SendContractOfferService = SendContractOfferService;
//# sourceMappingURL=send-contract-offer.service.js.map