import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { ContractStatus } from '@infrastructure/enums';

export type CreateContractStatus = Extract<ContractStatus, ContractStatus.CREATED | ContractStatus.CONCLUDED>;

export enum CancellationTrigger {
  TENANT = 'TENANT',
  LANDLORD = 'LANDLORD',
}

export interface AdminCancelationMode {
  force: boolean;
  validExcuse: boolean;
}

export interface InnopayPaymentPageData {
  url: string;
  startAt: string;
}

export interface CancellationData {
  refundsAmountToSender: number;
  transferAmountToRecipient: number;
  transferAmountToPlatform: number;
  cancelationDate: string;
  checkOutDate: string;
  recomputedLastStayTransaction?: PaymentTransactionEntity;
  withdrawalAmountFromSender?: number;
  withdrawalAmountFromRecipient?: number;
  isFine?: boolean;
}
