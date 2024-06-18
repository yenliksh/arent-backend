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
exports.ContractTemporaryInstantConcludeService = void 0;
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const contract_request_repository_1 = require("../../../../domain-repositories/contract-request/contract-request.repository");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const rent_period_version_repository_1 = require("../../../../domain-repositories/rent-period-version/rent-period-version.repository");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const apartment_guests_value_object_1 = require("../../../../domain-value-objects/apartment-guests.value-object");
const cancellation_policy_value_object_1 = require("../../../../domain-value-objects/cancellation-policy.value-object");
const rent_booking_type_value_object_1 = require("../../../../domain-value-objects/rent-booking-type.value-object");
const short_term_rent_payment_type_value_object_1 = require("../../../../domain-value-objects/short-term-rent-payment-type.value-object");
const contract_request_entity_1 = require("../../../contract-request/domain/entities/contract-request.entity");
const types_1 = require("../../../contract-request/domain/types");
const request_status_value_object_1 = require("../../../contract-request/domain/value-objects/request-status.value-object");
const contract_offer_queue_1 = require("../../bulls/queue/contract-offer.queue");
const contract_entity_1 = require("../../domain/entities/contract.entity");
const base_contract_apartment_ad_data_value_object_1 = require("../../domain/value-objects/base-contract-apartment-ad-data.value-object");
const contract_offer_already_exists_problem_1 = require("../../problems/contract-offer-already-exists.problem");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../../../infrastructure/enums");
const date_time_iso_tz_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let ContractTemporaryInstantConcludeService = class ContractTemporaryInstantConcludeService {
    constructor(apartmentAdRepository, contractRepository, contractRequestRepository, userRepository, rentPeriodVersionRepository, contractOfferQueue, pubSubService, unitOfWork) {
        this.apartmentAdRepository = apartmentAdRepository;
        this.contractRepository = contractRepository;
        this.contractRequestRepository = contractRequestRepository;
        this.userRepository = userRepository;
        this.rentPeriodVersionRepository = rentPeriodVersionRepository;
        this.contractOfferQueue = contractOfferQueue;
        this.pubSubService = pubSubService;
        this.unitOfWork = unitOfWork;
    }
    async handle(dto, userId) {
        const { apartmentAdId, arrivalDate, departureDate, guests, rentPaymentType, comment } = dto;
        const trxId = await this.unitOfWork.start();
        try {
            const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId, trxId);
            if (!apartmentAd) {
                throw new common_1.NotFoundException('ApartmentAd not found');
            }
            if (apartmentAd.rentBookingType !== enums_1.ShortTermRentBookingType.INSTANT) {
                throw new exceptions_1.ArgumentNotProvidedException('Instant booking not provided in this apartment ad');
            }
            const dates = this.getContractUTCDates(apartmentAd, arrivalDate, departureDate);
            const existingContract = await this.contractRepository.findOne({
                apartmentAdId: new uuid_value_object_1.UUID(apartmentAdId),
                details: {
                    arrivalDate: dates.arrivalDateUTC,
                    departureDate: dates.departureDateUTC,
                },
                shortTermRentBookingType: rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(enums_1.ShortTermRentBookingType.INSTANT),
                tenantId: new uuid_value_object_1.UUID(userId),
            }, trxId);
            if (existingContract && !existingContract.isTemporary) {
                throw new exceptions_1.ArgumentInvalidException('Contract already permanent concluded');
            }
            if (existingContract) {
                this.publishInnopayPageUrl(userId, existingContract.paymentDataOrFail.paymentUrl, existingContract.paymentDataOrFail.paymentUrlStartAt, {
                    contractId: existingContract.id.value,
                });
                await this.unitOfWork.execute(trxId);
                return (0, oxide_ts_1.Ok)(existingContract.id);
            }
            const [rentPeriodVersion, landlord] = await Promise.all([
                this.rentPeriodVersionRepository.findLast(trxId),
                this.userRepository.findByApartmentAdId(apartmentAdId, trxId),
            ]);
            if (!landlord) {
                throw new common_1.NotFoundException('Landlord not found');
            }
            if (!rentPeriodVersion) {
                throw new common_1.NotFoundException('RentPeriodVersion not found');
            }
            const { id: contractRequestId } = await this.createContractRequest({
                apartmentAdId: new uuid_value_object_1.UUID(apartmentAdId),
                arrivalDate: dates.arrivalDateUTC,
                departureDate: dates.departureDateUTC,
                guests,
                landlordId: apartmentAd.landlordId,
                rentPeriodVersion,
                shortTermRentPaymentType: rentPaymentType,
                tenantId: new uuid_value_object_1.UUID(userId),
                comment,
            }, trxId);
            const contract = await this.createContract({
                apartmentAd,
                arrivalDate: dates.arrivalDateUTC,
                contractRequestId,
                departureDate: dates.departureDateUTC,
                guests: apartment_guests_value_object_1.ApartmentGuestsVO.create(guests),
                landlord,
                rentPeriodVersion,
                shortTermRentPaymentType: rentPaymentType,
                tenantId: new uuid_value_object_1.UUID(userId),
            }, trxId);
            await this.unitOfWork.commit(trxId);
            this.contractOfferQueue.addTemporaryInstantBookingJob({ contractId: contract.id.value });
            return (0, oxide_ts_1.Ok)(contract.id);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            return (0, oxide_ts_1.Err)(error);
        }
    }
    async createContractRequest(props, trxId) {
        const { apartmentAdId, guests, arrivalDate, departureDate, rentPeriodVersion, landlordId, tenantId, comment, shortTermRentPaymentType, } = props;
        const isApartmentFree = await this.contractRequestRepository.checkApartmentIsFree({
            apartmentAdId: apartmentAdId.value,
            apartmentRentPeriodType: enums_1.ApartmentRentPeriodType.SHORT_TERM,
            from: arrivalDate.value,
            to: departureDate.value,
            trxId,
        });
        if (!isApartmentFree) {
            throw new contract_offer_already_exists_problem_1.ContractOfferAlreadyExistsProblem();
        }
        const contractRequest = contract_request_entity_1.ContractRequestEntity.create({
            apartmentAdId,
            arrivalDate,
            departureDate,
            landlordId,
            tenantId,
            comment,
            shortTermRentBookingType: rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(enums_1.ShortTermRentBookingType.INSTANT),
            shortTermRentPaymentType: short_term_rent_payment_type_value_object_1.ShortTermRentPaymentTypeVO.create(shortTermRentPaymentType),
            apartmentRentPeriodType: enums_1.ApartmentRentPeriodType.SHORT_TERM,
            status: request_status_value_object_1.ContractRequestStatusVO.create(types_1.ContractRequestStatus.ACCEPTED),
            guests: apartment_guests_value_object_1.ApartmentGuestsVO.create(guests),
            rentPeriodVersion,
        });
        await this.contractRequestRepository.save(contractRequest, trxId);
        return contractRequest;
    }
    async createContract(props, trxId) {
        const { arrivalDate, departureDate, shortTermRentPaymentType, guests, apartmentAd, tenantId, contractRequestId, rentPeriodVersion, landlord, } = props;
        if (!apartmentAd.baseApartmentAdDataForContract) {
            throw new common_1.NotFoundException('Apartment ad address not found');
        }
        const contract = contract_entity_1.ContractEntity.create({
            apartmentRentPeriodType: enums_1.ApartmentRentPeriodType.SHORT_TERM,
            contractRequestId,
            status: enums_1.ContractStatus.CREATED,
            tenantId,
            detailsProps: {
                arrivalDate,
                departureDate,
                rules: apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.rules,
            },
            apartmentAdId: apartmentAd.id,
            landlordId: apartmentAd.landlordId,
            rentPeriodVersion,
            cancellationPolicyProps: cancellation_policy_value_object_1.CancellationPolicyVO.create(enums_1.ApartmentRentPeriodType.SHORT_TERM, {
                shortTermCancellationPolicy: apartmentAd.shortTermRentCancellationPolicy,
                longTermCancellationPolicy: apartmentAd.longTermRentCancellationPolicy,
            }),
            costAndCurrency: apartmentAd.getCostAndCurrency(enums_1.ApartmentRentPeriodType.SHORT_TERM),
            shortTermRentBookingType: rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(enums_1.ShortTermRentBookingType.INSTANT),
            shortTermRentPaymentType: short_term_rent_payment_type_value_object_1.ShortTermRentPaymentTypeVO.create(shortTermRentPaymentType),
            baseContractApartmentAdData: new base_contract_apartment_ad_data_value_object_1.BaseContractApartmentAdDataVO({
                title: apartmentAd.baseApartmentAdDataForContract.name,
                address: apartmentAd.baseApartmentAdDataForContract.address,
            }),
            guests,
            isFined: !!(landlord === null || landlord === void 0 ? void 0 : landlord.numberFines),
            isTemporary: true,
        });
        contract.setPending();
        await this.contractRepository.save(contract, trxId);
        return contract;
    }
    publishInnopayPageUrl(tenantId, url, startUrlDate, refs) {
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.INNOPAY_PAGE_URL, {
            payingId: tenantId,
            url,
            startUrlDate: new Date(startUrlDate),
            ...refs,
        });
    }
    getContractUTCDates(apartmentAd, arrivalDate, departureDate) {
        const arrivalDateUTCISOString = date_util_1.DateUtil.parseWithZone(`${arrivalDate} ${apartmentAd.getArrivalTimeOrFail()}`, apartmentAd.getTimezoneOrFail(), true).toISOString();
        const departureDateUTCISOString = date_util_1.DateUtil.parseWithZone(`${departureDate} ${apartmentAd.getDepartureTimeOrFail()}`, apartmentAd.getTimezoneOrFail(), true).toISOString();
        const arrivalDateUTC = new date_time_iso_tz_value_object_1.DateTimeISOTZVO(arrivalDateUTCISOString);
        const departureDateUTC = new date_time_iso_tz_value_object_1.DateTimeISOTZVO(departureDateUTCISOString);
        return { arrivalDateUTC, departureDateUTC };
    }
};
ContractTemporaryInstantConcludeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_ad_repository_1.ApartmentAdRepository,
        contract_repository_1.ContractRepository,
        contract_request_repository_1.ContractRequestRepository,
        user_repository_1.UserRepository,
        rent_period_version_repository_1.RentPeriodVersionRepository,
        contract_offer_queue_1.ContractOfferQueue,
        pub_sub_service_1.PubSubService,
        unit_of_work_1.UnitOfWork])
], ContractTemporaryInstantConcludeService);
exports.ContractTemporaryInstantConcludeService = ContractTemporaryInstantConcludeService;
//# sourceMappingURL=contract-temporary-instant-conclude.service.js.map