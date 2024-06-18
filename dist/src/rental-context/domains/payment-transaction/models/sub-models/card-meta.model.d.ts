import { CardMeta } from '@domains/payment-transaction/domain/types';
import { PaymentMethod } from '@infrastructure/enums';
export declare class CardMetaModel {
    id: string;
    paymentMethod: PaymentMethod;
    cardType: string;
    panMasked: string;
    cardHolder: string;
    static create(cardMeta: CardMeta): CardMetaModel;
}
