import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface TextMessageProps {
  text: string;
}

export class TextMessageVO extends ValueObject<TextMessageProps> {
  static create(props: TextMessageProps) {
    return new TextMessageVO(props);
  }

  get text() {
    return this.props.text;
  }

  protected validate({ text }: TextMessageProps): void {
    if (!Guard.isPositiveNumber(text.length) || text.length > 2000) {
      throw new ArgumentInvalidException('Message length must be more than 0 and less than 2000');
    }
  }
}
