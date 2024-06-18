import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { TaxVO } from '@domain-value-objects/tax.value-object';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';

export interface PaymentTransactionBase {
  withdrawFundsDate: DateTimeISOTZVO; // дата списания средства
  totalAmountPayable: CostAndCurrencyVO; // полная сумма списания за период startDate и endDate
  totalAmountToBeTransferred: CostAndCurrencyVO; // полная сумма перевода лендлорду
  totalRevenue: CostAndCurrencyVO; // полная сума перевода ливину
  startDate: DateTimeISOTZVO; // дата начала проживания
  endDate: DateTimeISOTZVO; //  дата окончания проживания
  senderTaxRate: TaxVO; // комиссия тенанта
  recipientTaxRate: TaxVO; // комиссия лендлорда
  rentDays: number; // количество проживаемых дней разница между startDate и endDate
  cost: CostAndCurrencyVO; //  цена за единицу времени (шорт - день, лонг - месяц)
  taxAmount: CostAndCurrencyVO; // комиссия за период startDate и endDate
}
