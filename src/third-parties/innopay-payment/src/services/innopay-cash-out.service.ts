import { DateUtil } from '@libs/utils/date-util';
import { BadGatewayException, Injectable } from '@nestjs/common';

import { CashOutTransactionStatus, InnopayDateTimeFormat } from '../sdk/innopay-api.types';
import { InnopayCashOutSdkService } from '../sdk/services/innopay-cash-out-sdk.service';
import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
import { InnopayStartCashOut } from '../types/innopay-payment.types';

@Injectable()
export class InnopayCashOutService {
  constructor(
    private readonly innopayCashOutSdkService: InnopayCashOutSdkService,
    private readonly innopayStatusSdkService: InnopayStatusSdkService,
  ) {}

  async startCashOut(props: {
    RECEIVER_CARD_ID: number;
    RECEIVER_USER_ID: number;
    USER_LOGIN: string;
    CARD_ID: number;
    USER_ID: number;
    senderName: string;
    tranAmount: number;
  }): Promise<{ success: boolean; сashOutResult: InnopayStartCashOut }> {
    const checkResponseType = <T extends { customerReference?: string }>(
      obj: InnopayStartCashOut | T,
    ): obj is InnopayStartCashOut => {
      return (obj as InnopayStartCashOut)?.customerReference !== undefined;
    };

    // start cash out transaction
    const startTransactionResult = await this.innopayCashOutSdkService.startCashOutToRegisteredCard({
      additionalInformationList: {
        RECEIVER_CARD_ID: props.RECEIVER_CARD_ID,
        RECEIVER_USER_ID: props.RECEIVER_USER_ID,
        USER_LOGIN: props.USER_LOGIN,
        CARD_ID: props.CARD_ID,
        USER_ID: props.USER_ID,
      },
      merchantLocalDateTime: DateUtil.utcNow().format(InnopayDateTimeFormat).toString(),
      senderName: props.senderName,
      tranAmount: props.tranAmount,
    });

    if (!checkResponseType(startTransactionResult)) {
      throw new BadGatewayException(startTransactionResult.errorDescription);
    }

    // check status
    const paymentStatus = await this.innopayStatusSdkService.getCashOutTransactionStatus({
      referenceNr: startTransactionResult.customerReference,
    });

    if (paymentStatus.transactionStatus !== CashOutTransactionStatus.PENDING_APPROVEMENT) {
      return { success: false, сashOutResult: startTransactionResult };
    }

    return { success: true, сashOutResult: startTransactionResult };
  }

  async endCashOut(
    referenceNr: string,
    success: boolean,
  ): Promise<{ success: boolean; customerReference: string; status?: CashOutTransactionStatus }> {
    // check status before complete
    const paymentStatusBeforeComplete = await this.innopayStatusSdkService.getCashOutTransactionStatus({
      referenceNr,
    });

    if (paymentStatusBeforeComplete.transactionStatus !== CashOutTransactionStatus.PENDING_APPROVEMENT) {
      return { success: false, customerReference: referenceNr, status: paymentStatusBeforeComplete.transactionStatus };
    }

    await this.innopayCashOutSdkService.completeCashOutTransaction({
      referenceNr,
      transactionSuccess: success,
    });

    // check status after complete
    const paymentStatusAfterComplete = await this.innopayStatusSdkService.getCashOutTransactionStatus({
      referenceNr,
    });

    const isSuccess =
      (success && paymentStatusAfterComplete.transactionStatus === CashOutTransactionStatus.PROCESSED) ||
      (!success && paymentStatusAfterComplete.transactionStatus === CashOutTransactionStatus.DECLINED);

    return {
      success: isSuccess,
      customerReference: referenceNr,
      status: paymentStatusAfterComplete.transactionStatus,
    };
  }
}
