import { registerEnumType } from '@nestjs/graphql';

export type ContractCursorType = {
  createdAt: Date;
};

export enum ContractPaymentStatusType {
  SHORT_FULL = 'SHORT_FULL',
  SHORT_PARTIAL = 'SHORT_PARTIAL',
  RECURRING_COMPLETED = 'RECURRING_COMPLETED',
  RECURRING = 'RECURRING',
  REFUND = 'REFUND',
  CANCELED = 'CANCELED',
}

registerEnumType(ContractPaymentStatusType, {
  name: 'ContractPaymentStatusType',
});
