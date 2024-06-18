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
exports.AcceptRequestService = void 0;
const create_contract_after_request_command_1 = require("../../../contract/commands/create-contract-after-request/create-contract-after-request.command");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const contract_request_repository_1 = require("../../../../domain-repositories/contract-request/contract-request.repository");
let AcceptRequestService = class AcceptRequestService {
    constructor(contractRequestRepository, commandBus, unitOfWork) {
        this.contractRequestRepository = contractRequestRepository;
        this.commandBus = commandBus;
        this.unitOfWork = unitOfWork;
    }
    async handle(userId, dto) {
        const { contractRequestId } = dto;
        const trxId = await this.unitOfWork.start();
        try {
            const contractRequest = await this.contractRequestRepository.findOneForAccepting(contractRequestId, userId.value, trxId);
            if (!contractRequest) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new common_1.NotFoundException());
            }
            const { apartmentRentPeriodType, arrivalDate, departureDate, apartmentAdId } = contractRequest.getRequiredDataForContract();
            const comment = contractRequest.comment;
            const isLongTermArgumentValid = apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM && !arrivalDate && !departureDate && !comment;
            const isShortTermArgumentValid = apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM && !!arrivalDate && !!departureDate;
            if (!isLongTermArgumentValid && !isShortTermArgumentValid) {
                return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException(`Invalid arguments for ${apartmentRentPeriodType} rent period type`));
            }
            const apartmentIsFree = await this.contractRequestRepository.checkApartmentIsFree({
                apartmentAdId: apartmentAdId.value,
                apartmentRentPeriodType,
                trxId,
                from: arrivalDate === null || arrivalDate === void 0 ? void 0 : arrivalDate.value,
                to: departureDate === null || departureDate === void 0 ? void 0 : departureDate.value,
            });
            if (!apartmentIsFree) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new common_1.ConflictException('Apartment is not free for these days'));
            }
            contractRequest.accept();
            await this.contractRequestRepository.save(contractRequest, trxId);
            const [_, chatId] = await this.commandBus.execute(new create_contract_after_request_command_1.CreateContractAfterRequestCommand(contractRequest, trxId));
            await this.unitOfWork.commit(trxId);
            return (0, oxide_ts_1.Ok)([contractRequest.id, chatId]);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
    }
};
AcceptRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_request_repository_1.ContractRequestRepository,
        cqrs_1.CommandBus,
        unit_of_work_1.UnitOfWork])
], AcceptRequestService);
exports.AcceptRequestService = AcceptRequestService;
//# sourceMappingURL=accept-request.service.js.map