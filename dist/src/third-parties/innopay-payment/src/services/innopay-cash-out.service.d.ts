import { CashOutTransactionStatus } from '../sdk/innopay-api.types';
import { InnopayCashOutSdkService } from '../sdk/services/innopay-cash-out-sdk.service';
import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
import { InnopayStartCashOut } from '../types/innopay-payment.types';
export declare class InnopayCashOutService {
    private readonly innopayCashOutSdkService;
    private readonly innopayStatusSdkService;
    constructor(innopayCashOutSdkService: InnopayCashOutSdkService, innopayStatusSdkService: InnopayStatusSdkService);
    startCashOut(props: {
        RECEIVER_CARD_ID: number;
        RECEIVER_USER_ID: number;
        USER_LOGIN: string;
        CARD_ID: number;
        USER_ID: number;
        senderName: string;
        tranAmount: number;
    }): Promise<{
        success: boolean;
        сashOutResult: InnopayStartCashOut;
    }>;
    endCashOut(referenceNr: string, success: boolean): Promise<{
        success: boolean;
        customerReference: string;
        status?: CashOutTransactionStatus;
    }>;
}
