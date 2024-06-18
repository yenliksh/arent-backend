"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPushNotificationVO = void 0;
const value_object_base_1 = require("../../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../../libs/exceptions");
class UserPushNotificationVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create({ reminderUnreadMessages = true, newMessages = true, bookingRequestSent = true, bookingRequestUpdated = true, contractOfferSent = true, contractOfferUpdated = true, contractCompleted = true, contractConcluded = true, contractRejectedByAdmin = true, bookingRequestAccepted = true, changesInPassportDetails = true, reminderTenantUpcomingEntryDate = true, reminderLandlordUpcomingEntryDate = true, recurringPaymentSuccess = true, recurringPaymentFailure = true, adApproved = true, adRejected = true, adStatusUpdatedByAdmin = true, adRemovedByAdmin = true, adUpdatedByAdmin = true, } = {
        reminderUnreadMessages: true,
        newMessages: true,
        bookingRequestSent: true,
        bookingRequestUpdated: true,
        contractOfferSent: true,
        contractOfferUpdated: true,
        contractCompleted: true,
        contractConcluded: true,
        contractRejectedByAdmin: true,
        bookingRequestAccepted: true,
        changesInPassportDetails: true,
        reminderTenantUpcomingEntryDate: true,
        reminderLandlordUpcomingEntryDate: true,
        recurringPaymentSuccess: true,
        recurringPaymentFailure: true,
        adApproved: true,
        adRejected: true,
        adStatusUpdatedByAdmin: true,
        adRemovedByAdmin: true,
        adUpdatedByAdmin: true,
    }) {
        return new UserPushNotificationVO({
            reminderUnreadMessages,
            newMessages,
            bookingRequestSent,
            bookingRequestUpdated,
            contractOfferSent,
            contractOfferUpdated,
            contractCompleted,
            contractConcluded,
            contractRejectedByAdmin,
            bookingRequestAccepted,
            changesInPassportDetails,
            reminderTenantUpcomingEntryDate,
            reminderLandlordUpcomingEntryDate,
            recurringPaymentSuccess,
            recurringPaymentFailure,
            adApproved,
            adRejected,
            adStatusUpdatedByAdmin,
            adRemovedByAdmin,
            adUpdatedByAdmin,
        });
    }
    validate(props) {
        const { reminderUnreadMessages, newMessages, bookingRequestSent, bookingRequestUpdated, contractOfferSent, contractOfferUpdated, contractCompleted, contractConcluded, contractRejectedByAdmin, bookingRequestAccepted, changesInPassportDetails, reminderTenantUpcomingEntryDate, reminderLandlordUpcomingEntryDate, recurringPaymentSuccess, recurringPaymentFailure, adApproved, adRejected, adStatusUpdatedByAdmin, adRemovedByAdmin, adUpdatedByAdmin, } = props;
        const fields = [
            reminderUnreadMessages,
            newMessages,
            bookingRequestSent,
            bookingRequestUpdated,
            contractOfferSent,
            contractOfferUpdated,
            contractCompleted,
            contractConcluded,
            contractRejectedByAdmin,
            bookingRequestAccepted,
            changesInPassportDetails,
            reminderTenantUpcomingEntryDate,
            reminderLandlordUpcomingEntryDate,
            recurringPaymentSuccess,
            recurringPaymentFailure,
            adApproved,
            adRejected,
            adStatusUpdatedByAdmin,
            adRemovedByAdmin,
            adUpdatedByAdmin,
        ];
        if (fields.some((f) => f == null)) {
            throw new exceptions_1.ArgumentInvalidException('Push notification must have all required fields');
        }
    }
}
exports.UserPushNotificationVO = UserPushNotificationVO;
//# sourceMappingURL=user-push-notification.value-object.js.map