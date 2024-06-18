"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionOrmEntityLoader = void 0;
const payment_transaction_orm_entity_1 = require("../database/entities/payment-transaction.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let PaymentTransactionOrmEntityLoader = class PaymentTransactionOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (paymentTransactionIds) => {
            const paymentTransactions = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query().findByIds(paymentTransactionIds);
            return paymentTransactionIds.map((id) => paymentTransactions.find((paymentTransaction) => paymentTransaction.id === id));
        });
    }
};
PaymentTransactionOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], PaymentTransactionOrmEntityLoader);
exports.PaymentTransactionOrmEntityLoader = PaymentTransactionOrmEntityLoader;
//# sourceMappingURL=payment-transaction.dataloader.js.map