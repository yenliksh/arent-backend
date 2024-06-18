import { CardRegistrationStatus } from '../sdk/innopay-api.types';
export declare type InnopayStartSaveCard = {
    redirectURL: string;
    userId: number;
};
export declare type InnopayEndSaveCard = {
    cardHolder: string;
    cardId: number;
    panMasked: string;
    status: CardRegistrationStatus;
    uniqueCardId: number;
    userId: number;
    userLogin?: string;
    cardType: string;
};
export declare type InnopayStartCashOut = {
    customerReference: string;
};
export declare type InnopayPayCardInfo = {
    cardId: string;
    userId: string;
};
