import { InnopayPaymentPageData } from '@domains/contract/domain/types';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InnopayPaymentPageModel {
  @Field(() => String)
  url: string;

  @Field(() => String)
  startAt: string;

  static create(props: InnopayPaymentPageData) {
    const payload = new InnopayPaymentPageModel();

    payload.url = props.url;
    payload.startAt = props.startAt;

    return payload;
  }
}
