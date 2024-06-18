import { registerEnumType } from '@nestjs/graphql';

export enum RentPeriodStrategyType {
  LONG_TERM_RENT = 'LONG_TERM_RENT',
  SHORT_TERM_RENT = 'SHORT_TERM_RENT',
  MIDDLE_TERM_RENT = 'MIDDLE_TERM_RENT',
}

registerEnumType(RentPeriodStrategyType, {
  name: 'RentPeriodStrategyType',
});

export interface IStayDates {
  startDate: string;
  endDate: string;
}

export interface IArrivalDepartureDates {
  arrivalDate: string;
  departureDate: string;
}

export interface PaymentTransactionData {
  withdrawFundsDate: string;
  totalAmountPayable: number;
  startDate: string;
  endDate: string;
  senderTaxRate: number;
  recipientTaxRate: number;
  rentDays: number;
  cost: number;
  taxAmount: number;
  isRecurring: boolean;
  isLastPayment: boolean;
  totalAmountToBeTransferred: number;
  totalRevenue: number;
  rentPeriodStrategyType: RentPeriodStrategyType;
}

export interface PaymentResponse {
  data: PaymentTransactionData[];
}
