import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';
import { isNumberString } from 'class-validator';

interface CustomerReferenceProps {
  customerReference: string;
  livinCustomerReference?: string;
}

export class CustomerReferenceVO extends ValueObject<CustomerReferenceProps> {
  constructor(value: CustomerReferenceProps) {
    super(value);
  }

  public get value(): CustomerReferenceProps {
    return {
      customerReference: this.props.customerReference,
      livinCustomerReference: this.props.livinCustomerReference,
    };
  }

  protected validate(value: CustomerReferenceProps): void {
    if (
      typeof value.customerReference !== 'string' ||
      !isNumberString(value.customerReference) ||
      (value.livinCustomerReference && typeof value.livinCustomerReference !== 'string') ||
      (value.livinCustomerReference && !isNumberString(value.livinCustomerReference))
    ) {
      throw new ArgumentInvalidException('customer reference has incorrect type');
    }
  }
}
