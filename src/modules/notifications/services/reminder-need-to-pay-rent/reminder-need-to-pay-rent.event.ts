import { NotificationEventTypes } from '../../types';

export class ReminderNeedToPayRentEvent {
  static eventName = NotificationEventTypes.REMINDER_NEED_TO_PAY_RENT;

  static create(props: ReminderNeedToPayRentEvent) {
    const payload = new ReminderNeedToPayRentEvent();

    Object.assign(payload, props);

    return payload;
  }
}
