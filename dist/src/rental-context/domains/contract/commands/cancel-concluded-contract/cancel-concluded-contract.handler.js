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
exports.CancelConcludedContractHandler = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const payment_queue_1 = require("../../../payment-transaction/bulls/queue/payment.queue");
const date_time_iso_tz_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const cancel_concluded_contract_command_1 = require("./cancel-concluded-contract.command");
let CancelConcludedContractHandler = class CancelConcludedContractHandler {
    constructor(contractRepository, paymentQueue) {
        this.contractRepository = contractRepository;
        this.paymentQueue = paymentQueue;
    }
    async execute(command) {
        const { contractId, checkOutDate, trigger, adminCancelMeta } = command.props;
        const contract = await this.contractRepository.findOneById(contractId.value);
        if (!contract) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Contract not found'));
        }
        if (!contract.isCanCancelled) {
            return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException('You cannot cancel this contract'));
        }
        contract.setPending();
        await this.contractRepository.save(contract);
        const checkOutDateTime = checkOutDate
            ? this.addDepartureTime(checkOutDate.value, contract.departureDateOrFail)
            : undefined;
        this.paymentQueue.addCancelJob({
            contractId: contractId.value,
            trigger,
            checkOutDate: checkOutDateTime === null || checkOutDateTime === void 0 ? void 0 : checkOutDateTime.value,
            adminCancelMeta,
        });
        return (0, oxide_ts_1.Ok)(contractId);
    }
    addDepartureTime(date, contractDepartureDate) {
        const departureDate = new Date(contractDepartureDate);
        const hours = departureDate.getHours();
        const minutes = departureDate.getMinutes();
        const dateWithHours = date_util_1.DateUtil.add(date, { value: hours, unit: 'hour' }).toISOString();
        const isoDate = date_util_1.DateUtil.add(dateWithHours, { value: minutes, unit: 'minute' }).toISOString();
        return new date_time_iso_tz_value_object_1.DateTimeISOTZVO(isoDate);
    }
};
CancelConcludedContractHandler = __decorate([
    (0, cqrs_1.CommandHandler)(cancel_concluded_contract_command_1.CancelConcludedContractCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository, payment_queue_1.PaymentQueue])
], CancelConcludedContractHandler);
exports.CancelConcludedContractHandler = CancelConcludedContractHandler;
//# sourceMappingURL=cancel-concluded-contract.handler.js.map