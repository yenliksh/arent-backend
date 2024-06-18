"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPaymentTransactionService = void 0;
const payment_transaction_orm_entity_1 = require("../../../../../infrastructure/database/entities/payment-transaction.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let FindPaymentTransactionService = class FindPaymentTransactionService {
    async handle(id, userId) {
        const paymentTransaction = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query()
            .innerJoinRelated({ contract: true })
            .where('contract.tenantId', userId.value)
            .findById(id.value);
        if (!paymentTransaction) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Payment transaction not found'));
        }
        return (0, oxide_ts_1.Ok)(paymentTransaction);
    }
};
FindPaymentTransactionService = __decorate([
    (0, common_1.Injectable)()
], FindPaymentTransactionService);
exports.FindPaymentTransactionService = FindPaymentTransactionService;
//# sourceMappingURL=find-payment-transaction.service.js.map