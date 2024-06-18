import { registerEnumType } from '@nestjs/graphql';

// TODO: rename enum
export enum UserChatRole {
  TENANT = 'TENANT',
  LANDLORD = 'LANDLORD',
}

registerEnumType(UserChatRole, {
  name: 'UserChatRole',
});

export type ChatCursorType = {
  contractId: string;
  updatedAt: Date;
};
