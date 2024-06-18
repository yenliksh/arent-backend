import { InnopayCashInSdkService } from '../sdk/services/innopay-cash-in-sdk.service';
import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
export declare class InnopayCashInService {
    private readonly innopayCashInSdkService;
    private readonly innopayStatusSdkService;
    constructor(innopayCashInSdkService: InnopayCashInSdkService, innopayStatusSdkService: InnopayStatusSdkService);
    paySavedCard(props: {
        amount: number;
        cardId: number;
        userLogin: string;
        userId: number;
        paymentTarget: string;
    }): Promise<{
        payResult: boolean;
        customerReference: string;
    }>;
    startCashInFromNewCard(props: {
        totalAmount: number;
        returnURL: string;
        currencyCode?: number;
        languageCode?: string;
        description?: string;
    }): Promise<{
        customerReference: string;
        redirectURL: string;
    }>;
    endCashInFromNewCard(props: {
        customerReference: string;
        transactionSuccess: boolean;
        overrideAmount?: number;
    }): Promise<boolean>;
    cancelECommTransaction(customerReference: string): Promise<boolean>;
}
