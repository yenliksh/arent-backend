import { Injectable } from '@nestjs/common';

import { InnopayServiceType } from '../../types/enums';
import { CompletePaymentReq, CompleteTransactionReq, PayReq, StartTransactionReq } from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';

@Injectable()
export class InnopayCashInSdkService {
  constructor(
    private readonly soapWriter: InnopaySoapWriter,
    private readonly soapReader: InnopaySoapReader,
    private readonly baseSdkService: InnopayBaseSdkService,
  ) {}

  async startTransaction(req: StartTransactionReq) {
    const body = this.soapWriter.startTransaction(this.baseSdkService.realMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.E_COM, body);

    return this.soapReader.startTransaction(res.data);
  }

  async completeTransaction(req: CompleteTransactionReq) {
    const body = this.soapWriter.completeTransaction(this.baseSdkService.realMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.E_COM, body);

    return this.soapReader.completeTransaction(res.data);
  }

  async pay(req: PayReq) {
    const body = this.soapWriter.pay(this.baseSdkService.realMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.ONE_CLICK, body);

    return this.soapReader.pay(res.data);
  }

  async completePayment(req: CompletePaymentReq) {
    const body = this.soapWriter.completePayment(this.baseSdkService.realMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.ONE_CLICK, body);

    return this.soapReader.completePayment(res.data);
  }
}
