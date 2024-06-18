import { Injectable } from '@nestjs/common';

import { InnopayServiceType } from '../../types/enums';
import { CompleteCardRegistrationReq, DeleteCardRegistrationReq, StartCardRegistrationReq } from '../innopay-api.types';
import { InnopaySoapReader } from '../innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from '../innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './innopay-base-sdk.service';

@Injectable()
export class InnopayCardSdkService {
  constructor(
    private readonly soapWriter: InnopaySoapWriter,
    private readonly soapReader: InnopaySoapReader,
    private readonly baseSdkService: InnopayBaseSdkService,
  ) {}

  async startCardRegistration(req: StartCardRegistrationReq) {
    const body = this.soapWriter.startCardRegistration(this.baseSdkService.virtualMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.ONE_CLICK, body);

    return this.soapReader.startCardRegistration(res.data);
  }

  async completeCardRegistration(req: CompleteCardRegistrationReq) {
    const body = this.soapWriter.completeCardRegistration(this.baseSdkService.virtualMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.ONE_CLICK, body);

    return this.soapReader.completeCardRegistration(res.data);
  }

  async deleteCardRegistration(req: DeleteCardRegistrationReq) {
    const body = this.soapWriter.deleteCardRegistration(this.baseSdkService.virtualMerchantId, req);
    const res = await this.baseSdkService.innopayRequest(InnopayServiceType.ONE_CLICK, body);

    return this.soapReader.deleteCardRegistration(res.data);
  }
}
