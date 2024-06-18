import { ApartmentAdComplaintEntity, ComplaintProps } from '@domains/apartment-ad-complaint/domain/entities/apartment-ad-complaint.entity';
import { ApartmentAdComplaintOrmEntity } from '@infrastructure/database/entities/apartment-ad-complaint.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class ApartmentAdComplaintOrmMapper extends OrmMapper<ApartmentAdComplaintEntity, ApartmentAdComplaintOrmEntity> {
    protected toOrmProps(entity: ApartmentAdComplaintEntity): Promise<OrmEntityProps<ApartmentAdComplaintOrmEntity>>;
    protected toDomainProps(ormEntity: ApartmentAdComplaintOrmEntity): Promise<EntityProps<ComplaintProps>>;
}
