import { registerEnumType } from '@nestjs/graphql';

export enum PaymentHistorySearchType {
  RECURRING = 'RECURRING',
  SINGLE = 'SINGLE',
}

registerEnumType(PaymentHistorySearchType, {
  name: 'PaymentHistorySearchType',
});
