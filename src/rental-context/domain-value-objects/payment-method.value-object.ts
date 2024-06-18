import { PaymentMethod } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';
import { isUUID } from 'class-validator';

export interface PaymentMethodProps {
  defaultType: PaymentMethod;
  innopayCardId: string;
}

export class PaymentMethodVO extends ValueObject<PaymentMethodProps> {
  constructor(props: PaymentMethodProps) {
    super(props);
  }

  get defaultType() {
    return this.props.defaultType;
  }

  get innopayCardId() {
    return this.props.innopayCardId;
  }

  protected validate({ defaultType, innopayCardId }: PaymentMethodProps): void {
    if (!Guard.isValidEnum(defaultType, PaymentMethod)) {
      throw new ArgumentInvalidException('Unexpected payment type');
    }

    if (!defaultType || !innopayCardId) {
      throw new ArgumentInvalidException('Payment method must provide all fields');
    }

    if (!isUUID(innopayCardId, '4')) {
      throw new ArgumentInvalidException('Card id must be UUID v4');
    }
  }
}
