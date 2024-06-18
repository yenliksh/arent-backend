import { registerEnumType } from '@nestjs/graphql';

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(GenderType, {
  name: 'GenderType',
});

export enum IdentityStatusType {
  APPROVED = 'APPROVED',
  NOT_CONFIRMED = 'NOT_CONFIRMED',
  REJECTED = 'REJECTED',
  PROCESSING = 'PROCESSING',
}

registerEnumType(IdentityStatusType, {
  name: 'IdentityStatusType',
});
