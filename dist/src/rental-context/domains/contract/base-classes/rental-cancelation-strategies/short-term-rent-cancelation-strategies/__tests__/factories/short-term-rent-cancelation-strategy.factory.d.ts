import { IContractCreateProps } from '@domains/contract/base-classes/rental-strategies/__tests__/factories/contract-rental-strategy.factory';
import { ShortTermRentLandlordCancelationStrategy } from '../../short-term-rent-landlord-cancelation.strategy';
import { ShortTermRentTenantCancelationStrategy } from '../../short-term-rent-tenant-cancelation.strategy';
declare type CashOutWaitingMiddleTermRentTransactionsAmount = 1 | 2;
export declare const shortTermRentTenantCancelationStrategyFactory: ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }: {
    contractCreateProps: IContractCreateProps;
    cashOutWaitingTransactionsAmount?: CashOutWaitingMiddleTermRentTransactionsAmount | undefined;
    completeTransactions?: number[] | undefined;
}) => ShortTermRentTenantCancelationStrategy;
export declare const shortTermRentLandlordCancelationStrategyFactory: ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }: {
    contractCreateProps: IContractCreateProps;
    cashOutWaitingTransactionsAmount?: CashOutWaitingMiddleTermRentTransactionsAmount | undefined;
    completeTransactions?: number[] | undefined;
}) => ShortTermRentLandlordCancelationStrategy;
export {};
