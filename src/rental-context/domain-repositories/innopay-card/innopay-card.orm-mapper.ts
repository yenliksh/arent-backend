import { InnopayAppointmentCardType } from '@domains/innopay-card/domain/types';
import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { InnopayUsersOrmEntity } from '@infrastructure/database/entities/innopay-users.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { ArgumentInvalidException } from '@libs/exceptions';
import { v4 as uuidv4 } from 'uuid';

import { InnopayCardEntity, InnopayCardProps } from '../../domains/innopay-card/domain/entities/innopay-card.entity';
import { PanMaskedVO } from '../../domains/innopay-card/domain/value-objects/pan-masked.value-object';

export class InnopayCardOrmMapper extends OrmMapper<InnopayCardEntity, InnopayCardOrmEntity> {
  protected async toOrmProps(
    entity: InnopayCardEntity,
    trxId?: TransactionId,
  ): Promise<OrmEntityProps<InnopayCardOrmEntity>> {
    const props = entity.getPropsCopy();

    const trx = trxId ? this.unitOfWork?.getTrx(trxId) : undefined;

    let innopayUser = await InnopayUsersOrmEntity.query(trx)
      .findOne({ userId: props.userId.value, cnpUserId: props.cnpUserId })
      .select('id');
    if (!innopayUser) {
      innopayUser = await InnopayUsersOrmEntity.query(trx).insertAndFetch({
        id: uuidv4(),
        cnpUserId: props.cnpUserId,
        userId: props.userId.value,
        isCrediting: props.appointmentType === InnopayAppointmentCardType.CREDITING,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const ormProps: OrmEntityProps<InnopayCardOrmEntity> = {
      cnpCardId: props.cnpCardId,
      panMasked: props.panMasked.value,
      cardHolder: props.cardHolder,
      cardType: props.cardType,
      innopayId: innopayUser.id,
      appointmentType: props.appointmentType,
    };

    return ormProps;
  }

  protected async toDomainProps(
    ormEntity: InnopayCardOrmEntity,
    trxId?: TransactionId,
  ): Promise<EntityProps<InnopayCardProps>> {
    const id = new UUID(ormEntity.id);

    const trx = trxId ? this.unitOfWork?.getTrx(trxId) : undefined;

    const innopayUser = await InnopayUsersOrmEntity.query(trx)
      .findById(ormEntity.innopayId)
      .select('userId', 'cnpUserId');

    if (!innopayUser) {
      throw new ArgumentInvalidException('Innopay user not exist');
    }

    const props: InnopayCardProps = {
      cnpCardId: ormEntity.cnpCardId,
      panMasked: new PanMaskedVO(ormEntity.panMasked),
      cardHolder: ormEntity.cardHolder,
      cardType: ormEntity.cardType,
      cnpUserId: innopayUser.cnpUserId,
      userId: new UUID(innopayUser.userId),
      appointmentType: ormEntity.appointmentType,
    };

    return { id, props };
  }
}
