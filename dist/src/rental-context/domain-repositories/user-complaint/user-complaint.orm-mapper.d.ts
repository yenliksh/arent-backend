import { UserComplaintEntity, UserComplaintProps } from '@domains/user-complaint/domain/entities/user-complaint.entity';
import { UserComplaintOrmEntity } from '@infrastructure/database/entities/user-complaint.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class UserComplaintOrmMapper extends OrmMapper<UserComplaintEntity, UserComplaintOrmEntity> {
    protected toOrmProps(entity: UserComplaintEntity): Promise<OrmEntityProps<UserComplaintOrmEntity>>;
    protected toDomainProps(ormEntity: UserComplaintOrmEntity): Promise<EntityProps<UserComplaintProps>>;
}
