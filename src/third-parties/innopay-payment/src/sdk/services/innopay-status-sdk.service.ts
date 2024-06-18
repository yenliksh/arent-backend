import { Injectable } from '@nestjs/common';

import { InnopayServiceType } from '../../types/enums';
import {
  GetCardStatusReq,
  GetCashOutTransactionStatusReq,
  GetPaymentStatusReq,
  GetTransactionStatusCodeReq,
} from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';

@Injectable()
export class InnopayStatusSdkService {
  constructor(
    private readonly soapWriter: InnopaySoapWriter,
    private readonly soapReader: InnopaySoapReader,
    private readonly baseSdkService: InnopayBaseSdkService,
  ) {}

  async getPaymentStatus(req: GetPaymentStatusReq) {
    const body = this.soapWriter.getPaymentStatus(this.baseSdkService.realMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.ONE_CLICK, body);

    return this.soapReader.getPaymentStatus(res.data);
  }

  async getCardStatus(req: GetCardStatusReq) {
    const body = this.soapWriter.getCardStatus(this.baseSdkService.virtualMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.ONE_CLICK, body);

    return this.soapReader.getCardStatus(res.data);
  }

  async getTransactionStatusCode(req: GetTransactionStatusCodeReq) {
    const body = this.soapWriter.getTransactionStatusCode(this.baseSdkService.realMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.E_COM, body);

    return this.soapReader.getTransactionStatusCode(res.data);
  }

  async getCashOutTransactionStatus(req: GetCashOutTransactionStatusReq) {
    const body = this.soapWriter.getCashOutTransactionStatus(
      this.baseSdkService.realMerchantId,
      this.baseSdkService.merchantKeyword,
      req,
    );

    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.E_COM, body);

    return this.soapReader.getCashOutTransactionStatus(res.data);
  }
}
