import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { CurrencyType } from '../domains/apartment-ad/domain/types';

export interface CostAndCurrencyProps {
  cost: number;
  currency: CurrencyType;
}

type CostAndCurrencyCreateProps = CostAndCurrencyProps;

export class CostAndCurrencyVO extends ValueObject<CostAndCurrencyProps> {
  get cost(): number {
    return this.props.cost;
  }

  get currency(): CurrencyType {
    return this.props.currency;
  }

  // TODO: for MVP implemented only one default currency KZT
  static create({
    cost,
    currency: defaultCurrency = CurrencyType.KZT,
  }: Omit<CostAndCurrencyCreateProps, 'currency'> & { currency?: CurrencyType }) {
    return new CostAndCurrencyVO({ cost: Math.round(cost), currency: defaultCurrency });
  }

  protected validate(props: CostAndCurrencyProps): void {
    if (!Guard.isValidEnum(props.currency, CurrencyType)) {
      throw new ArgumentInvalidException('Currency is not valid');
    }
    if (Guard.isNegative(props.cost)) {
      throw new ArgumentInvalidException('Cost is negative');
    }
  }
}
