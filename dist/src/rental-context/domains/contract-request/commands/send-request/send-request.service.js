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
exports.SendRequestService = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const rent_period_version_repository_1 = require("../../../../domain-repositories/rent-period-version/rent-period-version.repository");
const apartment_guests_value_object_1 = require("../../../../domain-value-objects/apartment-guests.value-object");
const rent_booking_type_value_object_1 = require("../../../../domain-value-objects/rent-booking-type.value-object");
const short_term_rent_payment_type_value_object_1 = require("../../../../domain-value-objects/short-term-rent-payment-type.value-object");
const types_1 = require("../../../apartment-ad/domain/types");
const long_term_rent_is_rented_problem_1 = require("../../../apartment-ad/problems/long-term-rent-is-rented.problem");
const chosen_dates_is_not_available_problem_1 = require("../../problems/chosen-dates-is-not-available.problem");
const reduce_the_number_of_guests_problem_1 = require("../../problems/reduce-the-number-of-guests.problem");
const specify_payment_method_problem_1 = require("../../problems/specify-payment-method.problem");
const contract_offer_queue_1 = require("../../../contract/bulls/queue/contract-offer.queue");
const create_instant_booking_contract_command_1 = require("../../../contract/commands/create-instant-booking-contract/create-instant-booking-contract.command");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../../../infrastructure/enums");
const date_time_iso_tz_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const booking_request_sent_event_1 = require("../../../../../modules/notifications/services/booking-request-sent/booking-request-sent.event");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const oxide_ts_1 = require("oxide.ts");
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const contract_request_repository_1 = require("../../../../domain-repositories/contract-request/contract-request.repository");
const contract_request_entity_1 = require("../../domain/entities/contract-request.entity");
const types_2 = require("../../domain/types");
const request_status_value_object_1 = require("../../domain/value-objects/request-status.value-object");
const contract_request_already_exists_problem_1 = require("../../problems/contract-request-already-exists.problem");
let SendRequestService = class SendRequestService {
    constructor(contractRequestRepository, contractRepository, apartmentAdRepository, rentPeriodVersionRepository, contractOfferQueue, commandBus, unitOfWork, eventEmitter) {
        this.contractRequestRepository = contractRequestRepository;
        this.contractRepository = contractRepository;
        this.apartmentAdRepository = apartmentAdRepository;
        this.rentPeriodVersionRepository = rentPeriodVersionRepository;
        this.contractOfferQueue = contractOfferQueue;
        this.commandBus = commandBus;
        this.unitOfWork = unitOfWork;
        this.eventEmitter = eventEmitter;
    }
    async handle(tenantId, dto) {
        const { apartmentAdId, arrivalDate, departureDate, apartmentRentPeriodType, guests, comment, rentBookingType, cardId, rentPaymentType, } = dto;
        const isLongTermArgumentValid = apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM &&
            !arrivalDate &&
            !departureDate &&
            !rentBookingType &&
            !comment &&
            !rentPaymentType;
        const isShortTermArgumentValid = apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM &&
            !!arrivalDate &&
            !!departureDate &&
            !!rentBookingType &&
            !!rentPaymentType;
        if (!isLongTermArgumentValid && !isShortTermArgumentValid) {
            return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException(`Invalid arguments for ${apartmentRentPeriodType} rent period type`));
        }
        const trxId = await this.unitOfWork.start();
        try {
            const foundApartmentAd = await this.apartmentAdRepository.findWithAvailable(apartmentAdId, apartmentRentPeriodType, arrivalDate, departureDate, trxId);
            if (!foundApartmentAd || !foundApartmentAd.isRentPublished(apartmentRentPeriodType)) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new chosen_dates_is_not_available_problem_1.ChosenDatesIsNotAvailableProblem());
            }
            if (!foundApartmentAd.isGuestsValid(guests)) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new reduce_the_number_of_guests_problem_1.ReduceTheNumberOfGuestsProblem(foundApartmentAd.numberOfGuests));
            }
            if (rentBookingType && foundApartmentAd.rentBookingType !== rentBookingType) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException(`Rent booking type ${rentBookingType} not available for this apartment ad`));
            }
            const contractUTCDates = isShortTermArgumentValid
                ? this.getContractUTCDates(foundApartmentAd, arrivalDate, departureDate)
                : undefined;
            const [contractRequestExist, apartmentIsFree, lastRentPeriodVersion] = await Promise.all([
                this.contractRequestRepository.checkExist({
                    tenantId: tenantId.value,
                    apartmentAdId: apartmentAdId,
                    arrivalDate: contractUTCDates === null || contractUTCDates === void 0 ? void 0 : contractUTCDates.arrivalDateUTC.value,
                    departureDate: contractUTCDates === null || contractUTCDates === void 0 ? void 0 : contractUTCDates.departureDateUTC.value,
                    apartmentRentPeriodType,
                }, trxId),
                this.contractRequestRepository.checkApartmentIsFree({
                    apartmentAdId,
                    apartmentRentPeriodType,
                    from: contractUTCDates === null || contractUTCDates === void 0 ? void 0 : contractUTCDates.arrivalDateUTC.value,
                    to: contractUTCDates === null || contractUTCDates === void 0 ? void 0 : contractUTCDates.departureDateUTC.value,
                    trxId,
                }),
                this.rentPeriodVersionRepository.findLast(trxId),
            ]);
            if (contractRequestExist) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new contract_request_already_exists_problem_1.ContractRequestAlreadyExistsProblem());
            }
            if (!apartmentIsFree) {
                await this.unitOfWork.rollback(trxId);
                if (foundApartmentAd.rentPeriodType.value === types_1.RentPeriodType.LONG_TERM) {
                    return (0, oxide_ts_1.Err)(new long_term_rent_is_rented_problem_1.LongTermRentIsRentedProblem());
                }
                return (0, oxide_ts_1.Err)(new chosen_dates_is_not_available_problem_1.ChosenDatesIsNotAvailableProblem());
            }
            if (!lastRentPeriodVersion) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Rent period version not found'));
            }
            const contractRequestStatus = rentBookingType === enums_1.ShortTermRentBookingType.INSTANT
                ? types_2.ContractRequestStatus.ACCEPTED
                : types_2.ContractRequestStatus.CREATED;
            const contractRequest = contract_request_entity_1.ContractRequestEntity.create({
                apartmentRentPeriodType,
                status: request_status_value_object_1.ContractRequestStatusVO.create(contractRequestStatus),
                apartmentAdId: new uuid_value_object_1.UUID(apartmentAdId),
                arrivalDate: contractUTCDates === null || contractUTCDates === void 0 ? void 0 : contractUTCDates.arrivalDateUTC,
                departureDate: contractUTCDates === null || contractUTCDates === void 0 ? void 0 : contractUTCDates.departureDateUTC,
                tenantId,
                landlordId: foundApartmentAd.landlordId,
                guests: apartment_guests_value_object_1.ApartmentGuestsVO.create(guests),
                comment: isShortTermArgumentValid ? comment : undefined,
                rentPeriodVersion: lastRentPeriodVersion,
                shortTermRentBookingType: rentBookingType ? rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(rentBookingType) : undefined,
                shortTermRentPaymentType: rentPaymentType ? short_term_rent_payment_type_value_object_1.ShortTermRentPaymentTypeVO.create(rentPaymentType) : undefined,
            });
            const result = await this.contractRequestRepository.save(contractRequest, trxId);
            let contract;
            if (rentBookingType === enums_1.ShortTermRentBookingType.INSTANT) {
                if (!cardId) {
                    await this.unitOfWork.rollback(trxId);
                    return (0, oxide_ts_1.Err)(new specify_payment_method_problem_1.SpecifyPaymentMethodProblem());
                }
                contract = await this.instantBooking(contractRequest, new uuid_value_object_1.UUID(cardId), trxId);
            }
            await this.unitOfWork.commit(trxId);
            if ((rentBookingType === enums_1.ShortTermRentBookingType.REQUEST && isShortTermArgumentValid) ||
                isLongTermArgumentValid) {
                this.eventEmitter.emit(booking_request_sent_event_1.BookingRequestSentEvent.eventName, booking_request_sent_event_1.BookingRequestSentEvent.create({ recipientId: foundApartmentAd.landlordId }));
            }
            if (contract) {
                this.contractOfferQueue.addInstantBookingJob({ contractId: contract.id.value });
            }
            return (0, oxide_ts_1.Ok)(result);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
    }
    getContractUTCDates(apartmentAd, arrivalDate, departureDate) {
        const arrivalDateUTCISOString = date_util_1.DateUtil.parseWithZone(`${arrivalDate} ${apartmentAd.getArrivalTimeOrFail()}`, apartmentAd.getTimezoneOrFail(), true).toISOString();
        const departureDateUTCISOString = date_util_1.DateUtil.parseWithZone(`${departureDate} ${apartmentAd.getDepartureTimeOrFail()}`, apartmentAd.getTimezoneOrFail(), true).toISOString();
        const arrivalDateUTC = new date_time_iso_tz_value_object_1.DateTimeISOTZVO(arrivalDateUTCISOString);
        const departureDateUTC = new date_time_iso_tz_value_object_1.DateTimeISOTZVO(departureDateUTCISOString);
        return { arrivalDateUTC, departureDateUTC };
    }
    async instantBooking(contractRequest, cardId, trxId) {
        const [contractId] = await this.commandBus.execute(new create_instant_booking_contract_command_1.CreateInstantContractCommand(contractRequest, cardId, trxId));
        const contract = await this.contractRepository.findOneById(contractId.value, trxId);
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        contract.setPending();
        await this.contractRepository.save(contract, trxId);
        return contract;
    }
};
SendRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_request_repository_1.ContractRequestRepository,
        contract_repository_1.ContractRepository,
        apartment_ad_repository_1.ApartmentAdRepository,
        rent_period_version_repository_1.RentPeriodVersionRepository,
        contract_offer_queue_1.ContractOfferQueue,
        cqrs_1.CommandBus,
        unit_of_work_1.UnitOfWork,
        event_emitter_1.EventEmitter2])
], SendRequestService);
exports.SendRequestService = SendRequestService;
//# sourceMappingURL=send-request.service.js.map