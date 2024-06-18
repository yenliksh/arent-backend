"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalContextModule = void 0;
const apartment_ad_complaint_module_1 = require("./domains/apartment-ad-complaint/apartment-ad-complaint.module");
const apartment_ad_module_1 = require("./domains/apartment-ad/apartment-ad.module");
const chat_module_1 = require("./domains/chat/chat.module");
const contract_request_module_1 = require("./domains/contract-request/contract-request.module");
const contract_module_1 = require("./domains/contract/contract.module");
const innopay_card_module_1 = require("./domains/innopay-card/innopay-card.module");
const innopay_transaction_module_1 = require("./domains/innopay-transaction/innopay-transaction.module");
const message_module_1 = require("./domains/message/message.module");
const payment_transaction_module_1 = require("./domains/payment-transaction/payment-transaction.module");
const temporary_payment_transaction_module_1 = require("./domains/temporary-payment-transaction/temporary-payment-transaction.module");
const user_module_1 = require("./domains/user/user.module");
const common_1 = require("@nestjs/common");
const user_complaint_module_1 = require("./domains/user-complaint/user-complaint.module");
const domains = [
    apartment_ad_module_1.ApartmentAdModule,
    chat_module_1.ChatModule,
    contract_module_1.ContractModule,
    contract_request_module_1.ContractRequestModule,
    innopay_card_module_1.InnopayCardModule,
    message_module_1.MessageModule,
    payment_transaction_module_1.PaymentTransactionModule,
    user_module_1.UserModule,
    apartment_ad_complaint_module_1.ApartmentAdComplaintModule,
    user_complaint_module_1.UserComplaintModule,
    temporary_payment_transaction_module_1.TemporaryPaymentTransactionModule,
    innopay_transaction_module_1.InnopayTransactionModule,
];
let RentalContextModule = class RentalContextModule {
};
RentalContextModule = __decorate([
    (0, common_1.Module)({
        imports: [...domains],
    })
], RentalContextModule);
exports.RentalContextModule = RentalContextModule;
//# sourceMappingURL=rental-context.module.js.map