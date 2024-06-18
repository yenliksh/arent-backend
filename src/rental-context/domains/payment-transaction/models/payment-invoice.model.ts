import { PaymentInvoiceOrmEntity } from '@infrastructure/database/entities/payment-invoice.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Field, ObjectType } from '@nestjs/graphql';

import { PaymentInvoiceStatus, PaymentInvoiceType } from '../domain/types';
import { PaymentTransactionModel } from './payment-transaction.model';
import { CardMetaModel } from './sub-models/card-meta.model';

@ObjectType()
export class PaymentInvoiceModel extends ModelBase {
  constructor(message: PaymentInvoiceOrmEntity) {
    super(message);
  }

  @Field(() => String)
  paymentTransactionId: string;

  @Field(() => String)
  invoiceDate: string;

  @Field(() => String)
  refersToUserId: string;

  @Field(() => PaymentInvoiceType)
  type: PaymentInvoiceType;

  @Field(() => Boolean)
  isSuccess: boolean;

  @Field(() => CardMetaModel, { nullable: true })
  cardMeta?: CardMetaModel;

  @FieldFromResolver(() => PaymentTransactionModel)
  paymentTransaction?: PaymentTransactionModel;

  static create(props: PaymentInvoiceOrmEntity) {
    const payload = new PaymentInvoiceModel(props);

    const assignObject: Omit<PaymentInvoiceModel, keyof ModelBase> = {
      invoiceDate: props.createdAt.toISOString(),
      paymentTransactionId: props.paymentTransactionId,
      refersToUserId: props.refersToUserId,
      type: props.type,
      isSuccess: props.status === PaymentInvoiceStatus.SUCCESS,
      cardMeta: props.cardMeta ? CardMetaModel.create(props.cardMeta) : undefined,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
