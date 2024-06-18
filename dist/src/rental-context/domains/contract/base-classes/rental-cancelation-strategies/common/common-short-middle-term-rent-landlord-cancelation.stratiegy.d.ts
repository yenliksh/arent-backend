import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { Dayjs } from 'dayjs';
import { RentPeriodStrategyType } from '../../rental-manager/types';
import { RentalCancelationStrategyBase } from '../rental-cancelation-strategy.base';
import { PeriodTypes } from '../types';
export declare abstract class CommonShortMiddleTermRentLandlordCancelationStrategy<T extends RentPeriodStrategyType> extends RentalCancelationStrategyBase<T> {
    readonly contract: ContractEntity;
    readonly transactions: PaymentTransactionEntity[];
    protected arrivalDate: string;
    protected departureDate: string;
    protected _validExcuse: boolean;
    private _numberOfHoursBeforeTransferMoneyAfterStay;
    private _strictTimeBeforeArrival;
    protected _senderTaxRate: number;
    protected _recipientTaxRate: number;
    abstract cancelType: RentPeriodStrategyType;
    validExcuse(): void;
    constructor(contract: ContractEntity, transactions: PaymentTransactionEntity[]);
    protected nowIsStayTime: (now?: Dayjs) => boolean;
    protected currentPayedTransaction(now?: Dayjs): PaymentTransactionEntity | undefined;
    protected periodTypeMap: {
        [P in PeriodTypes]: (now: Dayjs) => boolean;
    };
    protected computeTaxByAdminCancelation: (now: Dayjs | undefined, currentPayedTransaction: PaymentTransactionEntity) => {
        refundsAmountToSender: number;
        totalAmountToBeTransferred: number;
        totalRevenue: number;
    };
    protected computeTaxByLivedHours: (now: Dayjs | undefined, currentPayedTransaction: PaymentTransactionEntity) => {
        refundsAmountToSender: number;
        totalAmountToBeTransferred: number;
        withdrawalAmountFromRecipient: number;
        totalRevenue: number;
    };
    private get costPerHour();
    private getUnusedAmountOfHours;
    private getTotalHours;
}
