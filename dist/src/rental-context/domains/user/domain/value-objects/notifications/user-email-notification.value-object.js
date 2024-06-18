"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailNotificationVO = void 0;
const value_object_base_1 = require("../../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../../libs/exceptions");
class UserEmailNotificationVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create({ newMessages = true, bookingRequestSent = true, contractConcluded = true, businessTrains = true, transferSuccess = true, transferFailure = true, recurringPaymentSuccess = true, recurringPaymentFailure = true, reminderNeedToPayRent = true, adApproved = true, adRejected = true, } = {
        newMessages: true,
        bookingRequestSent: true,
        contractConcluded: true,
        businessTrains: true,
        transferSuccess: true,
        transferFailure: true,
        recurringPaymentSuccess: true,
        recurringPaymentFailure: true,
        reminderNeedToPayRent: true,
        adApproved: true,
        adRejected: true,
    }) {
        return new UserEmailNotificationVO({
            newMessages,
            bookingRequestSent,
            contractConcluded,
            businessTrains,
            transferSuccess,
            transferFailure,
            recurringPaymentSuccess,
            recurringPaymentFailure,
            reminderNeedToPayRent,
            adApproved,
            adRejected,
        });
    }
    validate(props) {
        const { newMessages, bookingRequestSent, contractConcluded, businessTrains, recurringPaymentSuccess, recurringPaymentFailure, reminderNeedToPayRent, adApproved, adRejected, } = props;
        const fields = [
            newMessages,
            bookingRequestSent,
            contractConcluded,
            businessTrains,
            recurringPaymentSuccess,
            recurringPaymentFailure,
            reminderNeedToPayRent,
            adApproved,
            adRejected,
        ];
        if (fields.some((f) => f == null)) {
            throw new exceptions_1.ArgumentInvalidException('Email notification must have all required fields');
        }
    }
}
exports.UserEmailNotificationVO = UserEmailNotificationVO;
//# sourceMappingURL=user-email-notification.value-object.js.map