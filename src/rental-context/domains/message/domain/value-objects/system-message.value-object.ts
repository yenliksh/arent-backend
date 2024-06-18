import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { ISystemMessageData, SystemMessageType } from '../types';

export interface SystemMessageProps {
  type: SystemMessageType;
  contractData: ISystemMessageData;
}

export class SystemMessageVO extends ValueObject<SystemMessageProps> {
  static create({ type, contractData }: SystemMessageProps) {
    return new SystemMessageVO({ type, contractData });
  }

  get type() {
    return this.props.type;
  }

  get contractData() {
    return this.props.contractData;
  }

  protected validate({ type }: SystemMessageProps): void {
    if (type && !Guard.isValidEnum(type, SystemMessageType)) {
      throw new ArgumentInvalidException('Unexpected system message type');
    }
  }
}
