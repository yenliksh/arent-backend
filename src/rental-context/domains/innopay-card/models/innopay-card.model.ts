import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Field, ObjectType } from '@nestjs/graphql';

import { InnopayAppointmentCardType, InnopayCardType } from '../domain/types';

@ObjectType()
export class InnopayCardModel extends ModelBase {
  constructor(card: InnopayCardOrmEntity) {
    super(card);
  }
  @Field(() => Number)
  cnpCardId: number;

  @Field(() => String)
  panMasked: string;

  @Field(() => InnopayCardType)
  cardType: InnopayCardType;

  @Field(() => InnopayAppointmentCardType)
  appointmentType: InnopayAppointmentCardType;

  static create(props: InnopayCardOrmEntity) {
    const payload = new InnopayCardModel(props);

    const assignObject: Omit<InnopayCardModel, keyof ModelBase> = {
      cardType: props.cardType,
      cnpCardId: props.cnpCardId,
      panMasked: props.panMasked,
      appointmentType: props.appointmentType,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
