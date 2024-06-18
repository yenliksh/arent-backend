import { InnopayCardSdkService } from '../sdk/services/innopay-card-sdk.service';
import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
import { InnopayEndSaveCard, InnopayStartSaveCard } from '../types/innopay-payment.types';
export declare class InnopayCardService {
    private readonly innopayCardSdkService;
    private readonly innopayStatusSdkService;
    constructor(innopayCardSdkService: InnopayCardSdkService, innopayStatusSdkService: InnopayStatusSdkService);
    startSaveCard(userLogin: string, returningUrl: string, userId?: number): Promise<InnopayStartSaveCard>;
    endSaveCard(cardId: number, userId: number, _customerReference: string): Promise<InnopayEndSaveCard>;
    deleteCard(cardId: number, userId: number): Promise<void>;
    getCardInfo(cardId: number, userId: number, customerReference: string): Promise<InnopayEndSaveCard>;
}
