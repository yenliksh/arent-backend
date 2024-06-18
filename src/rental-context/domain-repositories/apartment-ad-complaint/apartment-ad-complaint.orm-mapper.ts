import {
  ApartmentAdComplaintEntity,
  ComplaintProps,
} from '@domains/apartment-ad-complaint/domain/entities/apartment-ad-complaint.entity';
import { AdComplaintVO } from '@domains/apartment-ad-complaint/domain/value-objects/ad-complaint.value-object';
import { ApartmentAdComplaintOrmEntity } from '@infrastructure/database/entities/apartment-ad-complaint.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';

export class ApartmentAdComplaintOrmMapper extends OrmMapper<
  ApartmentAdComplaintEntity,
  ApartmentAdComplaintOrmEntity
> {
  protected async toOrmProps(
    entity: ApartmentAdComplaintEntity,
  ): Promise<OrmEntityProps<ApartmentAdComplaintOrmEntity>> {
    const props = entity.getPropsCopy();

    const { type, reason } = props.complaint.unpack();

    const ormProps: OrmEntityProps<ApartmentAdComplaintOrmEntity> = {
      userId: props.userId.value,
      apartmentAdId: props.apartmentAdId.value,
      type: type,
      reason,
      isViewed: props.isViewed,
    };

    return ormProps;
  }

  protected async toDomainProps(ormEntity: ApartmentAdComplaintOrmEntity): Promise<EntityProps<ComplaintProps>> {
    const id = new UUID(ormEntity.id);

    const props: ComplaintProps = {
      userId: new UUID(ormEntity.userId),
      apartmentAdId: new UUID(ormEntity.apartmentAdId),
      complaint: AdComplaintVO.create(ormEntity.type, ormEntity.reason),
      isViewed: ormEntity.isViewed,
    };

    return { id, props };
  }
}
