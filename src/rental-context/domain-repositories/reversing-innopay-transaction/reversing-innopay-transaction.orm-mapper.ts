import {
  ReversingInnopayTransactionEntity,
  ReversingInnopayTransactionProps,
} from '@domains/innopay-transaction/domain/entities/reversing-innopay-transaction.entity';
import { ReversingInnopayTransactionOrmEntity } from '@infrastructure/database/entities/reversing-innopay-transaction.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';

export class ReversingInnopayTransactionOrmMapper extends OrmMapper<
  ReversingInnopayTransactionEntity,
  ReversingInnopayTransactionOrmEntity
> {
  protected async toOrmProps(
    entity: ReversingInnopayTransactionEntity,
  ): Promise<OrmEntityProps<ReversingInnopayTransactionOrmEntity>> {
    const { customerReference, isReversed } = entity.getPropsCopy();

    const ormProps: OrmEntityProps<ReversingInnopayTransactionOrmEntity> = {
      customerReference,
      isReversed,
    };

    return ormProps;
  }

  protected async toDomainProps(
    ormEntity: ReversingInnopayTransactionOrmEntity,
  ): Promise<EntityProps<ReversingInnopayTransactionProps>> {
    const id = new UUID(ormEntity.id);

    const props: ReversingInnopayTransactionProps = {
      customerReference: ormEntity.customerReference,
      isReversed: ormEntity.isReversed,
    };

    return { id, props };
  }
}
