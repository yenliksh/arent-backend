import { CompleteCardRegistrationReq, DeleteCardRegistrationReq, StartCardRegistrationReq } from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';
export declare class InnopayCardSdkService {
    private readonly soapWriter;
    private readonly soapReader;
    private readonly baseSdkService;
    constructor(soapWriter: InnopaySoapWriter, soapReader: InnopaySoapReader, baseSdkService: InnopayBaseSdkService);
    startCardRegistration(req: StartCardRegistrationReq): Promise<import("../innopay-api.types").StartCardRegistrationRes>;
    completeCardRegistration(req: CompleteCardRegistrationReq): Promise<boolean>;
    deleteCardRegistration(req: DeleteCardRegistrationReq): Promise<boolean>;
}
