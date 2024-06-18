import { registerEnumType } from '@nestjs/graphql';

export enum ContractRequestStatus {
  REJECTED = 'REJECTED',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
}

registerEnumType(ContractRequestStatus, {
  name: 'ContractRequestStatus',
});

export type ContractRequestCursorType = {
  id: string;
  createdAt: Date;
};
