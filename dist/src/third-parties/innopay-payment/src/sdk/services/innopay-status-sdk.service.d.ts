import { GetCardStatusReq, GetCashOutTransactionStatusReq, GetPaymentStatusReq, GetTransactionStatusCodeReq } from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';
export declare class InnopayStatusSdkService {
    private readonly soapWriter;
    private readonly soapReader;
    private readonly baseSdkService;
    constructor(soapWriter: InnopaySoapWriter, soapReader: InnopaySoapReader, baseSdkService: InnopayBaseSdkService);
    getPaymentStatus(req: GetPaymentStatusReq): Promise<import("../innopay-api.types").GetPaymentStatusRes>;
    getCardStatus(req: GetCardStatusReq): Promise<import("../innopay-api.types").GetCardStatusRes>;
    getTransactionStatusCode(req: GetTransactionStatusCodeReq): Promise<import("../innopay-api.types").GetTransactionStatusCodeRes>;
    getCashOutTransactionStatus(req: GetCashOutTransactionStatusReq): Promise<import("../innopay-api.types").CashOutTransactionStatusRes>;
}
