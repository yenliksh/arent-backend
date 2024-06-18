import { UrlVO } from '@domains/user/domain/value-objects';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface TemporaryPaymentUrlProps {
  customerReference: string;
  paymentUrl: UrlVO;
  paymentUrlStartAt: Date;
}

export class TemporaryPaymentDataVO extends ValueObject<TemporaryPaymentUrlProps> {
  constructor(props: TemporaryPaymentUrlProps) {
    super(props);
  }

  get customerReference() {
    return this.props.customerReference;
  }

  get paymentUrl() {
    return this.props.paymentUrl.value;
  }

  get paymentUrlStartAt() {
    return this.props.paymentUrlStartAt.toISOString();
  }

  protected validate(props: TemporaryPaymentUrlProps): void {
    const { paymentUrlStartAt } = props;
    if (Guard.isFutureDate(paymentUrlStartAt.toISOString())) {
      throw new ArgumentInvalidException('paymentUrlStartAt must be more that start date');
    }
  }
}
