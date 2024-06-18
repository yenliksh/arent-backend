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
exports.PaymentTransactionListener = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const cancel_concluded_contract_command_1 = require("../../commands/cancel-concluded-contract/cancel-concluded-contract.command");
const events_1 = require("../../../payment-transaction/domain/events/events");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const types_1 = require("../types");
let PaymentTransactionListener = class PaymentTransactionListener {
    constructor(contractRepository, commandBus) {
        this.contractRepository = contractRepository;
        this.commandBus = commandBus;
    }
    async cashInFailed(payload) {
        const { paymentTransaction } = payload;
        const contract = await this.contractRepository.findOneById(paymentTransaction.contractId.value);
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        if (contract.isPartialPaymentNeedToCancel(paymentTransaction.withdrawFundsDate)) {
            this.commandBus.execute(new cancel_concluded_contract_command_1.CancelConcludedContractCommand({ contractId: contract.id, trigger: types_1.CancellationTrigger.TENANT }));
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.CashInFailedEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [events_1.CashInFailedEvent]),
    __metadata("design:returntype", Promise)
], PaymentTransactionListener.prototype, "cashInFailed", null);
PaymentTransactionListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository, cqrs_1.CommandBus])
], PaymentTransactionListener);
exports.PaymentTransactionListener = PaymentTransactionListener;
//# sourceMappingURL=payment-transaction.listener.js.map