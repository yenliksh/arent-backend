"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExceptions = exports.RejectTrigger = exports.ContractOfferProcess = exports.ContractBulls = void 0;
var ContractBulls;
(function (ContractBulls) {
    ContractBulls["CONTRACT_OFFER_QUEUE"] = "CONTRACT_OFFER_QUEUE";
})(ContractBulls = exports.ContractBulls || (exports.ContractBulls = {}));
var ContractOfferProcess;
(function (ContractOfferProcess) {
    ContractOfferProcess["SEND"] = "SEND_CONTRACT_OFFER_PROCESS";
    ContractOfferProcess["ACCEPT"] = "ACCEPT_CONTRACT_OFFER_PROCESS";
    ContractOfferProcess["REJECT"] = "REJECT_CONTRACT_OFFER_PROCESS";
    ContractOfferProcess["INSTANT_BOOKING"] = "INSTANT_BOOKING_PROCESS";
    ContractOfferProcess["INSTANT_TEMPORARY_BOOKING"] = "INSTANT_TEMPORARY_BOOKING";
    ContractOfferProcess["TEMPORARY_CONCLUDE"] = "TEMPORARY_CONCLUDE";
})(ContractOfferProcess = exports.ContractOfferProcess || (exports.ContractOfferProcess = {}));
var RejectTrigger;
(function (RejectTrigger) {
    RejectTrigger["USER"] = "USER";
    RejectTrigger["SYSTEM"] = "SYSTEM";
})(RejectTrigger = exports.RejectTrigger || (exports.RejectTrigger = {}));
var ContractExceptions;
(function (ContractExceptions) {
    ContractExceptions["CONTRACT_NOT_FOUND"] = "CONTRACT_NOT_FOUND";
    ContractExceptions["CONTRACT_NOT_PENDING"] = "CONTRACT_NOT_PENDING";
    ContractExceptions["APARTMENT_IS_NOT_FREE"] = "APARTMENT_IS_NOT_FREE";
    ContractExceptions["CHAT_NOT_FOUND"] = "CHAT_NOT_FOUND";
    ContractExceptions["CHAT_MEMBER_REQUIRED"] = "CHAT_MEMBER_REQUIRED";
    ContractExceptions["APARTMENT_AD_NOT_FOUND"] = "APARTMENT_AD_NOT_FOUND";
    ContractExceptions["ARRIVAL_AND_DEPARTURE_DATES_REQUIRED"] = "ARRIVAL_AND_DEPARTURE_DATES_REQUIRED";
    ContractExceptions["INNOPAY_CARD_NOT_FOUND"] = "INNOPAY_CARD_NOT_FOUND";
    ContractExceptions["INVALID_ARGUMENTS_FOR_RENT_PERIOD_TYPE"] = "INVALID_ARGUMENTS_FOR_RENT_PERIOD_TYPE";
    ContractExceptions["CONTRACT_REQUEST_NOT_FOUND"] = "CONTRACT_REQUEST_NOT_FOUND";
    ContractExceptions["LANDLORD_NOT_FOUND"] = "LANDLORD_NOT_FOUND";
})(ContractExceptions = exports.ContractExceptions || (exports.ContractExceptions = {}));
//# sourceMappingURL=types.js.map