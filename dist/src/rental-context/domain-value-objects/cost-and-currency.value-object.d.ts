import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { CurrencyType } from '../domains/apartment-ad/domain/types';
export interface CostAndCurrencyProps {
    cost: number;
    currency: CurrencyType;
}
declare type CostAndCurrencyCreateProps = CostAndCurrencyProps;
export declare class CostAndCurrencyVO extends ValueObject<CostAndCurrencyProps> {
    get cost(): number;
    get currency(): CurrencyType;
    static create({ cost, currency: defaultCurrency, }: Omit<CostAndCurrencyCreateProps, 'currency'> & {
        currency?: CurrencyType;
    }): CostAndCurrencyVO;
    protected validate(props: CostAndCurrencyProps): void;
}
export {};
