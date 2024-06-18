import { RentPeriodVersionEntity, RentPeriodVersionProps } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { RentPeriodVersionOrmEntity } from '@infrastructure/database/entities/rent-period-version.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class RentPeriodVersionOrmMapper extends OrmMapper<RentPeriodVersionEntity, RentPeriodVersionOrmEntity> {
    protected toOrmProps(entity: RentPeriodVersionEntity): Promise<OrmEntityProps<RentPeriodVersionOrmEntity>>;
    protected toDomainProps(ormEntity: RentPeriodVersionOrmEntity): Promise<EntityProps<RentPeriodVersionProps>>;
}
