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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentQueue = exports.PaymentJobPriority = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const types_1 = require("../types");
var PaymentJobPriority;
(function (PaymentJobPriority) {
    PaymentJobPriority[PaymentJobPriority["CANCEL"] = 1] = "CANCEL";
    PaymentJobPriority[PaymentJobPriority["CASH_IN"] = 2] = "CASH_IN";
    PaymentJobPriority[PaymentJobPriority["CASH_OUT"] = 3] = "CASH_OUT";
})(PaymentJobPriority = exports.PaymentJobPriority || (exports.PaymentJobPriority = {}));
let PaymentQueue = class PaymentQueue {
    constructor(paymentTransactionQueue) {
        this.paymentTransactionQueue = paymentTransactionQueue;
        this.baseParams = {
            removeOnFail: true,
            removeOnComplete: true,
        };
        this.paramsMapper = {
            [types_1.PaymentTransactionProcess.CASH_IN]: { ...this.baseParams, priority: PaymentJobPriority.CASH_IN },
            [types_1.PaymentTransactionProcess.CASH_OUT]: { ...this.baseParams, priority: PaymentJobPriority.CASH_OUT },
            [types_1.PaymentTransactionProcess.CANCEL]: { ...this.baseParams, priority: PaymentJobPriority.CANCEL },
        };
    }
    addCashInJob(payload) {
        this.paymentTransactionQueue.add(types_1.PaymentTransactionProcess.CASH_IN, payload, this.paramsMapper[types_1.PaymentTransactionProcess.CASH_IN]);
    }
    addCashOutJob(payload) {
        this.paymentTransactionQueue.add(types_1.PaymentTransactionProcess.CASH_OUT, payload, this.paramsMapper[types_1.PaymentTransactionProcess.CASH_OUT]);
    }
    addCancelJob(payload) {
        this.paymentTransactionQueue.add(types_1.PaymentTransactionProcess.CANCEL, payload, this.paramsMapper[types_1.PaymentTransactionProcess.CANCEL]);
    }
};
PaymentQueue = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)(types_1.PaymentBulls.PAYMENT_TRANSACTION)),
    __metadata("design:paramtypes", [Object])
], PaymentQueue);
exports.PaymentQueue = PaymentQueue;
//# sourceMappingURL=payment.queue.js.map