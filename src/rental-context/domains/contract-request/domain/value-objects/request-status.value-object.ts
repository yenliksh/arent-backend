import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { ContractRequestStatus } from '../types';

export interface ContractRequestStatusProps {
  value: ContractRequestStatus;
}

export class ContractRequestStatusVO extends ValueObject<ContractRequestStatusProps> {
  static create(type: ContractRequestStatus) {
    return new ContractRequestStatusVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: ContractRequestStatusProps): void {
    if (value && !Guard.isValidEnum(value, ContractRequestStatus)) {
      throw new ArgumentInvalidException('Unexpected request status type');
    }
  }
}
