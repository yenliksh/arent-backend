import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { Field, ObjectType } from '@nestjs/graphql';

import { ContractChatModel } from '../models/contract.model';

@ObjectType()
export class ContractSubscriptionResponse {
  @Field(() => ContractChatModel, { nullable: true })
  contract?: ContractChatModel;

  @Field(() => ContractPubSubEvent)
  event: ContractPubSubEvent;

  @Field(() => String, { nullable: true })
  error?: string;

  static create(props: ContractOrmEntity, contractPubSubEvent: ContractPubSubEvent, error?: string) {
    const payload = new ContractSubscriptionResponse();

    payload.contract = ContractChatModel.create(props);
    payload.error = error;
    payload.event = contractPubSubEvent;

    return payload;
  }
}
