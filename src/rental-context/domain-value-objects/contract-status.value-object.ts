import { ContractStatus } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ContractStatusProps {
  value: ContractStatus;
}

export class ContractStatusVO extends ValueObject<ContractStatusProps> {
  static create(type: ContractStatus) {
    return new ContractStatusVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: ContractStatusProps): void {
    if (value && !Guard.isValidEnum(value, ContractStatus)) {
      throw new ArgumentInvalidException('Unexpected contract type');
    }
  }
}
