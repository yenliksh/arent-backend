import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { BadGatewayException, Injectable } from '@nestjs/common';

import { InnopayDateTimeFormat } from '../sdk/innopay-api.types';
import { InnopayCashInSdkService } from '../sdk/services/innopay-cash-in-sdk.service';
import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
import {
  InnopayCashInCanceledStatus,
  InnopayCashInReadyToCompleteStatus,
  InnopayCashInSuccessStatus,
} from '../types/constants';

@Injectable()
export class InnopayCashInService {
  constructor(
    private readonly innopayCashInSdkService: InnopayCashInSdkService,
    private readonly innopayStatusSdkService: InnopayStatusSdkService,
  ) {}

  async paySavedCard(props: {
    amount: number;
    cardId: number;
    userLogin: string;
    userId: number;
    paymentTarget: string;
  }) {
    // start pay transaction
    const startTransactionResult = await this.innopayCashInSdkService.pay(props);

    if (!startTransactionResult.success || !startTransactionResult.customerReference) {
      throw new BadGatewayException(startTransactionResult.errorDescription);
    }

    // check status before complete
    const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
      referenceNr: startTransactionResult.customerReference,
    });

    if (
      ![...InnopayCashInReadyToCompleteStatus, ...InnopayCashInSuccessStatus].includes(
        transactionInfo.transactionStatus,
      )
    ) {
      return { payResult: false, customerReference: startTransactionResult.customerReference };
    }

    let payResult = true;

    // complete if not completed
    if (InnopayCashInReadyToCompleteStatus.includes(transactionInfo.transactionStatus)) {
      payResult = await this.innopayCashInSdkService.completePayment({
        customerReference: startTransactionResult.customerReference,
        transactionSuccess: true,
      });
    }

    // check status after complete
    const completedTransactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
      referenceNr: startTransactionResult.customerReference,
    });

    if (!InnopayCashInSuccessStatus.includes(completedTransactionInfo.transactionStatus)) {
      return { payResult: false, customerReference: startTransactionResult.customerReference };
    }

    // return complete result
    return {
      payResult,
      customerReference: startTransactionResult.customerReference,
    };
  }

  async startCashInFromNewCard(props: {
    totalAmount: number;
    returnURL: string;
    currencyCode?: number; // TODO: change to enum
    languageCode?: string; // TODO: change to enum
    description?: string;
  }) {
    const startTransactionResult = await this.innopayCashInSdkService.startTransaction({
      ...props,
      merchantLocalDateTime: DateUtil.utcNow().format(InnopayDateTimeFormat).toString(),
    });

    if (
      !startTransactionResult.success ||
      !startTransactionResult.customerReference ||
      !startTransactionResult.redirectURL
    ) {
      throw new BadGatewayException(startTransactionResult.errorDescription);
    }

    return {
      customerReference: startTransactionResult.customerReference,
      redirectURL: startTransactionResult.redirectURL,
    };
  }

  async endCashInFromNewCard(props: {
    customerReference: string;
    transactionSuccess: boolean;
    overrideAmount?: number;
  }) {
    if (props.overrideAmount && props.overrideAmount < 0) {
      throw new ArgumentOutOfRangeException('Override amount must be positive number');
    }

    const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
      referenceNr: props.customerReference,
    });

    if (!InnopayCashInReadyToCompleteStatus.includes(transactionInfo.transactionStatus)) {
      throw new BadGatewayException(`Innopay transaction status = ${transactionInfo.transactionStatus}`);
    }

    await this.innopayCashInSdkService.completeTransaction({
      referenceNr: props.customerReference,
      transactionSuccess: props.transactionSuccess,
      overrideAmount: props.overrideAmount,
    });

    const completedTransactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
      referenceNr: props.customerReference,
    });

    return InnopayCashInSuccessStatus.includes(completedTransactionInfo.transactionStatus);
  }

  async cancelECommTransaction(customerReference: string) {
    const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
      referenceNr: customerReference,
    });

    if (!InnopayCashInReadyToCompleteStatus.includes(transactionInfo.transactionStatus)) {
      throw new BadGatewayException(`Innopay transaction status = ${transactionInfo.transactionStatus}`);
    }

    const result = await this.innopayCashInSdkService.completeTransaction({
      referenceNr: customerReference,
      transactionSuccess: false,
    });

    const completedTransactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
      referenceNr: customerReference,
    });

    // after completeTransaction status must be = REVERSED
    if (!InnopayCashInCanceledStatus.includes(completedTransactionInfo.transactionStatus)) {
      throw new BadGatewayException(`Innopay transaction status = ${completedTransactionInfo.transactionStatus}`);
    }

    return result;
  }
}
