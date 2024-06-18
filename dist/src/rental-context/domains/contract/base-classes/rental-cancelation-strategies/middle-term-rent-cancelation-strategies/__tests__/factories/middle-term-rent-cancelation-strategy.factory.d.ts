import { IContractCreateProps } from '@domains/contract/base-classes/rental-strategies/__tests__/factories/contract-rental-strategy.factory';
import { MiddleTermRentLandlordCancelationStrategy } from '../../middle-term-rent-landlord-cancelation.strategy';
import { MiddleTermRentTenantCancelationStrategy } from '../../middle-term-rent-tenant-cancelation.strategy';
declare type CashOutWaitingMiddleTermRentTransactionsAmount = 1 | 2 | 3;
export declare const middleTermRentTenantCancelationStrategyFactory: ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }: {
    contractCreateProps: IContractCreateProps;
    cashOutWaitingTransactionsAmount?: CashOutWaitingMiddleTermRentTransactionsAmount | undefined;
    completeTransactions?: number[] | undefined;
}) => MiddleTermRentTenantCancelationStrategy;
export declare const middleTermRentLandlordCancelationStrategyFactory: ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }: {
    contractCreateProps: IContractCreateProps;
    cashOutWaitingTransactionsAmount?: CashOutWaitingMiddleTermRentTransactionsAmount | undefined;
    completeTransactions?: number[] | undefined;
}) => MiddleTermRentLandlordCancelationStrategy;
export {};
