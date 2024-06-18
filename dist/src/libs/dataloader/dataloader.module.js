"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataloaderModule = void 0;
const apartment_ad_for_contract_dataloader_1 = require("../../rental-context/domains/chat/dataloader/apartment-ad-for-contract.dataloader");
const is_active_chat_dataloader_1 = require("../../rental-context/domains/chat/dataloader/is-active-chat.dataloader");
const unread_message_count_dataloader_1 = require("../../rental-context/domains/chat/dataloader/unread-message-count.dataloader");
const contract_by_contract_request_id_dataloader_1 = require("../../rental-context/domains/contract-request/dataloader/contract-by-contract-request-id.dataloader");
const innopay_card_by_contract_id_dataloader_1 = require("../../rental-context/domains/payment-transaction/dataloader/innopay-card-by-contract-id.dataloader");
const apartment_ad_dataloader_1 = require("../../infrastructure/dataloader/apartment-ad.dataloader");
const contract_cancelation_dataloader_1 = require("../../infrastructure/dataloader/contract-cancelation.dataloader");
const contract_dataloader_1 = require("../../infrastructure/dataloader/contract.dataloader");
const innopay_card_dataloader_1 = require("../../infrastructure/dataloader/innopay-card.dataloader");
const innopay_payment_page_by_contract_id_dataloader_1 = require("../../infrastructure/dataloader/innopay-payment-page-by-contract-id.dataloader");
const payment_transaction_dataloader_1 = require("../../infrastructure/dataloader/payment-transaction.dataloader");
const short_term_rent_locked_date_dataloader_1 = require("../../infrastructure/dataloader/short-term-rent-locked-date.dataloader");
const user_dataloader_1 = require("../../infrastructure/dataloader/user.dataloader");
const common_1 = require("@nestjs/common");
const apartment_ad_long_term_rent_dataloader_1 = require("../../rental-context/domains/apartment-ad/dataloader/apartment-ad-long-term-rent.dataloader");
const apartment_ad_short_term_rent_dataloader_1 = require("../../rental-context/domains/apartment-ad/dataloader/apartment-ad-short-term-rent.dataloader");
const chat_members_dataloader_1 = require("../../rental-context/domains/chat/dataloader/chat-members.dataloader");
const last_message_dataloader_1 = require("../../rental-context/domains/chat/dataloader/last-message.dataloader");
const dataloadersProviders = [
    {
        provide: user_dataloader_1.UserOrmEntityLoader.name,
        useClass: user_dataloader_1.UserOrmEntityLoader,
    },
    {
        provide: apartment_ad_dataloader_1.ApartmentAdOrmEntityLoader.name,
        useClass: apartment_ad_dataloader_1.ApartmentAdOrmEntityLoader,
    },
    {
        provide: apartment_ad_short_term_rent_dataloader_1.ApartmentAdShortTermRentOrmEntityLoader.name,
        useClass: apartment_ad_short_term_rent_dataloader_1.ApartmentAdShortTermRentOrmEntityLoader,
    },
    {
        provide: apartment_ad_long_term_rent_dataloader_1.ApartmentAdLongTermRentOrmEntityLoader.name,
        useClass: apartment_ad_long_term_rent_dataloader_1.ApartmentAdLongTermRentOrmEntityLoader,
    },
    {
        provide: chat_members_dataloader_1.ChatMembersLoader.name,
        useClass: chat_members_dataloader_1.ChatMembersLoader,
    },
    {
        provide: last_message_dataloader_1.LastMessageLoader.name,
        useClass: last_message_dataloader_1.LastMessageLoader,
    },
    {
        provide: apartment_ad_for_contract_dataloader_1.ApartmentAdForContractLoader.name,
        useClass: apartment_ad_for_contract_dataloader_1.ApartmentAdForContractLoader,
    },
    {
        provide: contract_dataloader_1.ContractOrmEntityLoader.name,
        useClass: contract_dataloader_1.ContractOrmEntityLoader,
    },
    {
        provide: short_term_rent_locked_date_dataloader_1.ShortTermRentLockedDateOrmEntityLoader.name,
        useClass: short_term_rent_locked_date_dataloader_1.ShortTermRentLockedDateOrmEntityLoader,
    },
    {
        provide: unread_message_count_dataloader_1.UnreadMessageCountLoader.name,
        useClass: unread_message_count_dataloader_1.UnreadMessageCountLoader,
    },
    {
        provide: is_active_chat_dataloader_1.IsActiveChatLoader.name,
        useClass: is_active_chat_dataloader_1.IsActiveChatLoader,
    },
    {
        provide: contract_by_contract_request_id_dataloader_1.ContractByContractRequestIdLoader.name,
        useClass: contract_by_contract_request_id_dataloader_1.ContractByContractRequestIdLoader,
    },
    {
        provide: payment_transaction_dataloader_1.PaymentTransactionOrmEntityLoader.name,
        useClass: payment_transaction_dataloader_1.PaymentTransactionOrmEntityLoader,
    },
    {
        provide: innopay_card_dataloader_1.InnopayCardOrmEntityLoader.name,
        useClass: innopay_card_dataloader_1.InnopayCardOrmEntityLoader,
    },
    {
        provide: innopay_card_by_contract_id_dataloader_1.InnopayCardByContractIdOrmEntityLoader.name,
        useClass: innopay_card_by_contract_id_dataloader_1.InnopayCardByContractIdOrmEntityLoader,
    },
    {
        provide: contract_cancelation_dataloader_1.ContractCancelationOrmEntityLoader.name,
        useClass: contract_cancelation_dataloader_1.ContractCancelationOrmEntityLoader,
    },
    {
        provide: innopay_payment_page_by_contract_id_dataloader_1.InnopayPaymentPageByContractIdLoader.name,
        useClass: innopay_payment_page_by_contract_id_dataloader_1.InnopayPaymentPageByContractIdLoader,
    },
];
let DataloaderModule = class DataloaderModule {
};
DataloaderModule = __decorate([
    (0, common_1.Module)({
        providers: dataloadersProviders,
    })
], DataloaderModule);
exports.DataloaderModule = DataloaderModule;
//# sourceMappingURL=dataloader.module.js.map