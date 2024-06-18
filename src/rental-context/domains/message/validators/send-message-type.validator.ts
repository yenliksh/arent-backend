import { ValidatorConstraint, ValidatorConstraintInterface, isEnum } from 'class-validator';

import { MessageType } from '../domain/types';

@ValidatorConstraint({ name: 'SendMessageTypeValidator', async: false })
export class SendMessageTypeValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return isEnum(value, MessageType) && value !== MessageType.SYSTEM;
  }

  defaultMessage() {
    return `Message type must be not SYSTEM`;
  }
}
