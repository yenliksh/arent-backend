import { Injectable } from '@nestjs/common';

import { InnopayServiceType } from '../../types/enums';
import { CompleteCashOutTransactionReq, StartCashOutToRegisteredCardReq } from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';

@Injectable()
export class InnopayCashOutSdkService {
  constructor(
    private readonly soapWriter: InnopaySoapWriter,
    private readonly soapReader: InnopaySoapReader,
    private readonly baseSdkService: InnopayBaseSdkService,
  ) {}

  async startCashOutToRegisteredCard(req: StartCashOutToRegisteredCardReq) {
    const body = this.soapWriter.startCashOutToRegisteredCard(
      this.baseSdkService.realMerchantId,
      this.baseSdkService.merchantKeyword,
      req,
    );

    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.E_COM, body);

    return this.soapReader.startCashOutToRegisteredCard(res.data);
  }

  async completeCashOutTransaction(req: CompleteCashOutTransactionReq) {
    const body = this.soapWriter.completeCashOutTransaction(
      this.baseSdkService.realMerchantId,
      this.baseSdkService.merchantKeyword,
      req,
    );

    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.E_COM, body);

    return this.soapReader.completeCashOutTransaction(res.data);
  }
}
