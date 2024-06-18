import { CustomerReferenceVO } from '@domains/payment-transaction/domain/value-objects/customer-reference.value-object';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

import { PaymentTransactionHasEmptyFieldsError } from '../errors/payment-transaction.errors';
import { CardMeta, PaymentInvoiceStatus, PaymentInvoiceType } from '../types';
import { PaymentInvoiceStatusVO } from '../value-objects/payment-invoice-status.value-object';

export interface CreatePaymentInvoiceProps {
  paymentTransactionId: UUID;
  date: DateTimeISOTZVO;
  status: PaymentInvoiceStatusVO;
  refersToUserId: UUID;
  type: PaymentInvoiceType;
  error?: string;
  cardMeta: CardMeta;
  customerReference: CustomerReferenceVO;
}

export type PaymentInvoiceProps = CreatePaymentInvoiceProps;

export class PaymentInvoiceEntity extends Entity<PaymentInvoiceProps> {
  protected readonly _id: UUID;

  static create({
    paymentTransactionId,
    date,
    status,
    refersToUserId,
    type,
    error,
    cardMeta,
    customerReference,
  }: CreatePaymentInvoiceProps): PaymentInvoiceEntity {
    const id = UUID.generate();

    const props: PaymentInvoiceProps = {
      paymentTransactionId,
      date,
      status,
      refersToUserId,
      type,
      error,
      cardMeta,
      customerReference,
    };

    const contractOffer = new PaymentInvoiceEntity({ id, props });

    return contractOffer;
  }

  get id() {
    return this._id;
  }

  get status() {
    return this.props.status.value;
  }

  validate(): void {
    const { paymentTransactionId, date, status, refersToUserId, type, error } = this.props;

    const fields = [paymentTransactionId, date, status, refersToUserId, type];

    if (fields.some((f) => f == null)) {
      throw new PaymentTransactionHasEmptyFieldsError(
        'Contract transaction invoice must to have complete all required fields',
      );
    }
    if (status.value === PaymentInvoiceStatus.SUCCESS && error) {
      throw new ArgumentInvalidException('Success invoice cannot have error message');
    }
  }
}
