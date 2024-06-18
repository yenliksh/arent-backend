import {
  RentPeriodVersionEntity,
  RentPeriodVersionProps,
} from '@domains/rent-period-version/domain/rent-period-version.entity';
import { RentPeriodVersionOrmEntity } from '@infrastructure/database/entities/rent-period-version.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';

export class RentPeriodVersionOrmMapper extends OrmMapper<RentPeriodVersionEntity, RentPeriodVersionOrmEntity> {
  protected async toOrmProps(entity: RentPeriodVersionEntity): Promise<OrmEntityProps<RentPeriodVersionOrmEntity>> {
    const { version, shortTermRentMonth, middleTermRentMonth, longTermRentMonth } = entity.getPropsCopy();

    const ormProps: OrmEntityProps<RentPeriodVersionOrmEntity> = {
      version,
      shortTermRentMonth,
      middleTermRentMonth,
      longTermRentMonth,
    };

    return ormProps;
  }

  protected async toDomainProps(ormEntity: RentPeriodVersionOrmEntity): Promise<EntityProps<RentPeriodVersionProps>> {
    const id = new UUID(ormEntity.id);

    const props: RentPeriodVersionProps = {
      version: ormEntity.version,
      shortTermRentMonth: ormEntity.shortTermRentMonth,
      middleTermRentMonth: ormEntity.middleTermRentMonth,
      longTermRentMonth: ormEntity.longTermRentMonth,
    };

    return { id, props };
  }
}
