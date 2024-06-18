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
exports.InstantTemporaryBookingProcessor = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const temporary_payment_transaction_repository_1 = require("../../../../domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const check_access_innopay_guid_producer_1 = require("../../../innopay-transaction/bulls/sqs-producers/check-access-innopay-guid.producer");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const slash_agnostic_1 = require("../../../../../libs/utils/slash-agnostic");
const types_1 = require("../../../../../modules/graphql-subscriptions/types");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Sentry = require("@sentry/node");
const innopay_cash_in_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-in.service");
const contract_offer_pub_sub_service_1 = require("../services/contract-offer-pub-sub.service");
const types_2 = require("../types");
let InstantTemporaryBookingProcessor = class InstantTemporaryBookingProcessor {
    constructor(contractRepository, temporaryPaymentTransactionRepository, userRepository, contractOfferPubSubService, innopayCashInService, checkAccessInnopayGuidProducer, configService, unitOfWork) {
        this.contractRepository = contractRepository;
        this.temporaryPaymentTransactionRepository = temporaryPaymentTransactionRepository;
        this.userRepository = userRepository;
        this.contractOfferPubSubService = contractOfferPubSubService;
        this.innopayCashInService = innopayCashInService;
        this.checkAccessInnopayGuidProducer = checkAccessInnopayGuidProducer;
        this.configService = configService;
        this.unitOfWork = unitOfWork;
    }
    async handle(job) {
        const { contractId } = job.data;
        let contract;
        let redirectURL;
        let startTransactionTime;
        const trxId = await this.unitOfWork.start();
        try {
            contract = await this.contractRepository.findOneById(contractId, trxId);
            if (!contract) {
                throw new common_1.NotFoundException(types_2.ContractExceptions.CONTRACT_NOT_FOUND);
            }
            if (!contract.isPending) {
                throw new exceptions_1.ArgumentInvalidException(types_2.ContractExceptions.CONTRACT_NOT_PENDING);
            }
            if (!contract.arrivalDate || !contract.departureDate) {
                throw new common_1.UnprocessableEntityException(types_2.ContractExceptions.ARRIVAL_AND_DEPARTURE_DATES_REQUIRED);
            }
            await this.checkIsApartmentFree({
                apartmentAdId: contract.apartmentAdIdOrFail.value,
                apartmentRentPeriodType: contract.apartmentRentPeriodType,
                selfContractId: contract.id,
                arrivalDate: contract.arrivalDate,
                departureDate: contract.departureDate,
            }, trxId);
            contract.endPending();
            const landlord = await this.resetFineFromLandlord(contract, trxId);
            const temporaryPaymentTransactions = contract.temporaryInstantBooking();
            const firstTransaction = temporaryPaymentTransactions.find((transaction) => transaction.isFirst);
            if (!firstTransaction) {
                throw new common_1.UnprocessableEntityException('First temporary payment transaction not found');
            }
            const cashInResult = await this.startCashInTransaction(firstTransaction);
            const customerReference = cashInResult.customerReference;
            redirectURL = cashInResult.redirectURL;
            startTransactionTime = cashInResult.startTransactionTime;
            contract.setPaymentData({
                customerReference,
                paymentUrl: redirectURL,
                paymentUrlStartAt: new Date(startTransactionTime),
            });
            await Promise.all([
                this.contractRepository.save(contract, trxId),
                temporaryPaymentTransactions.map((transaction) => this.temporaryPaymentTransactionRepository.save(transaction, trxId)),
                landlord ? this.userRepository.save(landlord, trxId) : undefined,
            ]);
            await this.unitOfWork.commit(trxId);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            Sentry.captureException(error);
            const contract = await this.contractRepository.findOneById(contractId);
            if (contract) {
                contract.endPending();
                await this.contractRepository.save(contract);
                this.contractOfferPubSubService.publishContract(contract, types_1.ContractPubSubEvent.UPDATED, error.message);
            }
            throw error;
        }
        this.contractOfferPubSubService.publishInnopayPageUrl(contract.tenantIdOrFail.value, redirectURL, startTransactionTime, {
            contractId: contract.id.value,
        });
        this.contractOfferPubSubService.publishContract(contract, types_1.ContractPubSubEvent.UPDATED);
    }
    async checkIsApartmentFree(props, trxId) {
        const { apartmentAdId, apartmentRentPeriodType, arrivalDate, departureDate, selfContractId } = props;
        const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
            apartmentAdId,
            apartmentRentPeriodType,
            selfContractId: selfContractId.value,
            from: arrivalDate.value,
            to: departureDate.value,
            trxId,
        });
        if (!isApartmentFree) {
            throw new common_1.ConflictException(types_2.ContractExceptions.APARTMENT_IS_NOT_FREE);
        }
    }
    async resetFineFromLandlord(contract, trxId) {
        if (!contract.isFined) {
            return;
        }
        const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);
        if (!landlord) {
            throw new common_1.NotFoundException(types_2.ContractExceptions.LANDLORD_NOT_FOUND);
        }
        landlord.resetFine();
        return landlord;
    }
    async startCashInTransaction(temporaryTransaction) {
        const returnURL = (0, slash_agnostic_1.slashAgnostic)(this.configService.get('backendUrl'), '/v1/contract/modify-to-permanent?customerReference=');
        const { customerReference, redirectURL } = await this.innopayCashInService.startCashInFromNewCard({
            returnURL,
            totalAmount: temporaryTransaction.totalAmountPayable,
        });
        const startTransactionTime = date_util_1.DateUtil.utcNow().toISOString();
        await this.checkAccessInnopayGuidProducer.send({ customerReference, iteration: 0 });
        return { redirectURL, startTransactionTime, customerReference };
    }
};
__decorate([
    (0, bull_1.Process)(types_2.ContractOfferProcess.INSTANT_TEMPORARY_BOOKING),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstantTemporaryBookingProcessor.prototype, "handle", null);
InstantTemporaryBookingProcessor = __decorate([
    (0, bull_1.Processor)(types_2.ContractBulls.CONTRACT_OFFER_QUEUE),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        temporary_payment_transaction_repository_1.TemporaryPaymentTransactionRepository,
        user_repository_1.UserRepository,
        contract_offer_pub_sub_service_1.ContractOfferPubSubService,
        innopay_cash_in_service_1.InnopayCashInService,
        check_access_innopay_guid_producer_1.CheckAccessInnopayGuidProducer,
        config_1.ConfigService,
        unit_of_work_1.UnitOfWork])
], InstantTemporaryBookingProcessor);
exports.InstantTemporaryBookingProcessor = InstantTemporaryBookingProcessor;
//# sourceMappingURL=instant-temporary-booking.processor.js.map