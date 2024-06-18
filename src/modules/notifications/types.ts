// export type UserWithContractRole<T extends UserOrmEntity> = { role: UserChatRole; user: T };

export enum NotificationEventTypes {
  NEW_MESSAGE = 'NEW_MESSAGE',
  VERIFICATION_EMAIL = 'VERIFICATION_EMAIL',
  REQUIRE_IDENTITY_DOCUMENT = 'REQUIRE_IDENTITY_DOCUMENT',
  CONTRACT_CONCLUDED = 'CONTRACT_CONCLUDED',
  CONTRACT_OFFER_STATUS_CHANGED = 'CONTRACT_OFFER_STATUS_CHANGED', // Статус сделки был изменен
  CONTRACT_OFFER_SENT = 'CONTRACT OFFER SENT', // Арендодатель отправил условия сделки
  RECURRING_PAYMENT_WITHDRAW_SUCCESS = 'RECURRING_PAYMENT_WITHDRAW_SUCCESS', // Успешное списание средств у тенанта
  RECURRING_PAYMENT_WITHDRAW_FAILURE = 'RECURRING_PAYMENT_WITHDRAW_FAILURE', // Ошибка списания средств у тенанта
  RECURRING_PAYMENT_LAST_WITHDRAW_FAILURE = 'RECURRING_PAYMENT_LAST_WITHDRAW_FAILURE', // Евент для лендлорда ошибка списания средств у тенанта за последний платеж
  PAYMENT_TRANSFER_SUCCESS = 'PAYMENT_TRANSFER_SUCCESS', // Успешный вовод средств лендлорду
  PAYMENT_TRANSFER_FAILURE = 'PAYMENT_TRANSFER_FAILURE', // Ошибка вовода средств лендлорду
  REMINDER_NEED_TO_PAY_RENT = 'REMINDER_NEED_TO_PAY_RENT', // tenant Я могу получить уведомление (ремайндер), что необходимо оплатить аренду (рекуринг) и Я могу получить уведомление (ремайндер), что необходимо оплатить аренду (частичная оплата)
  BOOKING_REQUEST_SENT = 'BOOKING_REQUEST_SENT', //  Я могу получить уведомление поступления запроса на бронирование
  BOOKING_REQUEST_STATUS_CHANGED = 'BOOKING_REQUEST_CHANGED', // Статус запроса по бронированию был изменен
  APARTMENT_AD_APPROVED = 'APARTMENT_AD_APPROVED', // объявление заопрувлено админом
  APARTMENT_AD_REJECTED = 'APARTMENT_AD_REJECTED', // объявление реджектнуто админом
}

export type DefaultTemplateProps<T> = T &
  Partial<{
    fbLink: string;
    instagramLink: string;
    linkedInLink: string;
  }>;
