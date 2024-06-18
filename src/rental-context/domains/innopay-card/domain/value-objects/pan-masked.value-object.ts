import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

export class PanMaskedVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = PanMaskedVO.format(value);
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (value == null) {
      throw new ArgumentInvalidException('Pan masked required');
    }
  }

  static format(panMasked: string) {
    return panMasked.length === 4 ? panMasked : panMasked.split(/\*+/)[1];
  }
}
