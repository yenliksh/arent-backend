import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { PaymentInvoiceStatus } from '../types';

export interface PaymentInvoiceStatusProps {
  value: PaymentInvoiceStatus;
}

export class PaymentInvoiceStatusVO extends ValueObject<PaymentInvoiceStatusProps> {
  static create(type: PaymentInvoiceStatus) {
    return new PaymentInvoiceStatusVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: PaymentInvoiceStatusProps): void {
    if (value && !Guard.isValidEnum(value, PaymentInvoiceStatus)) {
      throw new ArgumentInvalidException('Unexpected transaction status type');
    }
  }
}
