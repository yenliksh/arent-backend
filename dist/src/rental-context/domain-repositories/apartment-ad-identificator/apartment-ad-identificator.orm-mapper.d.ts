import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class ApartmentAdIdentificatorOrmMapper extends OrmMapper<ApartmentAdIdentificatorEntity, ApartmentAdIdentificatorOrmEntity> {
    protected toDomainProps(ormEntity: ApartmentAdIdentificatorOrmEntity): Promise<EntityProps<ApartmentAdIdentificatorProps>>;
    protected toOrmProps(entity: ApartmentAdIdentificatorEntity): Promise<OrmEntityProps<ApartmentAdIdentificatorOrmEntity>>;
}
