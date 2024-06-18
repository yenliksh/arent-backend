import { BadGatewayException, Injectable } from '@nestjs/common';

import { CardRegistrationStatus } from '../sdk/innopay-api.types';
import { InnopayCardSdkService } from '../sdk/services/innopay-card-sdk.service';
import { InnopayStatusSdkService } from '../sdk/services/innopay-status-sdk.service';
import { InnopayEndSaveCard, InnopayStartSaveCard } from '../types/innopay-payment.types';
import { getCardType } from './utils/get-card-type.util';

@Injectable()
export class InnopayCardService {
  constructor(
    private readonly innopayCardSdkService: InnopayCardSdkService,
    private readonly innopayStatusSdkService: InnopayStatusSdkService,
  ) {}

  async startSaveCard(userLogin: string, returningUrl: string, userId?: number): Promise<InnopayStartSaveCard> {
    const checkResponseType = <T extends { userId?: number; redirectURL?: string }>(
      obj: InnopayStartSaveCard | T,
    ): obj is InnopayStartSaveCard => {
      return (
        (obj as InnopayStartSaveCard)?.userId !== undefined && (obj as InnopayStartSaveCard)?.redirectURL !== undefined
      );
    };

    const data = await this.innopayCardSdkService.startCardRegistration({
      userLogin,
      userId,
      returningUrl,
    });

    if (!data.success || !checkResponseType(data)) {
      throw new BadGatewayException(data.errorDescription);
    }

    return data;
  }

  async endSaveCard(cardId: number, userId: number, _customerReference: string): Promise<InnopayEndSaveCard> {
    const checkResponseType = <T extends { cardHolder?: string; panMasked?: string }>(
      obj: InnopayEndSaveCard | T,
    ): obj is InnopayEndSaveCard => {
      return (
        (obj as InnopayEndSaveCard)?.cardHolder !== undefined &&
        (obj as InnopayEndSaveCard)?.panMasked !== undefined &&
        (obj as InnopayEndSaveCard)?.status !== undefined &&
        (obj as InnopayEndSaveCard)?.status in CardRegistrationStatus
      );
    };

    // const paymentStatus = await this.innopayStatusSdkService.getPaymentStatus({
    //   userId,
    //   customerReference,
    // });

    const data = await this.innopayStatusSdkService.getCardStatus({
      cardId,
      userId,
    });

    if (data.status === CardRegistrationStatus.NOT_FOUND) {
      throw new BadGatewayException('Card with this credentials not found');
    }

    if (!checkResponseType(data)) {
      throw new BadGatewayException(`Card registration status = ${data.status}`);
    }

    // if (data.status === CardRegistrationStatus.UNCOMPLETED) {
    //   const registrationCompleted = await this.innopayCardSdkService.completeCardRegistration({
    //     cardId,
    //     testAmount: paymentStatus.amountRequested,
    //     userId,
    //   });

    //   if (!registrationCompleted) {
    //     throw new BadGatewayException('Test amount is not correct');
    //   }

    //   const registeredCardStatus = await this.innopayStatusSdkService.getCardStatus({
    //     cardId,
    //     userId,
    //   });

    //   if (!checkResponseType(registeredCardStatus)) {
    //     throw new BadGatewayException(`Card registration status = ${registeredCardStatus.status}`);
    //   }
    // }

    // return { ...data, ...paymentStatus };

    return { ...data, cardType: getCardType(data.panMasked) };
  }

  async deleteCard(cardId: number, userId: number): Promise<void> {
    const data = await this.innopayCardSdkService.deleteCardRegistration({
      cardId,
      userId,
    });

    if (!data) {
      throw new BadGatewayException(`Card with id=${cardId} not deleted`);
    }
  }

  async getCardInfo(cardId: number, userId: number, customerReference: string): Promise<InnopayEndSaveCard> {
    const checkResponseType = <T extends { cardHolder?: string; panMasked?: string }>(
      obj: InnopayEndSaveCard | T,
    ): obj is InnopayEndSaveCard => {
      return (
        (obj as InnopayEndSaveCard)?.cardHolder !== undefined && (obj as InnopayEndSaveCard)?.panMasked !== undefined
      );
    };

    const paymentStatus = await this.innopayStatusSdkService.getPaymentStatus({
      userId,
      customerReference,
    });

    const data = await this.innopayStatusSdkService.getCardStatus({
      cardId,
      userId,
    });

    if (data.status !== CardRegistrationStatus.REGISTERED || !checkResponseType(data)) {
      throw new BadGatewayException(`Card registration status = ${data.status}`);
    }

    return { ...data, ...paymentStatus };
  }
}
