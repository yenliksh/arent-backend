import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
import { InnopayPayCardInfo } from '../types/innopay-payment.types';
export declare enum InnopayTransactionState {
    FAILED = "FAILED",
    IN_PROGRESS = "IN_PROGRESS",
    READY_TO_COMPLETE = "READY_TO_COMPLETE",
    SUCCESS = "SUCCESS"
}
export declare class InnopayStatusService {
    private readonly innopayStatusSdkService;
    constructor(innopayStatusSdkService: InnopayStatusSdkService);
    getCashInTransactionInfo(customerReference: string): Promise<{
        transactionState: InnopayTransactionState;
        cardInfo?: InnopayPayCardInfo;
    }>;
}
