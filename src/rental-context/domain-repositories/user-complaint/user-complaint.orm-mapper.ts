import { UserComplaintEntity, UserComplaintProps } from '@domains/user-complaint/domain/entities/user-complaint.entity';
import { UserComplaintVO } from '@domains/user-complaint/domain/value-objects/user-complaint.value-object';
import { UserComplaintOrmEntity } from '@infrastructure/database/entities/user-complaint.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';

export class UserComplaintOrmMapper extends OrmMapper<UserComplaintEntity, UserComplaintOrmEntity> {
  protected async toOrmProps(entity: UserComplaintEntity): Promise<OrmEntityProps<UserComplaintOrmEntity>> {
    const props = entity.getPropsCopy();

    const { type, reason } = props.complaint.unpack();

    const ormProps: OrmEntityProps<UserComplaintOrmEntity> = {
      senderUserId: props.senderUserId.value,
      recipientUserId: props.recipientUserId.value,
      type,
      reason,
      isViewed: props.isViewed,
    };

    return ormProps;
  }

  protected async toDomainProps(ormEntity: UserComplaintOrmEntity): Promise<EntityProps<UserComplaintProps>> {
    const id = new UUID(ormEntity.id);

    const props: UserComplaintProps = {
      senderUserId: new UUID(ormEntity.senderUserId),
      recipientUserId: new UUID(ormEntity.recipientUserId),
      complaint: UserComplaintVO.create(ormEntity.type, ormEntity.reason),
      isViewed: ormEntity.isViewed,
    };

    return { id, props };
  }
}
