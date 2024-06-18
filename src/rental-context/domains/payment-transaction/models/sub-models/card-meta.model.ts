import { CardMeta } from '@domains/payment-transaction/domain/types';
import { PaymentMethod } from '@infrastructure/enums';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CardMetaModel {
  @Field(() => String)
  id: string;

  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field(() => String)
  cardType: string;

  @Field(() => String)
  panMasked: string;

  @Field(() => String)
  cardHolder: string;

  static create(cardMeta: CardMeta) {
    const payload = new CardMetaModel();

    Object.assign(payload, cardMeta);

    return payload;
  }
}
