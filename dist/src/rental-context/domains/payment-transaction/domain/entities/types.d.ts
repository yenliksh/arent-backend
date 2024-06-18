import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { TaxVO } from '@domain-value-objects/tax.value-object';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
export interface PaymentTransactionBase {
    withdrawFundsDate: DateTimeISOTZVO;
    totalAmountPayable: CostAndCurrencyVO;
    totalAmountToBeTransferred: CostAndCurrencyVO;
    totalRevenue: CostAndCurrencyVO;
    startDate: DateTimeISOTZVO;
    endDate: DateTimeISOTZVO;
    senderTaxRate: TaxVO;
    recipientTaxRate: TaxVO;
    rentDays: number;
    cost: CostAndCurrencyVO;
    taxAmount: CostAndCurrencyVO;
}
