import { CompleteCashOutTransactionReq, StartCashOutToRegisteredCardReq } from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';
export declare class InnopayCashOutSdkService {
    private readonly soapWriter;
    private readonly soapReader;
    private readonly baseSdkService;
    constructor(soapWriter: InnopaySoapWriter, soapReader: InnopaySoapReader, baseSdkService: InnopayBaseSdkService);
    startCashOutToRegisteredCard(req: StartCashOutToRegisteredCardReq): Promise<import("../innopay-api.types").StartCashOutToRegisteredCardRes>;
    completeCashOutTransaction(req: CompleteCashOutTransactionReq): Promise<import("../innopay-api.types").CashOutTransactionStatusRes>;
}
