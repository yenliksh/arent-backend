import { UserEntity, UserProps } from '@domains/user/domain/entities/user.entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class UserOrmMapper extends OrmMapper<UserEntity, UserOrmEntity> {
    protected toOrmProps(entity: UserEntity): Promise<OrmEntityProps<UserOrmEntity>>;
    protected toDomainProps(ormEntity: UserOrmEntity): Promise<EntityProps<UserProps>>;
}
