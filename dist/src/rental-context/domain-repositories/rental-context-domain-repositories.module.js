"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalContextDomainRepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const apartment_ad_complaint_repository_1 = require("./apartment-ad-complaint/apartment-ad-complaint.repository");
const apartment_ad_identificator_repository_1 = require("./apartment-ad-identificator/apartment-ad-identificator.repository");
const apartment_ad_repository_1 = require("./apartment-ad/apartment-ad.repository");
const chat_repository_1 = require("./chat/chat.repository");
const contract_request_repository_1 = require("./contract-request/contract-request.repository");
const contract_repository_1 = require("./contract/contract.repository");
const innopay_card_repository_1 = require("./innopay-card/innopay-card.repository");
const message_repository_1 = require("./message/message.repository");
const payment_transaction_repository_1 = require("./payment-transaction/payment-transaction.repository");
const rent_period_version_repository_1 = require("./rent-period-version/rent-period-version.repository");
const reversing_innopay_transaction_repository_1 = require("./reversing-innopay-transaction/reversing-innopay-transaction.repository");
const temporary_payment_transaction_repository_1 = require("./temporary-payment-transaction/temporary-payment-transaction.repository");
const user_complaint_repository_1 = require("./user-complaint/user-complaint.repository");
const user_repository_1 = require("./user/user.repository");
const repositories = [
    apartment_ad_repository_1.ApartmentAdRepository,
    apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository,
    chat_repository_1.ChatRepository,
    contract_repository_1.ContractRepository,
    contract_request_repository_1.ContractRequestRepository,
    innopay_card_repository_1.InnopayCardRepository,
    message_repository_1.MessageRepository,
    payment_transaction_repository_1.PaymentTransactionRepository,
    rent_period_version_repository_1.RentPeriodVersionRepository,
    user_repository_1.UserRepository,
    apartment_ad_complaint_repository_1.ApartmentAdComplaintRepository,
    user_complaint_repository_1.UserComplaintRepository,
    temporary_payment_transaction_repository_1.TemporaryPaymentTransactionRepository,
    reversing_innopay_transaction_repository_1.ReversingInnopayTransactionRepository,
];
let RentalContextDomainRepositoriesModule = class RentalContextDomainRepositoriesModule {
};
RentalContextDomainRepositoriesModule = __decorate([
    (0, common_1.Module)({
        providers: repositories,
        exports: repositories,
    })
], RentalContextDomainRepositoriesModule);
exports.RentalContextDomainRepositoriesModule = RentalContextDomainRepositoriesModule;
//# sourceMappingURL=rental-context-domain-repositories.module.js.map