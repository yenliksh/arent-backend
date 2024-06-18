import { IContractCreateProps } from '@domains/contract/base-classes/rental-strategies/__tests__/factories/contract-rental-strategy.factory';
import { LongTermRentLandlordCancelationStrategy } from '../../long-term-rent-landlord-cancelation.strategy';
import { LongTermRentTenantCancelationStrategy } from '../../long-term-rent-tenant-cancelation.strategy';
declare type CashOutWaitingLongTermRentTransactionsAmount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export declare const longTermRentTenantCancelationStrategyFactory: ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }: {
    contractCreateProps: IContractCreateProps;
    cashOutWaitingTransactionsAmount?: CashOutWaitingLongTermRentTransactionsAmount | undefined;
    completeTransactions?: number[] | undefined;
}) => LongTermRentTenantCancelationStrategy;
export declare const longTermRentLandlordCancelationStrategyFactory: ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }: {
    contractCreateProps: IContractCreateProps;
    cashOutWaitingTransactionsAmount?: CashOutWaitingLongTermRentTransactionsAmount | undefined;
    completeTransactions?: number[] | undefined;
}) => LongTermRentLandlordCancelationStrategy;
export {};
