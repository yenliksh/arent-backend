import { Injectable } from '@nestjs/common';

import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
import {
  InnopayCashInFailedStatus,
  InnopayCashInReadyToCompleteStatus,
  InnopayCashInSuccessStatus,
} from '../types/constants';
import { InnopayPayCardInfo } from '../types/innopay-payment.types';

export enum InnopayTransactionState {
  FAILED = 'FAILED', // final failed status
  IN_PROGRESS = 'IN_PROGRESS', // not final status
  READY_TO_COMPLETE = 'READY_TO_COMPLETE', // not final but ready to be final status (AUTHORISED)
  SUCCESS = 'SUCCESS', // final success status
}

@Injectable()
export class InnopayStatusService {
  constructor(private readonly innopayStatusSdkService: InnopayStatusSdkService) {}

  async getCashInTransactionInfo(
    customerReference: string,
  ): Promise<{ transactionState: InnopayTransactionState; cardInfo?: InnopayPayCardInfo }> {
    const checkCardResponseType = <T extends { userId?: string; cardId?: string }>(
      obj: InnopayPayCardInfo | T,
    ): obj is InnopayPayCardInfo => {
      return (obj as InnopayPayCardInfo)?.userId !== undefined && (obj as InnopayPayCardInfo)?.cardId !== undefined;
    };

    const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
      referenceNr: customerReference,
    });

    const status = transactionInfo.transactionStatus;

    const cardInfo = {
      cardId: transactionInfo.additionalInformation.CARD_ID,
      userId: transactionInfo.additionalInformation.USER_ID,
    };

    let transactionState = InnopayTransactionState.IN_PROGRESS; // by default

    if (InnopayCashInSuccessStatus.includes(status)) {
      transactionState = InnopayTransactionState.SUCCESS;
    }

    if (InnopayCashInReadyToCompleteStatus.includes(status)) {
      transactionState = InnopayTransactionState.READY_TO_COMPLETE;
    }

    if (InnopayCashInFailedStatus.includes(status)) {
      transactionState = InnopayTransactionState.FAILED;
    }

    return {
      transactionState,
      cardInfo: checkCardResponseType(cardInfo) ? cardInfo : undefined,
    };
  }
}
