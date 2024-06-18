"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSmsNotificationVO = void 0;
const value_object_base_1 = require("../../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../../libs/exceptions");
class UserSmsNotificationVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create({ reminderUnreadMessages = true, accountRemovedByAdmin = true, bookingRequestUpdated = true, contractCancellationOfTheLease = true, reminderUpcomingDepartureDate = true, reminderNeedToPayRent = true, } = {
        reminderUnreadMessages: true,
        accountRemovedByAdmin: true,
        bookingRequestUpdated: true,
        contractCancellationOfTheLease: true,
        reminderUpcomingDepartureDate: true,
        reminderNeedToPayRent: true,
    }) {
        return new UserSmsNotificationVO({
            reminderUnreadMessages,
            accountRemovedByAdmin,
            bookingRequestUpdated,
            contractCancellationOfTheLease,
            reminderUpcomingDepartureDate,
            reminderNeedToPayRent,
        });
    }
    validate(props) {
        const { reminderUnreadMessages, accountRemovedByAdmin, bookingRequestUpdated, contractCancellationOfTheLease, reminderUpcomingDepartureDate, reminderNeedToPayRent, } = props;
        const fields = [
            reminderUnreadMessages,
            accountRemovedByAdmin,
            bookingRequestUpdated,
            contractCancellationOfTheLease,
            reminderUpcomingDepartureDate,
            reminderNeedToPayRent,
        ];
        if (fields.some((f) => f == null)) {
            throw new exceptions_1.ArgumentInvalidException('Sms notification must have all required fields');
        }
    }
}
exports.UserSmsNotificationVO = UserSmsNotificationVO;
//# sourceMappingURL=user-sms-notification.value-object.js.map