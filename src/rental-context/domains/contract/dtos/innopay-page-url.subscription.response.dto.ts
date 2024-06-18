import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InnopayPageUrlSubscriptionResponse {
  @Field(() => String)
  url: string;

  @Field(() => String)
  startUrlDate: string;

  @Field(() => String, { nullable: true })
  contractId?: string;

  static create(url: string, startUrlDate: string, refs: { contractId?: string }) {
    const payload = new InnopayPageUrlSubscriptionResponse();

    payload.url = url;
    payload.startUrlDate = startUrlDate;
    payload.contractId = refs.contractId;

    return payload;
  }
}
