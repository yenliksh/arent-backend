import { InnopayAppointmentCardType, InnopayCardType } from '@domains/innopay-card/domain/types';
import { CardMeta } from '@domains/payment-transaction/domain/types';
import { PaymentMethod } from '@infrastructure/enums';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { Guard } from '@libs/ddd/domain/guard';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

import { InnopayCardHasEmptyFieldsError } from '../errors/innopay-card.errors';
import { PanMaskedVO } from '../value-objects/pan-masked.value-object';

export interface CreateInnopayCardProps {
  cnpCardId: number;
  panMasked: PanMaskedVO;
  cardHolder: string;
  cardType: InnopayCardType;
  appointmentType: InnopayAppointmentCardType;
  userId: UUID;
  cnpUserId: number;
}

export type InnopayCardProps = CreateInnopayCardProps;

export class InnopayCardEntity extends AggregateRoot<InnopayCardProps> {
  protected readonly _id: UUID;

  static create({
    cnpCardId,
    panMasked,
    cardHolder,
    cardType,
    cnpUserId,
    userId,
    appointmentType,
  }: CreateInnopayCardProps): InnopayCardEntity {
    const id = UUID.generate();

    const props: InnopayCardProps = {
      userId,
      cnpCardId,
      panMasked,
      cardHolder,
      cardType,
      cnpUserId,
      appointmentType,
    };

    const card = new InnopayCardEntity({ id, props });

    return card;
  }

  get id() {
    return this._id;
  }

  public get cnpCardId() {
    return this.props.cnpCardId;
  }

  public get cnpUserId() {
    return this.props.cnpUserId;
  }

  get userId() {
    return this.props.userId;
  }

  get cardMeta(): CardMeta {
    return {
      id: this._id.value,
      paymentMethod: PaymentMethod.INNOPAY,
      cardType: this.props.cardType,
      panMasked: this.props.panMasked.value,
      cardHolder: this.props.cardHolder,
    };
  }

  validate(): void {
    const { userId, cnpCardId, panMasked, cardHolder, cardType, cnpUserId } = this.props;

    const fields = [userId, cnpCardId, panMasked, cardHolder, cardType, cnpUserId];

    if (fields.some((f) => f == null)) {
      throw new InnopayCardHasEmptyFieldsError('Innopay card to complete all required fields');
    }
    if (!Guard.isPositiveNumber(cnpUserId)) {
      throw new ArgumentInvalidException('cnpUserId must be more that 0');
    }
  }
}
