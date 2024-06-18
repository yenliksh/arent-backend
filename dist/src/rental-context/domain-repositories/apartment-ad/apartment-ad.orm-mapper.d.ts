import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ApartmentAdProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class ApartmentAdOrmMapper extends OrmMapper<ApartmentAdEntity, ApartmentAdOrmEntity> {
    protected toOrmProps(entity: ApartmentAdEntity): Promise<OrmEntityProps<ApartmentAdOrmEntity>>;
    protected toDomainProps(ormEntity: ApartmentAdOrmEntity, trxId?: TransactionId): Promise<EntityProps<ApartmentAdProps>>;
}
