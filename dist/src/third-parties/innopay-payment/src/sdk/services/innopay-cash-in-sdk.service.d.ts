import { CompletePaymentReq, CompleteTransactionReq, PayReq, StartTransactionReq } from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';
export declare class InnopayCashInSdkService {
    private readonly soapWriter;
    private readonly soapReader;
    private readonly baseSdkService;
    constructor(soapWriter: InnopaySoapWriter, soapReader: InnopaySoapReader, baseSdkService: InnopayBaseSdkService);
    startTransaction(req: StartTransactionReq): Promise<import("../innopay-api.types").StartTransactionRes>;
    completeTransaction(req: CompleteTransactionReq): Promise<boolean>;
    pay(req: PayReq): Promise<import("../innopay-api.types").PayRes>;
    completePayment(req: CompletePaymentReq): Promise<boolean>;
}
