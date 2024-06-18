import { ContractExceptions } from '@domains/contract/bulls/types';
import { BaseSystemMessageData } from '@domains/message/domain/types';
import { PaymentTransactionMeta } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { registerEnumType } from '@nestjs/graphql';
import { UserChatRole } from 'src/rental-context/domains/chat/domain/types';

export type MessagePubSubResPayload = {
  message: Omit<MessageOrmEntity, 'contractData'> & {
    contractData: BaseSystemMessageData & { transactionsMeta?: PaymentTransactionMeta[] };
  };
  chatMembers: Record<string, UserChatRole>;
};

export type MessagePubSubPayload = {
  message: MessageOrmEntity;
  chatMembers: Record<string, UserChatRole>;
};

export type ContractPubSubPayload = {
  contract: ContractOrmEntity;
  event: ContractPubSubEvent;
  error?: ContractExceptions;
};

export type PaymentTransactionPubSubPayload = {
  paymentTransaction: PaymentTransactionOrmEntity;
  cardOwnerId: string;
  event: PaymentTransactionPubSubEvent;
};

export type InnopayPageUrlPubSubPayload = {
  payingId: string;
  url: string;
  startUrlDate: Date;
  contractId?: string;
};

export enum ContractPubSubEvent {
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
}

registerEnumType(ContractPubSubEvent, {
  name: 'ContractPubSubEvent',
});

export enum PaymentTransactionPubSubEvent {
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
}

registerEnumType(PaymentTransactionPubSubEvent, {
  name: 'PaymentTransactionPubSubEvent',
});
